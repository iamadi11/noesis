---
id: template.tech-design
kind: template
version: 0.1.0
status: active
owner: architect
updated: 2026-07-18
---

# Technical design: <title>

<!-- Instance frontmatter links the PRD id it implements and any ADRs it depends on. -->

## Summary
_One paragraph: what is being built and the shape of the solution._

## Requirements traced
_Which PRD requirements this design satisfies, by id._

## Approach
_The chosen design. Components, their responsibilities, and how they interact. Reference nodes in
`graphs/architecture-graph.json`._

## Boundary contracts
_APIs, events, schemas at the seams. Every one registered in `knowledge/api-contracts.md` so
engineers build in parallel against a single source of truth._

| Contract id | Kind | Producer | Consumers |
|-------------|------|----------|-----------|
| _api.x.y_ | http/event/rpc | agent.backend-engineer | agent.frontend-engineer |

## Data model
_Entities, relationships, invariants. Links `knowledge/architecture/data-model.md`._

## Reuse
_What existing modules/components (by graph node) this design reuses instead of rebuilding. If it
adds something new, the justification vs. reuse._

## Trade-offs & alternatives
_What was optimized for; what was rejected and why (link `memory/rejected-ideas.md`)._

## Risks & open questions
_Links to `memory/open-issues.md`._

## Test strategy
_How the testing-engineer will prove each requirement is met (informs the testing gate)._
