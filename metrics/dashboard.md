---
id: metrics.dashboard
kind: doc
version: 0.1.0
status: active
owner: architect
updated: 2026-07-18
---

# Dashboard spec

The panels that render the four objectives from `telemetry/rollups/`. This is a spec, not a
rendered dashboard — a viewer (CI summary, a hosted board) implements it. Each panel names its
telemetry source so the wiring is unambiguous.

| Panel | Objective | Source field(s) | Shows |
|-------|-----------|-----------------|-------|
| Human touches / change | #1 | `human_touches`, `outcome` | Trend vs. baseline; auto-merge rate |
| Tokens / change | #2 | `tokens.*` | Trend vs. baseline; context vs. output vs. cached |
| Cache hit rate | #2 | `tokens.cached / tokens.context` | vs. `cache_hit_target` |
| Index efficiency | #2 | (indexing rollup) | reprocessed-files ÷ changed-files (want ≈1) |
| Gate pass-rate (first try) | #3 | `gates[].verdict`, `rework` | By gate; rework rate |
| Escaped defects | #3 | production quality events | Incidents per change, trailing |
| Slop findings / KLOC | guardrail | `evaluations/results/` | Trend (want ↓) |
| Cross-project reuse | #4 | knowledge/graph provenance | Nodes reused by newest project |
| Stale-knowledge failures | guardrail | CI `knowledge-freshness` | Count (want ≈0) |

## Cadence
- **Per PR:** tokens/change, human touches, gate pass-rate (the `metrics` CI job posts these).
- **Weekly rollup:** escaped defects, slop trend, cache efficiency.
- **Per new project:** the Objective-4 comparison against the prior project at each milestone.
