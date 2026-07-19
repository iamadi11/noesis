import { Pool } from "pg";

// One shared pool per server process. Reused across Fluid Compute invocations.
declare global {
  // eslint-disable-next-line no-var
  var _pgPool: Pool | undefined;
}

export const pool =
  global._pgPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    // Managed Postgres (Neon/Supabase) requires TLS.
    ssl: process.env.DATABASE_URL?.includes("sslmode=require")
      ? { rejectUnauthorized: false }
      : undefined,
  });

if (process.env.NODE_ENV !== "production") global._pgPool = pool;
