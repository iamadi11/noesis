---
id: playbook.prd
kind: playbook
version: 0.1.0
status: active
owner: product-manager
updated: 2026-07-18
---

# Playbook 02 — PRD

**Goal:** convert a validated, evidenced problem into a testable requirements contract.

**Preconditions:** gated `analysis/problem.md`, `analysis/research.md`, `analysis/evidence.md`.

## Steps
1. **Draft the PRD** — `agent.product-manager` → `artifacts/prd/` (template `template.prd`).
   - Outcome as a measurable success metric, not a feature list.
   - Explicit **out-of-scope** section (the cheapest tokens are the ones never spent building unwanted things).
   - Every requirement testable and traceable to the problem.
   - No implementation decisions (those belong to the architect).
   - Reconcile against `memory/business-rules.md`; surface conflicts, don't resolve silently.
2. **Gate: reviewer** — testability, traceability, scope discipline, no solutioning.
3. **Gate: human** — the outcome and scope are a business commitment; a human approves the *what*.

## Outputs
A gated PRD in `artifacts/prd/`, referenced by id downstream.

## On fail
Reviewer failures return to the product-manager. A human rejection is appended to `memory/` (as a
decision or rejected-idea) so the reasoning informs future PRDs.
