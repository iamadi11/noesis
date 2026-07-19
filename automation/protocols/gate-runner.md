---
id: protocol.gate-runner
kind: policy
version: 0.1.0
status: active
owner: evaluation-agent
updated: 2026-07-18
---

# Protocol: Gate runner

**Job:** run the evaluation chain for an artifact — in order, fail-fast, cheapest first — collect
results, compute the verdict, and apply the auto-merge / human-escalation policy. This is how
"reduce human effort" and "no code without passing evaluations" become one mechanism.

## Inputs
- `artifact` + its `stage` (from `pipelines/sdlc.pipeline.yaml`).
- `required_gates` — from the stage, intersected with those implied by `change-detection`.
- `config` — `noesis.config.yaml → evaluation`.

## Algorithm

```
gates = order_by_cost_ascending(required_gates)      # builder < reviewer < arch/security < ...
results = []

for gate in gates:
    r = run(gate, artifact)                           # each gate emits a template.eval-result
    results.add(r)
    persist(r → evaluations/results/)
    if gate.blocking and r.verdict == fail:
        if config.evaluation.fail_fast:
            return CHAIN_FAIL(results, return_to = artifact.producer, reasons = r.failures)

verdict     = aggregate(results)                      # all blocking gates pass ⇒ pass
confidence  = min(r.confidence for r in results)      # a chain is only as sure as its least-sure gate

# Human-escalation policy
if artifact.touches in config.evaluation.human_gate.required_for
   or confidence < config.evaluation.human_gate.auto_merge_when.min_confidence:
    return ESCALATE(gate.human, briefing = focused_briefing(artifact, results))
else:
    return AUTO_MERGE(verdict, results)
```

## Fail-fast ordering (Objective #2 inside Objective #3)
Gates run cheap→expensive so a bad artifact is rejected before a reasoning-tier gate spends tokens.
The builder gate (mechanical, fast tier) catches broken builds and budget overruns for near-zero
cost; only survivors reach the reviewer, and only reviewer-survivors reach security.

## What "return to producer" carries
Not "try again" — the **specific failing criteria with evidence**, so the producing agent fixes
the named defect rather than regenerating blindly. This is the loop that converges instead of
thrashing.

## Escalation briefing (the human's view)
When escalating, the runner assembles a *decision*, not a diff (see `gate.human` presentation):
the question, the machine results + confidence, the specific evidence, and the recommended option
with its trade-off. The human answers in seconds, not minutes — that ratio is the −95% effort.

## Idempotency & attribution
Each run has a `run_id` tying its results to `telemetry/`. Re-running a gate on an unchanged
artifact returns the cached result (no wasted tokens). Every result records the judging agent,
prompt `id@version`, and model tier (Principle 5).
