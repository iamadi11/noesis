import { pool } from "@/lib/db";

// Liveness + DB reachability + PostGIS presence. Proves the pipe at M0.
export async function GET() {
  try {
    const { rows } = await pool.query("SELECT postgis_version() AS postgis");
    return Response.json({ ok: true, postgis: rows[0].postgis });
  } catch (err) {
    return Response.json({ ok: false, error: (err as Error).message }, { status: 503 });
  }
}
