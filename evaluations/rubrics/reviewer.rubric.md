---
id: rubric.reviewer
kind: rubric
version: 0.1.0
status: active
owner: reviewer
updated: 2026-07-18
---

# Reviewer rubric

Scored criteria the `gate.reviewer` applies. Each criterion is scored **pass / fail / n-a with
evidence**. The gate blocks on any `fail` in a blocking criterion. Weights feed the confidence
score, not a pass/fail average — a single blocking failure fails the gate regardless of weight.

| Criterion | Blocking | Weight | Evidence required |
|-----------|----------|--------|-------------------|
| Meets every stated acceptance criterion | yes | 0.35 | Per-criterion verdict + where it's satisfied |
| No hallucinated/absent API (checked vs. module graph) | yes | 0.20 | The symbols checked and their graph nodes |
| No duplicated logic where reuse exists | yes | 0.15 | The graph node that should have been reused, or "none found" |
| Consistent with knowledge/ + memory/decisions | yes | 0.15 | The knowledge/ ids checked |
| Conforms to engineering standard | yes | 0.10 | Sections checked |
| Style/idiom (auto-fixable) | no | 0.05 | Notes only; never blocks |

## Scoring
- `confidence = Σ(weight × criterion_pass) over non-blocking-adjusted criteria`, clamped to [0,1].
- Any blocking `fail` ⇒ gate result = **fail**, regardless of confidence.
- Missing evidence on a criterion ⇒ that criterion is scored **fail** (evidence is mandatory).

## Anti-slop specifics
The reviewer explicitly searches for the slop signatures listed in
[`../../docs/anti-slop.md`](../../docs/anti-slop.md): invented APIs, copy-paste drift, dead
abstractions, cargo-cult patterns, and confident-but-unsourced claims.
