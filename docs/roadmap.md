---
id: doc.roadmap
kind: doc
version: 0.1.0
status: active
owner: architect
updated: 2026-07-18
---

# Roadmap

`v0.1.0` is the **specification and scaffold**: contracts, schemas, conventions, and the shape of
the reference tooling. It is deliberately convention-heavy and implementation-light, because the
conventions are what get reused. Here is what hardens next, and why in this order.

## v0.2 — Executable retrieval
Turn the retrieval *protocol* into running code: an incremental indexer that builds
`graphs/*.json` from source, and a context assembler that honors the token budget. This is the
highest-leverage next step because it directly moves Objective #2 (−90% tokens) from "designed"
to "measured."

## v0.3 — Live gate runner
Implement `automation/protocols/gate-runner.md` as a callable so `evaluations/` gates run in CI
against real diffs, emitting `evaluations/results/`. Wires Objective #3 (quality) into the merge
path.

## v0.4 — Telemetry pipeline
Ship the `telemetry/` collectors and rollups to a real store, so `metrics/` dashboards show
actual token spend and human-touch counts instead of targets. You cannot manage what you do not
measure.

## v0.5 — Closed learning loop
Automate the on-merge updates end-to-end: a merged PR that changes architecture must mechanically
update `knowledge/`, `graphs/`, and `memory/`, verified by CI. Objective #4 (compounding) becomes
enforced rather than encouraged.

## v0.6 — Experiment engine
Make `experiments/` self-serve: define a hypothesis + variant + metric, and the engine routes a
fraction of runs to the variant and reports a verdict. Prompt and model improvements stop being
guesses.

## v1.0 — Reusable across two real projects
The bar for 1.0 is empirical, not feature-count: **two independent projects** boot on Noesis, and
the second measurably starts cheaper (fewer tokens to first PRD, fewer human gates) because it
inherited the first's knowledge. That is the whole thesis, proven.

## Explicit non-goals
- **Not a model.** Noesis routes to models; it is not one.
- **Not an IDE or agent runtime.** It is the contracts and memory a runtime plugs into.
- **Not domain software.** No business logic, ever (Principle 7).
