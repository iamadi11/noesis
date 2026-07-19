---
id: memory.open-issues
kind: memory
version: 0.1.0
status: active
owner: architect
updated: 2026-07-18
---

# Open issues

Known unresolved questions, risks, and debts. Items are **resolved by linking to the ADR or PR
that closed them**, not by deletion — a resolved issue is evidence that the question was answered.
This is the OS's honest backlog of what it doesn't yet know.

## Open

| # | Issue | Type | Impact | Owner |
|---|-------|------|--------|-------|
| O-001 | Retrieval quality is only as good as graph freshness; no live measurement yet of stale-edge rate. | risk | Retrieval may miss relevant nodes. | agent.repository-indexer |
| O-002 | Human-gate escalation policy is static; no data yet on whether it over- or under-escalates. | question | Affects Objective #1 (human effort). | agent.evaluation-agent |
| O-003 | No cross-project knowledge transfer mechanism yet — each project's `knowledge/` is siloed. | debt | Limits Objective #4 compounding across projects. | agent.knowledge-manager |
| O-004 | Token-budget defaults are hand-set, not learned from telemetry. | debt | Budgets may be loose or too tight. | agent.prompt-optimizer |

## Resolved

_None yet. Resolved items move here with a link to the closing ADR/PR._

<!-- Move items to Resolved with a link; never delete an open issue outright. -->
