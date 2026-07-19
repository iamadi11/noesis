import { pool } from "@/lib/db";
import { assembleAddress, normalizeQuery } from "@/lib/columns";
import { getGeocoder, rateLimitDelayMs, type GeocodeHit } from "@/lib/geocode";

const LOW_CONFIDENCE = 0.5;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// M1 — the janitor. For each property row: map columns -> address, geocode (cache-first),
// write PostGIS point + confidence + source. Low-confidence rows are FLAGGED, never dropped.
// ponytail: sequential + 1.1s spacing to respect Nominatim's 1 req/s. Fine for small test books;
// a large book needs a background job/queue (tech-design, later milestone). Cache makes re-runs instant.
export async function POST(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const bookId = Number((await ctx.params).id);
  if (!Number.isInteger(bookId)) {
    return Response.json({ error: "bad book id" }, { status: 400 });
  }

  const geocoder = getGeocoder();
  const client = await pool.connect();
  try {
    const { rowCount } = await client.query("UPDATE book SET status='normalizing' WHERE id=$1", [bookId]);
    if (rowCount === 0) return Response.json({ error: "book not found" }, { status: 404 });

    const { rows: props } = await client.query(
      "SELECT id, raw_row FROM property WHERE book_id=$1 ORDER BY id",
      [bookId],
    );

    let geocoded = 0, lowConfidence = 0, unresolved = 0;

    for (const p of props) {
      const { address } = assembleAddress(p.raw_row);
      if (!address) {
        await client.query("UPDATE property SET geocode_source='unmapped' WHERE id=$1", [p.id]);
        unresolved++;
        continue;
      }
      const q = normalizeQuery(address);

      // Cache first (free). Miss -> live call (rate-limited) -> cache the result (incl. misses).
      let hit: GeocodeHit | null;
      const cached = await client.query(
        "SELECT lat, lon, confidence, source FROM geocode_cache WHERE query_norm=$1",
        [q],
      );
      if (cached.rowCount && cached.rowCount > 0) {
        const c = cached.rows[0];
        hit = c.lat == null ? null : { lat: c.lat, lon: c.lon, confidence: c.confidence, source: c.source };
      } else {
        await sleep(rateLimitDelayMs());
        hit = await geocoder.geocode(address);
        await client.query(
          `INSERT INTO geocode_cache (query_norm, lat, lon, confidence, source)
           VALUES ($1, $2, $3, $4, $5) ON CONFLICT (query_norm) DO NOTHING`,
          [q, hit?.lat ?? null, hit?.lon ?? null, hit?.confidence ?? null, hit?.source ?? "nominatim"],
        );
      }

      if (!hit) {
        await client.query("UPDATE property SET address_clean=$1, geocode_source='unresolved' WHERE id=$2", [address, p.id]);
        unresolved++;
        continue;
      }

      await client.query(
        `UPDATE property
         SET address_clean=$1, geom=ST_SetSRID(ST_MakePoint($2, $3), 4326),
             geocode_confidence=$4, geocode_source=$5
         WHERE id=$6`,
        [address, hit.lon, hit.lat, hit.confidence, hit.source, p.id],
      );
      geocoded++;
      if (hit.confidence < LOW_CONFIDENCE) lowConfidence++;
    }

    await client.query("UPDATE book SET status='ready' WHERE id=$1", [bookId]);
    return Response.json({ total: props.length, geocoded, lowConfidence, unresolved });
  } catch (err) {
    await client.query("UPDATE book SET status='error' WHERE id=$1", [bookId]).catch(() => {});
    return Response.json({ error: (err as Error).message }, { status: 500 });
  } finally {
    client.release();
  }
}
