---
id: doc.experiments-readme
kind: doc
version: 0.1.0
status: active
owner: prompt-optimizer
updated: 2026-07-18
---

# experiments/ — *What are we testing to get better?*

The OS improves by evidence, not opinion. Every proposed change to a prompt, a model tier, a
standard, or a workflow ships as an **experiment**: a hypothesis, a control, a variant, a metric,
and a verdict. This is what makes "the system improves itself" rigorous instead of a vibe — and
what keeps prompt churn (agent.prompt-optimizer failure mode) from degrading the library.

## The rule
> No silent change to a prompt, standard, or workflow. A change is either the current `active`
> version or a running experiment against it. Promotion requires beating control on the target
> metric at a minimum sample size.

## Experiment lifecycle
1. **Propose** — an agent (usually `prompt-optimizer`) writes an experiment from
   [`../templates/experiment.template.md`](../templates/experiment.template.md): hypothesis,
   target metric, control, variant, minimum sample size, success threshold.
2. **Run** — the runtime routes a fraction of eligible runs to the variant; telemetry tags each
   run with its arm.
3. **Verdict** — when the sample size is reached, compare arms on the metric.
   - **Win** → promote the variant to `status: active`; supersede the old version.
   - **Loss/flat** → archive with the verdict, so the dead-end isn't retried (fed to
     `memory/rejected-ideas.md` if it was a notable direction).
4. **Record** — the verdict and its data stay here as evidence.

## Why minimum sample size matters
A variant tuned to a handful of recent runs will overfit and regress broadly (a real
`prompt-optimizer` failure mode). The threshold guards against promoting noise. Better to leave a
promising variant running than to promote it on three lucky samples.

## Guardrail
An experiment may never trade a headline objective for another without saying so: a variant that
cuts tokens 20% but drops gate pass-rate is a **loss**, not a win. Metrics are evaluated as a
vector, with quality (Objective #3) as a hard floor.
