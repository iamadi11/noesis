---
id: doc.evaluations-readme
kind: doc
version: 0.1.0
status: active
owner: evaluation-agent
updated: 2026-07-18
---

# evaluations/ — *Is it good enough to accept?*

The evaluation framework. This is where **trust is manufactured**: no artifact reaches the next
stage until it passes the gates its stage requires. It is the operational form of Principle 4
("no output is trusted until it is evaluated") and the primary defense against AI slop.

## The chain

```
 Builder ──▶ Reviewer ──▶ Architecture ──▶ Security ──▶ Testing ──▶ Human
 (cheap, fast)                                                    (rare, expensive)
```

Gates run **in order, fail-fast**: the cheapest, most likely-to-fail gate runs first so a bad
artifact is rejected before an expensive gate spends tokens on it. The `evaluation-agent`
conducts the chain; the specialist agents (`reviewer`, `security-engineer`, …) are the judges.

Not every artifact runs every gate — the stage decides (see
[`../pipelines/sdlc.pipeline.yaml`](../pipelines/sdlc.pipeline.yaml)). A doc change runs
`reviewer`; a schema migration runs `reviewer + security + human`.

## Structure

| Path | Holds |
|------|-------|
| [`gates/`](gates/) | Gate definitions — what each gate checks, its blocking severity, its rubric. |
| [`rubrics/`](rubrics/) | Scored criteria a gate applies. Reusable across gates. |
| [`results/`](results/) | Stored evaluation results, one per run, linked to telemetry. Append-only. |

## Gate anatomy

A gate is a contract: it names the rubric it applies, whether it blocks, and what a pass means.
See any file in [`gates/`](gates/). A gate returns per-criterion pass/fail **with evidence** plus
a confidence score. The auto-merge policy (`noesis.config.yaml → evaluation.human_gate`) reads
that confidence to decide whether a human is needed.

## Why cheap-first ordering

A `security` review on the reasoning tier is expensive. If the `reviewer` will reject the artifact
for a hallucinated API anyway, running security first wastes those tokens. Ordering gates by
`cost ascending, failure-likelihood descending` is a direct token optimization (Objective #2)
layered on top of a quality mechanism (Objective #3).

## The human gate is not a rubber stamp — nor a bottleneck

Humans are pulled in only for: architecture changes, security-sensitive changes, irreversible
actions, and budget overruns. Everything else auto-merges when machine gates pass at
`min_confidence`. This is how the OS removes 95% of human effort without removing human judgment
where it actually matters.
