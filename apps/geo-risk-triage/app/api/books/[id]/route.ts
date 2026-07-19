import { pool } from "@/lib/db";

// Book + its properties (with geocode results) for the book view. M1 caps the row payload.
export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const bookId = Number((await ctx.params).id);
  if (!Number.isInteger(bookId)) {
    return Response.json({ error: "bad book id" }, { status: 400 });
  }
  const { rows: books } = await pool.query(
    "SELECT id, name, status, row_count FROM book WHERE id=$1",
    [bookId],
  );
  if (books.length === 0) return Response.json({ error: "book not found" }, { status: 404 });

  const { rows: properties } = await pool.query(
    `SELECT id, raw_row, address_clean, geocode_confidence, geocode_source,
            ST_Y(geom) AS lat, ST_X(geom) AS lon
     FROM property WHERE book_id=$1 ORDER BY id LIMIT 500`,
    [bookId],
  );
  return Response.json({ book: books[0], properties });
}
