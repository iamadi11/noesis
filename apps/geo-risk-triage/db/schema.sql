-- M0 schema — insurance property-risk triage.
-- Runnable: psql "$DATABASE_URL" -f db/schema.sql   (idempotent)
-- Only the M0 tables (prove the pipe: upload -> store -> normalized rows).
-- M1 adds geocode columns population; M2 adds open-data layers + run/risk_result.

CREATE EXTENSION IF NOT EXISTS postgis;

-- A user of the tool. (Auth is stubbed in M0; real sessions land in M0.1.)
CREATE TABLE IF NOT EXISTS app_user (
  id          BIGSERIAL PRIMARY KEY,
  email       TEXT UNIQUE NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- One uploaded schedule / book of business.
CREATE TABLE IF NOT EXISTS book (
  id              BIGSERIAL PRIMARY KEY,
  user_id         BIGINT REFERENCES app_user(id),
  name            TEXT NOT NULL,
  source_file_key TEXT NOT NULL,            -- storage key (local path in M0)
  row_count       INTEGER NOT NULL DEFAULT 0,
  status          TEXT NOT NULL DEFAULT 'uploaded',  -- uploaded | normalizing | ready | error
  uploaded_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- One row of the schedule, kept raw in M0; geocoding fills the geo columns in M1.
CREATE TABLE IF NOT EXISTS property (
  id                 BIGSERIAL PRIMARY KEY,
  book_id            BIGINT NOT NULL REFERENCES book(id) ON DELETE CASCADE,
  raw_row            JSONB NOT NULL,              -- verbatim source row (never lose input)
  address_clean      TEXT,                        -- M1
  geom               geometry(Point, 4326),       -- M1 (PostGIS does all spatial math)
  geocode_confidence REAL,                         -- M1
  geocode_source     TEXT                          -- M1
);

CREATE INDEX IF NOT EXISTS property_book_id_idx ON property(book_id);
CREATE INDEX IF NOT EXISTS property_geom_gix ON property USING GIST (geom);
