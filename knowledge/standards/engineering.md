---
id: knowledge.standards.engineering
kind: policy
version: 0.1.0
status: active
owner: reviewer
updated: 2026-07-18
---

# Engineering standard (cross-cutting baseline)

The domain-neutral baseline every project inherits. Surface-specific standards extend it; none
may weaken it. These are written to be **checkable** — each is something a gate can verify.

## Correctness
- Code does what its requirement says, including the error and edge cases named in the design.
- No call to a symbol absent from the module graph (no hallucinated APIs).
- No dead code, no unreachable branches, no commented-out blocks left behind.

## Simplicity (anti-slop)
- No abstraction without a second present consumer. Speculative generality is rejected (YAGNI).
- No duplicated logic where the module graph already exposes a reusable unit — reuse or justify.
- The simplest solution that meets the requirement wins over the cleverest one.
- A function does one thing; if its name needs "and", split it.

## Consistency
- Conforms to the project's ubiquitous language ([`../glossary.md`](../glossary.md)).
- Matches surrounding code's idioms, naming, and structure — new code reads like the code around it.
- Public interfaces match [`../api-contracts.md`](../api-contracts.md) exactly.

## Safety
- No secrets in source, logs, tests, or fixtures.
- Inputs at trust boundaries are validated; outputs are encoded for their sink.
- Changes are reversible, or the irreversibility is flagged for the human gate.

## Traceability
- Every unit of work traces to a requirement (PRD acceptance criterion) or an ADR.
- Provenance is recorded per `../../CONVENTIONS.md` §6.

## Testability
- Every acceptance criterion has a test asserting *intended* behavior (derived from the spec, not
  the implementation).
- No flaky test is retried into a green; flakes are quarantined and reported.

---

**How a gate uses this:** the `reviewer` produces a pass/fail per section with evidence. A section
without evidence is treated as a fail (see `agent.reviewer` failure mode "Agreeableness").
