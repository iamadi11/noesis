---
id: prd.risk-triage.v1
kind: template.prd
version: 0.1.0
status: active
owner: product-manager
updated: 2026-07-19
supersedes: null
token_budget: n/a
---

# PRD — Insurance property-risk triage (MVP)

**Traces to:** ADR-0001 (wedge), ADR-0002 (beachhead), evidence.md E5/E6, forum-signals.md S3.

## Problem
Mid-market insurance underwriters (MGAs, agencies, regional carriers) triage property risk by hand:
paste each address into Google Maps, eyeball FEMA/hazard maps, judge. ~10,400 lookups/underwriter/yr
[forum-signals S3]. Enterprise tools (Cape, Ecopia) are overkill/expensive; they also assume a clean
address list — but the real input is a messy, agent-submitted schedule.

## Users
- **Primary:** underwriter / risk analyst at a mid-market P&C insurer or MGA. Not a GIS user.
- **Buyer:** underwriting manager / principal. Budget exists (already buys geocoding/data).

## The one magical experience
Upload the messy schedule → ask *"flag flood + wildfire + distance-to-fire-station exposure and
rank my worst risks"* → in minutes get a ranked, exportable table + map. No GIS, no clean-up, no
enterprise contract.

## In scope (MVP) — each feature justified or cut
| # | Feature | Why (or CUT) |
|---|---|---|
| F1 | Upload messy CSV/XLSX of addresses/schedule | Entry to the #1 pain |
| F2 | **Janitor:** parse cols, geocode, dedupe, detect+fix CRS, repair geometry | The moat |
| F3 | Hazard join: FEMA flood zone + USFS/wildfire + distance-to-nearest-fire-station | Makes it decision-grade on FREE open data |
| F4 | Plain-English question → typed risk-query plan (not free code) | The interface; safe + evaluable |
| F5 | Ranked risk table + map + "why/sources/steps" panel | The deliverable + trust (combats wrong-answer risk) |
| F6 | Export CSV/GeoJSON + shareable PDF brief | How the answer leaves the tool |
| F7 | Accounts + run history | Retention + flywheel |
| ❌ | Real-time, dashboards, collaboration, imagery/roof analysis, model marketplace, mobile | Not the magic moment — CUT |

## Out of scope / non-goals
Foot-traffic data · property imagery/AI roof scoring (that's Cape's game) · being a GIS editor ·
multi-peril actuarial modeling · anything requiring a data panel we'd have to buy.

## Success metrics
- Time-to-first-ranked-answer < 5 min from cold upload.
- Geocode match rate ≥ 95% on a real messy schedule.
- ≥ 40% of runs exported/downloaded (North Star proxy: acted-on answers).
- ≥ 3 design partners running ≥ 1 real book/week by end of MVP.

## Acceptance criteria (become the eval rubric)
- Handles a messy real-world schedule (mixed columns, typos, missing CRS) without a manual pre-clean.
- Every hazard result is traceable to its open-data source + the reprojection applied.
- LLM never computes geometry; PostGIS does. Wrong/uncertain matches are flagged, not hidden.
- No PII in logs; uploaded books deletable.

## Risks / failure modes
- R2 wrong answer erodes trust → F5 "show the steps" + confidence flags + PostGIS-computed math.
- R3 vitamin-not-painkiller → founder WTP test (ADR-0002) runs concurrent; reviewed at M2 gate.
- Geocoder cost/rate at book scale → cache results (flywheel = cache); batch; fast-tier model for parsing.
- Open-data licensing (FEMA/USFS public; verify terms before any resale of derived layers).

## Gate
`gate.reviewer` + `gate.human`. Human-gate items: scope cut list (F-table), non-goals, R3 plan.
