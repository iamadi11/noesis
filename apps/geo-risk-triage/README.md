# geo-risk-triage

Insurance property-risk triage — MVP. A product built **on** the Noesis OS (this repo's root),
kept isolated here under `apps/` so the OS stays domain-neutral.

**What it does (target):** upload a messy schedule → ask a plain-English risk question
("flag flood + wildfire + distance-to-fire-station exposure, rank my worst risks") → get a
ranked, exportable answer in minutes. No GIS team.

See the discovery + design trail (flowed through the Noesis pipeline):
- `analysis/evidence.md`, `analysis/forum-signals.md` — market + pain evidence (cited).
- `memory/decisions.md` — ADR-0001 (wedge), ADR-0002 (beachhead).
- `artifacts/prd/prd-v1-risk-triage.md` — the PRD.
- `artifacts/design/tech-design-mvp.md` — architecture + milestones.

## Status: **M0 — skeleton** (prove the pipe: upload → store → normalized rows)

M0 has no geocoding or risk logic yet — that's M1/M2 (see the tech design).

## Setup

Founder-only provisioning (accounts/keys — not scaffolded):
1. **PostGIS DB** — create a Neon or Supabase project. Copy its connection string.
2. Enable PostGIS: it ships with both; the schema runs `CREATE EXTENSION IF NOT EXISTS postgis`.

Then:
```bash
cp .env.example .env.local        # paste your DATABASE_URL
pnpm install
pnpm db:schema                    # creates M0 tables (needs psql + DATABASE_URL)
pnpm dev                          # http://localhost:3000
```

Verify the pipe:
- `GET /api/health` → `{ ok: true, postgis: "3.x" }`
- Upload a CSV on the home page → "Stored book #N with M rows."

## Deploy (M0.1)
Before Vercel: swap `lib/storage.ts` local-disk `store()` for a Cloudflare R2 / S3 put
(serverless FS is ephemeral). Then `vercel` + set `DATABASE_URL` in project env.

## Stack
Next.js (App Router) · PostGIS (all spatial math) · `pg` · `csv-parse`. Boring on purpose — see
the tech design for each choice vs its rejected alternative.
