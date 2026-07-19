---
id: memory.decisions
kind: memory
version: 0.1.0
status: active
owner: architect
updated: 2026-07-19
supersedes: null
token_budget: n/a
---

# Decisions (append-only)

## ADR-0001 — Narrow the wedge: "analysis-ready answers for non-GIS workers" (PROPOSED — awaiting human gate)

- **Status:** proposed · **Date:** 2026-07-19 · **Owner:** founder (validates) + architect (proposes)
- **Gate:** `gate.human` — NOT yet accepted. No downstream PRD/design/code until accepted.

**Context.** Mission was "AI OS for geospatial / NL as the interface to all geospatial work."
Evidence (analysis/evidence.md) shows: the NL interface is not a moat [E2]; the broad platform is
already being built by Bunting Labs (YC) and Esri with far more capital [E3]; geo funding is
cooling [E4]; and the largest underserved pain is data prep for non-experts [E5], while the
location-intelligence leaders sit behind a proprietary-panel capital moat [E6]. Constraints: one
founder, $0, AI does implementation, human validates.

**Decision (proposed).** Day-0 target is a NARROW wedge, not the platform:
> "Turn messy real-world location data + a plain-English spatial question into a decision-grade
> answer, on the customer's own data + open data, web-first, with no GIS team — the data-prep
> (format + CRS + geometry + join) done invisibly."
The invisible data-janitor + accumulated normalization corpus is the **moat**; the NL interface is
table stakes. The broad vision is the *destination*, reached by expanding outward from this wedge
one vertical at a time.

**Rejected alternatives.**
- Broad "AI OS for geospatial" now — loses to Bunting + Esri + $0. [E3][E4]
- Foot-traffic / site-selection head-on with Placer.ai — proprietary-panel capital moat. [E6]
- Pure text→GeoJSON generator — commodity, a feature, no moat (mission itself rejects this). [E2]
- Gov/urban-planning beachhead — sales cycle kills solo velocity.

**Consequences.**
- (+) Different buyer than Bunting/Esri (non-GIS), no panel capital needed, compounding data
  flywheel, straight path to the vision.
- (−) Monetization must be proven "painkiller not vitamin" (R3). Beachhead vertical still unproven.

**Open (blocks acceptance).**
1. Founder accepts the narrowing?
2. Beachhead vertical — candidate: insurance/RE property-risk & catchment on open hazard/boundary
   data. UNPROVEN. Requires ≥10 real interviews (Phase 1 is synthetic). This is the next action,
   not code.

## ADR-0001 — ACCEPTED (human gate cleared)

- **Status:** accepted · **Date:** 2026-07-19 · **Decider:** founder (human gate)
- The wedge in ADR-0001 is approved. Broad vision remains the destination, not the Day-0 target.
- **Next action chosen:** interviews-first. No PRD/design/code until the beachhead vertical is
  validated by ≥10 real interviews. See analysis/interview-plan.md.
- Open item #2 (beachhead vertical) remains OPEN and is now the sole blocker to the PRD stage.

## ADR-0002 — Beachhead = mid-market insurance property-risk triage (PROPOSED — awaiting human gate)

- **Status:** proposed · **Date:** 2026-07-19 · **Gate:** `gate.human` (founder veto)
- **Evidence:** analysis/forum-signals.md (S2, S3), analysis/evidence.md (E5, E6).

**Context.** Public-signal scan found that EVERY obvious vertical already has turnkey "no-GIS"
tools for its ONE repeated question — retail (Geod, GrowthFactor), insurance geocoding (Cape,
Ecopia, csv2geo), logistics (Maptive, Smappen). Entering as the Nth clone loses. The unoccupied
space is the messy-data front-end those tools assume away + the long tail of ad-hoc questions.

**Decision (proposed).** Beachhead = **mid-market insurance property-risk triage**:
> Upload the messy address list / agent-submitted schedule → ask in plain English ("flag flood +
> wildfire + distance-to-fire-station exposure, rank my worst risks") → get a ranked, exportable
> answer in minutes, on open hazard data, no GIS team and no enterprise contract.
The data-janitor (messy schedule → clean geocoded portfolio) is the moat; the risk answer is the
sold outcome; open FEMA/USFS/hazard layers are free ammo.

**Why this beachhead.** Highest, most-quantified, proven-spend pain (10,400 manual Google-Maps
lookups/yr per underwriter). Incumbents are enterprise/imagery-priced → mid-market MGAs/agencies
still do it manually = the underserved slice matching our non-GIS buyer + janitor moat.

**Rejected.** Retail site-selection, logistics zones — turnkey incumbents already own the repeated
question (S2). Horizontal "any question" now — over-broad platform trap.

**Open (blocks acceptance / to run CONCURRENT with M0/M1):** no proof a mid-market underwriter buys
from a solo founder. Cheapest test: landing page + 5 cold outreaches + 1 concierge (manual) risk
report. M0/M1 (janitor + geocode) are vertical-neutral, so scaffolding them is not wasted even if
the vertical shifts.

## ADR-0002 — ACCEPTED (human gate cleared)

- **Status:** accepted · **Date:** 2026-07-19 · **Decider:** founder (human gate)
- Beachhead = mid-market insurance property-risk triage. PRD stage unlocked.
- Founder task (concurrent, not blocking build): landing page + 5 outreaches + 1 concierge sale to
  validate WTP. Reviewed at the M2 gate before scaling scope.


