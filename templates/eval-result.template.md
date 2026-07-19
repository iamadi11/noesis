---
id: template.eval-result
kind: template
version: 0.1.0
status: active
owner: evaluation-agent
updated: 2026-07-18
---

# Evaluation result: <artifact-id> @ <run-id>

<!-- Written to evaluations/results/ as YYYY-MM-DD__<artifact-id>__<run-id>.result.md. Append-only. -->

- **Artifact:** <id@version> · **Stage:** <pipeline stage> · **Run:** <run-id (telemetry)>
- **Overall verdict:** pass | fail | escalated · **Confidence:** <0..1>

## Gate results (in run order)
| Gate | Verdict | Confidence | Evidence / findings |
|------|---------|-----------|---------------------|
| gate.builder | pass/fail | | _budget, parse, provenance_ |
| gate.reviewer | pass/fail | | _per-criterion evidence_ |
| gate.security | pass/fail/n-a | | _findings by severity_ |
| gate.testing | pass/fail/n-a | | _requirement coverage_ |

## Decision
_auto-merge | returned-to-producer | escalated-to-human. If returned: the specific failing
criteria handed back. If escalated: the category that triggered the human gate._

## Provenance
_Producing agent, prompt id@version, model tier, input artifact ids. (Principle 5.)_

## Learning signal
_Anything here worth feeding the loop: a repeated failure class for the knowledge-manager, a
low-pass-rate prompt for the prompt-optimizer._
