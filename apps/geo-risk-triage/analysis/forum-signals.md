---
id: analysis.forum-signals.v1
kind: memory
version: 0.1.0
status: active
owner: problem-discovery
updated: 2026-07-19
supersedes: null
token_budget: n/a
---

# Public-signal scan (proxy for interviews)

**Method note / honesty:** Reddit + Quora are blocked to the research fetcher (403 / not indexed),
so this is NOT direct forum venting. Instead: quantified pain from vendor case studies, practitioner
surveys/blogs, and competitor directories — all cited. These show **pain and existing spend**
(painkiller-category proof) but do NOT prove a mid-market buyer will purchase from a solo founder.
Confidence: **[H]** market/competitor facts, **[M]** the pain workflows, **[L]** willingness-to-pay
from *us* specifically.

## S1 — Data-prep / CRS pain is real and documented [H/M]
- CRS mismatch + reproject is a beginner-through-pro stumbling block; whole tutorial ecosystems
  exist because people get stuck (GeoPandas, EarthDataScience, Geocomputation w/ Python/R).
  - https://geopandas.org/en/stable/docs/user_guide/projections.html
  - https://earthdatascience.org/courses/use-data-open-source-python/intro-vector-data-python/vector-data-processing/reproject-vector-data-in-python/
- "Do I need to code for GIS?" is a live, unresolved anxiety; coding increasingly demanded, many
  lack it. (millermountain, mapscaping, Quora "challenging areas in GIS").
  - https://mapscaping.com/do-i-need-to-code-in-geospatial/
- Corroborates evidence.md E5 (87.5% data-cleaning pain; "mandatory coding skills" barrier).

## S2 — CRITICAL: every single vertical use-case already has turnkey "no-GIS" tools [H]
The wedge's danger. For each obvious beachhead, a self-serve competitor already nails the ONE
repeated question:
- **Retail site selection:** Geod ("drop an address… drive-time trade areas, cannibalization,
  PDF brief, no GIS hire"), GrowthFactor ($200/mo), SiteZeus, SiteSeer, PassBy.
  - https://www.growthfactor.ai/resources/blog/retail-site-selection-software · https://www.geod.app/
- **Insurance geocoding/risk:** Cape Analytics, Ecopia, csv2geo, Korem, Smarty, Esri Insurance.
  - https://csv2geo.com/blog/geocoding-software-insurance · https://capeanalytics.com/
- **Logistics zones/routing:** Maptive, Smappen, Upper, RouteMate, Mapline, SmartRoutes.
  - https://www.maptive.com/best-drive-time-mapping-software-for-delivery-planning/
**Implication:** do NOT enter a vertical as the Nth worse clone of its turnkey tool. The genuinely
unoccupied space is (a) the messy-data-prep FRONT-END those tools assume away, and (b) the LONG
TAIL of ad-hoc spatial questions no single tool packages.

## S3 — Insurance property-risk = most vivid, most-quantified, proven-spend pain [H]
- Underwriters manually paste addresses into Google Maps + cross-ref FEMA; ~200 apps/week ≈ 10,400
  manual lookups/yr; up to 30 min/large-property submission identifying structures.
  - https://csv2geo.com/blog/geocoding-software-insurance · https://capeanalytics.com/resources/commercial-property-identification/
- Batch tools cut building-match time >90% (25 min saved/submission) → clear ROI story.
- Spend already exists (mature geocoding vendor category) = painkiller proven. BUT incumbents are
  enterprise/imagery-focused; **mid-market MGAs/agencies/regional carriers still do it manually**
  because enterprise tools are overkill/expensive, and their input is MESSY agent-submitted
  schedules — matching our janitor moat + non-GIS buyer.

## S4 — Pricing anchors (for later monetization) [H]
- Self-serve geospatial SaaS: low hundreds → low thousands / month.
- Foot-traffic panels & mid-tier scoring: low five figures / year.
- Enterprise GIS / managed: six figures / year.
  - https://www.growthfactor.ai/blog-posts/retail-site-selection-software

## Ranked pain (replaces synthetic Phase 1; rubric = freq · intensity · current-spend · non-GIS fit · reachability)

| Rank | Pain / persona | Freq | Intensity | Current-spend (painkiller) | Non-GIS fit | Solo reach | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | Mid-market insurance risk triage on messy schedules | High | High | **High (proven category)** | High | Medium | **Beachhead candidate** |
| 2 | Ad-hoc "spatial answer on my data" long tail | Medium | Medium | Low/unclear | High | High | Land-and-expand layer |
| 3 | Data-prep/CRS janitor (horizontal) | High | High | Low (seen as chore) | High | High | The MOAT, not the sold product |
| 4 | Retail site selection | Med | High | High but **crowded** (Geod etc.) | High | Low | Reject — turnkey incumbents |
| 5 | Logistics zones/routing | Med | High | High but **crowded** | Med | Low | Reject — turnkey incumbents |

## Remaining gap (still requires validation before/with build)
- No confirmation a mid-market underwriter buys from a solo founder. Cheapest next test: landing
  page + 5 targeted cold outreaches + one concierge (manual) risk-report sale — run CONCURRENT with
  a tightly-scoped MVP, since M0/M1 (janitor + geocode) are vertical-neutral and reusable regardless.
