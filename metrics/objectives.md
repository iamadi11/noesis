---
id: metrics.objectives
kind: doc
version: 0.1.0
status: active
owner: architect
updated: 2026-07-18
---

# The four objectives — definitions, measures, targets

Every part of Noesis traces back to one of these. This file makes each **measurable**, so
"−95% effort" is a number we track, not a slogan. All measures aggregate `telemetry/` (schema:
`telemetry/schemas/run.schema.json`).

## Objective 1 — Reduce human effort by 95%
- **Measure:** `human_touches per delivered change` (sum of `human_touches` across the change's
  runs). Baseline = the same team's human-touch count on comparable pre-Noesis changes.
- **Target:** ≤ 5% of baseline. In practice: humans touch only the human-gated categories.
- **Leading indicator:** auto-merge rate (fraction of changes merged with 0 human touches).
- **Mechanism:** the gate chain + human-gate policy (`evaluations/`, `noesis.config.yaml`).
- **Anti-gaming:** effort is not "removed" by lowering quality — Objective #3 is a guardrail. A
  change that auto-merges then causes an incident counts its incident-handling as human effort.

## Objective 2 — Reduce token usage by 90%
- **Measure:** `tokens per delivered change` (context + output − cached), across all its runs.
  Baseline = whole-file/whole-repo-context approach on comparable changes.
- **Target:** ≤ 10% of baseline.
- **Leading indicators:** cache hit rate (target `tokens.cache_hit_target`), reprocessed-vs-changed
  file ratio in indexing, average retrieval neighborhood size.
- **Mechanism:** graph-first retrieval + hierarchical summaries + context assembly + caching +
  change detection (`graphs/`, `automation/protocols/`).
- **Anti-gaming:** fewer tokens must not raise rework — track `rework` rate alongside; a cheaper
  run that gets returned by a gate saved nothing.

## Objective 3 — Increase software quality, continuously
- **Measure:** composite of gate pass-rate on first attempt, escaped-defect rate (production
  incidents per change), and slop findings per KLOC by the reviewer.
- **Target:** monotonic improvement quarter over quarter; no regression on escaped-defect rate.
- **Mechanism:** the evaluation chain; standards that tighten via the learning loop.
- **Anti-gaming:** first-attempt pass-rate can be gamed by lax gates — so escaped-defect rate
  (which lax gates *worsen*) is tracked as the counterweight.

## Objective 4 — Compounding returns (every future project cheaper and better)
- **Measure:** for project N+1 vs. project N at the same milestone (e.g. first PRD): tokens spent,
  human touches, and knowledge/graph nodes reused from prior projects.
- **Target:** each new project starts measurably cheaper than the last (the v1.0 bar in
  `docs/roadmap.md`).
- **Mechanism:** the enforced learning loop (`knowledge-manager`, on-merge updates, ADR-0005).
- **Anti-gaming:** reuse must be *real* — a reused node that gets immediately overwritten doesn't
  count. Measured at the milestone, not at import time.

## Guardrail metrics (not objectives, but tracked)
- **Prevent AI slop:** slop findings/KLOC (from `evaluations/results/`), trending down.
- **Never lose knowledge:** stale-knowledge CI failures (should be ~0; a spike means the loop is
  being bypassed).
