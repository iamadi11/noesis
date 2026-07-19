---
id: doc.metrics-readme
kind: doc
version: 0.1.0
status: active
owner: architect
updated: 2026-07-18
---

# metrics/ — *Are we moving the four numbers?*

The scoreboard. Every metric here traces to a core objective; if a metric doesn't tell us whether
an objective is improving, it doesn't belong. Metrics are computed from `telemetry/rollups/` and
published on every CI run.

| File | Role |
|------|------|
| [`objectives.md`](objectives.md) | The four objectives, their exact definitions, targets, and how each is measured. |
| [`dashboard.md`](dashboard.md) | The dashboard spec: what panels exist and which telemetry each reads. |

## The discipline
- **One metric, one decision.** A metric nobody acts on is noise; delete it.
- **Baselines before targets.** A "−90%" claim is meaningless without the baseline it's 90% below.
  `objectives.md` records the baseline methodology so improvement is honest.
- **Leading over lagging where possible.** Tokens-per-PR (leading) predicts cost before the bill
  arrives; cost (lagging) confirms it.
