---
id: doc.eval-results-readme
kind: doc
version: 0.1.0
status: active
owner: evaluation-agent
updated: 2026-07-18
---

# evaluations/results/ — stored verdicts

One result record per evaluated artifact, **append-only**, conforming to
[`../../templates/eval-result.template.md`](../../templates/eval-result.template.md). Each record
links every sub-gate result and the run's telemetry id, so any merge decision is fully
reconstructable months later (Principle 5, attribution).

## Why keep them

- **Audit:** why did this artifact pass or fail, and who/what judged it.
- **Learning fuel:** the `prompt-optimizer` mines these for prompts with low pass rates or high
  rework; the `knowledge-manager` mines repeated failure classes into new standards.
- **Calibration:** comparing gate confidence against downstream outcomes tells us whether
  `min_confidence` for auto-merge is set right (open-issue O-002).

## Naming

`YYYY-MM-DD__<artifact-id>__<run-id>.result.md` — sortable by date, traceable to artifact and run.

## Retention

Results are small (verdicts + evidence pointers, not payloads) and stay in git indefinitely. The
bulky artifacts they judged live in `artifacts/` under the retention policy there.
