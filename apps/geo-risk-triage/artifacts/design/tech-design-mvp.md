---
id: design.risk-triage-mvp.v1
kind: template.tech-design
version: 0.1.0
status: active
owner: architect
updated: 2026-07-19
supersedes: null
token_budget: n/a
---

# Tech Design — risk-triage MVP (M0–M2)

**Traces to:** prd.risk-triage.v1. **Principle:** boring, managed, zero infra to operate (solo/$0).

## Stack (each choice = a rejected alternative)
- **Web:** Next.js (App Router) on Vercel. Map = MapLibre GL + free tiles. *Rej: separate SPA+API.*
- **Orchestration:** Next API routes (Node). *Rej: standalone backend service — premature.*
- **DB:** managed Postgres + PostGIS (Neon/Supabase). Does ALL spatial math. *Rej: LLM-computed geometry.*
- **Heavy geo work:** Python job (shapely/pyproj/GDAL) invoked from an API route for parse/repair the
  DB can't do. Start as a serverless function; move to a queue only when runtime demands. *Rej: k8s now.*
- **LLM:** Claude API. Emits a **typed risk-query plan (JSON)**, never free code. *Rej: code-gen agents.*
- **Storage:** object store (R2/S3) for raw uploads + generated PDFs.
- **Geocoding:** pluggable provider behind one interface; cache every result in DB (cache == flywheel).

## Data model (M0)
```
user(id, email, ...)
book(id, user_id, name, uploaded_at, source_file_key, status)        -- an uploaded schedule
property(id, book_id, raw_row jsonb, address_clean, geom geometry(Point,4326),
         geocode_confidence, geocode_source)                          -- normalized rows
run(id, book_id, question_text, plan jsonb, status, created_at)       -- one NL question
risk_result(id, run_id, property_id, flags jsonb, score, sources jsonb)
-- open-data layers loaded once as PostGIS tables: flood_zone, wildfire_hazard, fire_station
```

## The typed plan (safety boundary)
LLM maps NL → a constrained JSON plan the runtime validates + executes on PostGIS. No arbitrary code.
```json
{ "target": "book:123",
  "checks": [
    {"op":"point_in_polygon","layer":"flood_zone","emit":"flood_zone_code"},
    {"op":"point_in_polygon","layer":"wildfire_hazard","emit":"wildfire_class"},
    {"op":"nearest_distance","layer":"fire_station","emit":"m_to_fire_station"}],
  "rank_by": [{"field":"wildfire_class","dir":"desc"},{"field":"flood_zone_code","dir":"desc"}] }
```
Each `op` = a whitelisted parametric PostGIS query. Adding an op = adding a reviewed template, not
letting the model write SQL. This is what makes every answer evaluable by the OS gates.

## Janitor pipeline (M1 — the moat)
`Input → Validate → Normalize → Process → Output` (no step skipped):
1. Sniff format + delimiter + encoding; map columns (LLM assists column-role guess, cheap/fast tier).
2. Assemble/clean address; geocode (cached); attach confidence + source.
3. Detect CRS if geometries supplied; reproject to 4326; repair invalid geometry (ST_MakeValid).
4. Dedupe; flag low-confidence rows (never silently drop).
Every transformation recorded per-row → feeds the F5 "steps/sources" panel + the OS memory.

## Milestones (each independently deployable)
- **M0 — skeleton:** Next.js on Vercel, auth, upload → object store, `book`/`property` schema in
  PostGIS, one health route. *Deploy. Proves the pipe.* Files: app skeleton, `db/schema.sql`,
  `/api/upload`, `.env.example`, README.
- **M1 — janitor:** ingest CSV/XLSX → normalized `property` rows (geocode + CRS + repair) + steps
  panel. *Deploy. Useful alone.*
- **M2 — first answer:** load flood_zone + fire_station open data; NL→plan (1–2 ops); execute;
  ranked table + map + export. *Deploy. First magic moment + WTP gate review.*

## Observability / cost (OS-aligned)
Log tokens + latency + geocode calls per run into telemetry/ run schema. Cache normalization +
geocodes (doubles as cost control). Route parsing/classification to the `fast` model tier per
noesis.config.yaml; reasoning tier only for plan-generation on ambiguous questions.

## Eval hooks
gate.builder (compiles, budget), gate.reviewer (standards), gate.security (no PII in logs, upload
authz, deletable books), gate.testing (janitor on a messy fixture; plan-validator rejects non-
whitelisted ops). M2 output reviewed at gate.human against WTP evidence.

## Open / to confirm at build time
- Geocoder choice (accuracy vs cost vs terms) — pick at M1, behind the interface so it's swappable.
- Neon vs Supabase for managed PostGIS — pick at M0 (both fine; decide on free-tier limits).
