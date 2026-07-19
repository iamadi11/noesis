---
id: doc.automation-readme
kind: doc
version: 0.2.0
status: active
owner: architect
updated: 2026-07-19
---

# automation/ — *What glue makes this run without humans?*

The mechanisms that turn the contracts in `agents/`, `evaluations/`, and `graphs/` into a running
system that needs a human only at gates. This is where Objective #1 (−95% human effort) is
implemented.

**Hard rule (ADR-0003): no business logic here.** `automation/` contains only domain-neutral
*mechanisms* — retrieval, indexing, gate-running, change-detection. A product rule never becomes
code here; it lives in the project's `memory/business-rules.md` as data these mechanisms read.

## Protocols

`v0.1` ships the protocols as precise specifications — the contract each mechanism implements —
rather than a single locked-in implementation, because the *protocol* is what's reusable across
runtimes (an SDK, a CI job, an IDE agent). Each is directly implementable; v0.2 adds reference
code (see [`../docs/roadmap.md`](../docs/roadmap.md)).

| Protocol | Serves | Objective |
|----------|--------|-----------|
| [`protocols/change-detection.md`](protocols/change-detection.md) | Decide what changed and what to reprocess | #2 tokens |
| [`protocols/incremental-indexing.md`](protocols/incremental-indexing.md) | Keep graphs + summaries fresh, cheaply | #2 tokens |
| [`protocols/semantic-retrieval.md`](protocols/semantic-retrieval.md) | Assemble the minimal relevant node set | #2 tokens |
| [`protocols/context-assembly.md`](protocols/context-assembly.md) | Fit retrieved context into budget, with caching | #2 tokens |
| [`protocols/gate-runner.md`](protocols/gate-runner.md) | Run the evaluation chain, fail-fast | #1 effort, #3 quality |

## Scripts

Reference implementations of invariants that are cheap enough to enforce today (the rest land in
v0.2). These are wired into [`../pipelines/ci/noesis-invariants.yml`](../pipelines/ci/noesis-invariants.yml).

| Script | Enforces |
|--------|----------|
| [`scripts/validate-agents.rb`](scripts/validate-agents.rb) | Every `agents/specs/*.agent.yaml` validates against `agents/agent.schema.yaml` (CI invariant #2). Run: `ruby automation/scripts/validate-agents.rb`. |

## The pipeline they form

```
change-detection ─▶ incremental-indexing ─▶ (graphs fresh)
                                              │
task ─▶ semantic-retrieval ─▶ context-assembly ─▶ agent run ─▶ gate-runner ─▶ merge/learn
```

Everything an agent needs to *not* re-read the repo, and everything the chain needs to *not*
require a human, lives here.
