---
id: doc.telemetry-readme
kind: doc
version: 0.1.0
status: active
owner: infrastructure-engineer
updated: 2026-07-18
---

# telemetry/ — *What actually happened at runtime?*

Signal collection. Every agent run and every production event emits structured telemetry: tokens
spent, cost, latency, gate outcomes, and quality signals. Telemetry is the OS's senses — without
it, the four objectives are aspirations, not measurements, and the learning loop has nothing to
learn from.

## What flows here

| Signal | Feeds |
|--------|-------|
| Token spend per run (by agent, prompt, tier) | Objective #2; `prompt-optimizer`; budget tuning |
| Cost & latency | `performance-engineer`; `metrics/` |
| Gate outcomes + confidence | Objective #3; auto-merge calibration (O-002) |
| Human-touch count per change | Objective #1 |
| Cache hit rate | Objective #2 (context-assembly effectiveness) |
| Production quality events (errors, incidents) | new Problems; regression detection |

## Structure

| Path | Holds |
|------|-------|
| [`schemas/`](schemas/) | The event schemas every emitter conforms to. |
| `raw/` | Raw event dumps (git-ignored; ship to a store). |
| `rollups/` | Aggregated, versioned summaries git keeps (the numbers `metrics/` reads). |

## Design rule: keep rollups, ship raw
Raw traces are large and regenerable-ish; they go to a store and are `.gitignore`d. Only the
**rollups** — small, aggregated, decision-grade — live in git. This keeps the repo lean while
preserving the signal `metrics/` and the learning loop need (same distill-don't-dump discipline as
`knowledge/`).

## Every run is attributable
A telemetry `run_id` ties together the assembled context, the prompt `id@version`, the model tier,
the gate results, and the outcome (Principle 5). Given a `run_id`, any decision the OS made is
fully reconstructable.
