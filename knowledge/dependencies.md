---
id: knowledge.dependencies
kind: doc
version: 0.1.0
status: template
owner: architect
updated: 2026-07-18
---

# Dependency inventory

Every third-party dependency, why it exists, and its risk. A dependency is a permanent liability
and an attack surface; this inventory forces each one to justify itself and lets the `security`
gate reason about supply-chain risk from a single source.

| Dependency | Version | Why (the need it meets) | Alternative considered | Risk | Owner |
|------------|---------|------------------------|------------------------|------|-------|
| _example_  | _1.2.3_ | _..._ | _build in-house_ | low/med/high | agent.backend-engineer |

## Rules
- **Every dependency has a "why".** "It's popular" is not a why. Name the specific need.
- **Adding a dependency is an ADR** when it introduces a new capability or non-trivial risk —
  recorded in `memory/decisions.md`.
- **The `security` gate reviews new/updated entries** for known-vulnerable versions.
- **Prefer the smaller surface.** A 3-line utility rarely justifies a transitive tree of 200
  packages. Reuse before adding; the `reviewer` checks the module graph first.

## Removal
Dependencies are removed when their "why" no longer holds. Removal is cheap insurance; an unused
dependency is pure risk. The `knowledge-manager` flags orphans during the learning step.
