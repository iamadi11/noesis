---
id: playbook.implementation
kind: playbook
version: 0.1.0
status: active
owner: backend-engineer
updated: 2026-07-18
---

# Playbook 04 — Implementation → Testing → Evaluation

**Goal:** build the design into evaluated, tested software — the stage where the full gate chain
earns its keep.

**Preconditions:** gated `artifacts/design/`; registered contracts in `knowledge/api-contracts.md`;
fresh `graphs/`.

## Steps
1. **Retrieve minimal context** — `semantic-retrieval` + `context-assembly` produce the smallest
   sufficient context for the unit of work (never the whole repo).
2. **Implement** — the relevant `*-engineer` agent(s) produce code + tests against the contracts.
   - Frontend/backend/database work in parallel because they bind to the same registered contracts.
3. **Gate: builder** — exists, parses, frontmatter, **within token budget**, provenance recorded.
4. **Gate: reviewer** — acceptance criteria met, no slop, standards conformant, consistency.
5. **Gate: security** — for changes touching auth/data/dependencies.
6. **Gate: testing** — requirement coverage (not just lines), edge cases, green suite, perf/token budget.
7. **Chain aggregate** — `agent.evaluation-agent` computes verdict + confidence and applies the
   auto-merge / human-escalation policy.

## Outputs
Merged code + tests; `evaluations/results/` records; updated contracts; a telemetry run record.

## On fail
Each gate returns the **specific** failing criteria with evidence to the producing agent, which
fixes the named defect (it does not regenerate blindly). Fail-fast: cheap gates reject before
expensive ones spend tokens.
