---
id: doc.memory-readme
kind: doc
version: 0.1.0
status: active
owner: knowledge-manager
updated: 2026-07-18
---

# memory/ — *What decisions and history define this project?*

Persistent, **append-only** project memory. This is the OS's long-term recall: the decisions that
were made, the ideas that were killed (and why), the issues still open, and the rules that
constrain everything. It is the direct implementation of two guardrails: **never lose
architectural knowledge** and **prevent re-litigating settled questions**.

## What lives here

| File | Holds | Semantics |
|------|-------|-----------|
| [`decisions.md`](decisions.md) | Architecture Decision Records (ADRs) | Append-only. Supersede, never delete. |
| [`rejected-ideas.md`](rejected-ideas.md) | Ideas considered and killed, with the reason | Append-only. Consulted before proposing anything. |
| [`open-issues.md`](open-issues.md) | Known unresolved questions and risks | Items move to resolved (with a link), not deleted. |
| [`business-rules.md`](business-rules.md) | Domain constraints agents must honor | Data, read by agents. **The one place project domain rules live.** |

## Why append-only?

Because history is evidence. A decision reversed is not a decision erased — the reversal is itself
a decision, and knowing *why* something was tried and abandoned prevents an agent from confidently
re-proposing it six months later at full token cost. `memory/rejected-ideas.md` is checked by the
`problem-discovery` and `architect` agents specifically to kill zombie ideas.

## memory/ vs. knowledge/

- `memory/` = **events over time** (a decision was made on a date). Append-only.
- `knowledge/` = **current truth** (this is how the system is shaped now). Overwritten.

When a decision changes the system's shape, the `knowledge-manager` does both: appends the ADR to
`memory/decisions.md` *and* overwrites the affected `knowledge/` file. Two writes, one merge.
