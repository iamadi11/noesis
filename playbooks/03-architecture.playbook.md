---
id: playbook.architecture
kind: playbook
version: 0.1.0
status: active
owner: architect
updated: 2026-07-18
---

# Playbook 03 — Architecture → Technical Design

**Goal:** turn the PRD into a system shape and a technical design engineers can build in parallel,
with every significant choice recorded as an ADR.

**Preconditions:** a gated PRD; current `knowledge/architecture/`; `memory/decisions.md`.

## Steps
1. **Architecture** — `agent.architect` → `knowledge/architecture/` (+ ADRs to `memory/decisions.md`).
   - Consistent with existing architecture or explicitly supersedes it via an ADR.
   - Reuse existing components the dependency graph exposes; justify any new one.
   - Name the optimized trade-off; define boundary contracts.
2. **Technical design** — `agent.architect` (+ engineer agents for their surfaces) → `artifacts/design/`.
   - Register boundary contracts in `knowledge/api-contracts.md` so engineers bind to one source.
3. **Gate: architecture** — conformance, no reinvention, boundaries registered, trade-off stated.
4. **Gate: human** — architecture is the least-reversible code decision; a human signs off.

## Outputs
Updated `knowledge/architecture/`, ADRs in `memory/decisions.md`, `artifacts/design/`, registered
contracts. The `repository-indexer` refreshes `graphs/architecture-graph.json`.

## On fail
Architecture-gate failures return to the architect with the conformance/reuse findings. This is
the stage that prevents long-term codebase rot across many AI edits — do not shortcut it.
