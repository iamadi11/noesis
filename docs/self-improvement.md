---
id: doc.self-improvement
kind: doc
version: 0.1.0
status: active
owner: knowledge-manager
updated: 2026-07-18
---

# Self-improvement — how the OS gets better on its own

The thesis of Noesis is compounding: every project must leave the OS smarter, so the next project
is cheaper and better (Objective #4). This is not a hope pinned on good intentions — it is a
subsystem, enforced in CI.

## What every merged change must improve

Per `noesis.config.yaml → learning.on_merge_update`, a merge that changes the system updates:

| Target | Update | Enforced by |
|--------|--------|-------------|
| **knowledge/** | Overwrite current-state to stay true | CI: knowledge-freshness (ADR-0005) |
| **graphs/** | Reindex changed neighborhood | CI: graph-integrity + `source_commit == HEAD` |
| **memory/** | Append ADRs, new open-issues, newly-rejected ideas | reviewer gate on the learning stage |
| **prompts/** | Propose improvements as experiments | `prompt-optimizer` |
| **standards/** | Tighten when a defect class recurs | `knowledge-manager` → experiment |
| **metrics/** | Recompute the four objectives | CI: metrics job |

If a change alters architecture but leaves `knowledge/` stale, **CI blocks the merge**. Skipping
the learning step is made structurally impossible, because under deadline pressure an *optional*
learning step is the first thing dropped — and dropping it silently breaks the whole thesis.

## The three feedback loops

1. **Fast loop (per change):** gate failures return specific, evidenced criteria to the producer,
   which converges instead of thrashing. Knowledge/graphs updated on merge.
2. **Medium loop (per project):** the `prompt-optimizer` mines results + telemetry for
   underperforming prompts and standards, ships experiments, promotes only proven wins.
3. **Slow loop (across projects):** distilled `knowledge/` and reusable `graphs/` nodes carry
   forward, so project N+1 starts cheaper than N. This is measured at milestones (Objective #4)
   and is the v1.0 bar.

## Why experiments, not edits
A "self-improving" system that edits itself on hunches drifts and regresses. Noesis improves by
**evidence**: every change to a prompt/standard/workflow is an experiment with a control, a
metric, a sample-size floor, and a verdict (`experiments/`). Quality (Objective #3) is a hard
floor — no efficiency win is allowed to lower it. That is the difference between getting better and
just getting different.

## The honest risks (tracked as open-issues)
- Cross-project transfer is not yet automated (O-003) — the slow loop is partly manual in v0.1.
- Budgets and escalation thresholds are hand-set, not yet learned (O-002, O-004).
The system names what it can't yet do rather than pretending — which is itself the anti-slop
discipline applied to the OS's own documentation.
