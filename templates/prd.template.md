---
id: template.prd
kind: template
version: 0.1.0
status: active
owner: product-manager
updated: 2026-07-18
---

# PRD: <title>

<!-- Frontmatter for the instance: id: prd.<slug>, version, status, owner: agent.product-manager,
     supersedes, and links to the problem/research/evidence ids it derives from. -->

## Outcome
_The measurable result this delivers. A metric with a number and a measurement method — not a
feature list, not a feeling._

## Users
_Who has the problem this serves. Specific segment, from `analysis/problem.md`._

## Context
_Links (by id) to the problem, research, and evidence this PRD is built on._

## Requirements
_Each requirement is testable and traceable to the outcome._

| # | Requirement | Acceptance criterion (testable) | Traces to |
|---|-------------|--------------------------------|-----------|
| 1 | _..._ | _..._ | outcome / problem id |

## Out of scope
_Explicit. The cheapest tokens are the ones never spent building unwanted things. List what this
deliberately does NOT do._

## Success metrics
_How we'll know it worked, measured from `telemetry/` / product analytics._

## Constraints & business rules
_References to `memory/business-rules.md`. Conflicts surfaced here, not silently resolved._

## Open questions
_Links to `memory/open-issues.md`. Do not resolve silently._

<!-- No implementation decisions in a PRD (no stack, no schema) — those belong to the architect. -->
