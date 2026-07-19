import { parse } from "csv-parse/sync";
import { pool } from "@/lib/db";
import { store } from "@/lib/storage";

// M0 core — prove the pipe: receive a CSV -> store the raw file -> parse rows ->
// insert a book + one property row per record (raw_row kept verbatim; geocoding is M1).
// ponytail: auth is stubbed to a single dev user for M0; real sessions land in M0.1.
const DEV_USER_EMAIL = "dev@local";

export async function POST(req: Request) {
  const form = await req.formData();
  const name = form.get("name");
  const file = form.get("file");

  if (typeof name !== "string" || !name.trim()) {
    return Response.json({ error: "name required" }, { status: 400 });
  }
  if (!(file instanceof File)) {
    return Response.json({ error: "file required" }, { status: 400 });
  }

  const bytes = Buffer.from(await file.arrayBuffer());

  // Parse before we write anything, so a malformed CSV fails cleanly with no orphan state.
  let records: Record<string, unknown>[];
  try {
    records = parse(bytes, { columns: true, skip_empty_lines: true, trim: true });
  } catch (err) {
    return Response.json({ error: `unparseable CSV: ${(err as Error).message}` }, { status: 400 });
  }
  if (records.length === 0) {
    return Response.json({ error: "CSV has no data rows" }, { status: 400 });
  }

  const fileKey = await store(file.name, bytes);

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const { rows: userRows } = await client.query(
      `INSERT INTO app_user (email) VALUES ($1)
       ON CONFLICT (email) DO UPDATE SET email = EXCLUDED.email
       RETURNING id`,
      [DEV_USER_EMAIL],
    );
    const userId = userRows[0].id;

    const { rows: bookRows } = await client.query(
      `INSERT INTO book (user_id, name, source_file_key, row_count, status)
       VALUES ($1, $2, $3, $4, 'uploaded') RETURNING id`,
      [userId, name.trim(), fileKey, records.length],
    );
    const bookId = bookRows[0].id;

    // Bulk insert raw rows in one round-trip.
    // ponytail: single-statement insert; Postgres caps at 65535 params = ~32k rows/book.
    // Fine for M0 test books. If real books exceed that, chunk the insert or use COPY.
    const values: string[] = [];
    const params: unknown[] = [];
    records.forEach((r, i) => {
      values.push(`($${i * 2 + 1}, $${i * 2 + 2})`);
      params.push(bookId, JSON.stringify(r));
    });
    await client.query(
      `INSERT INTO property (book_id, raw_row) VALUES ${values.join(", ")}`,
      params,
    );

    await client.query("COMMIT");
    return Response.json({ bookId, rowCount: records.length });
  } catch (err) {
    await client.query("ROLLBACK");
    return Response.json({ error: (err as Error).message }, { status: 500 });
  } finally {
    client.release();
  }
}
