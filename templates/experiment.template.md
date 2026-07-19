---
id: template.experiment
kind: template
version: 0.1.0
status: active
owner: prompt-optimizer
updated: 2026-07-18
---

# Experiment: <name>

<!-- Instance frontmatter: id: experiment.<slug>, status: running|promoted|archived. -->

## Hypothesis
_A falsifiable statement: "Changing X will improve metric M by ≥ Δ without regressing guardrail
G." If it can't be proven wrong, it's not a hypothesis._

## Target metric
_The single metric this optimizes (e.g. tokens/change, reviewer pass-rate). From `metrics/`._

## Guardrails
_Metrics that must NOT regress (quality is a hard floor). A win on the target that breaks a
guardrail is a loss._

## Arms
- **Control:** the current `active` version (id@version).
- **Variant:** the proposed change (id@version, `status: draft`).

## Design
- **Eligible runs:** which runs are routed into the experiment.
- **Split:** fraction to variant.
- **Minimum sample size:** N per arm (guards against overfitting to noise).
- **Success threshold:** the effect size that counts as a win.

## Verdict
_Filled when N is reached. Win → promote variant to active, supersede control. Loss/flat →
archive with the data; if a notable direction, log to `memory/rejected-ideas.md`._

| Arm | Samples | Target metric | Guardrails | Result |
|-----|---------|---------------|------------|--------|
| Control | | | | |
| Variant | | | | |
