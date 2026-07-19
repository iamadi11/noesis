---
id: doc.analysis-readme
kind: doc
version: 0.1.0
status: active
owner: problem-discovery
updated: 2026-07-18
---

# analysis/ — *What did we learn about the problem and market?*

Outputs of the discovery stages, before any building begins: the problem statement, the research
brief, and the evidence ledger. These are the inputs the PRD is built from, so their quality caps
the quality of everything downstream — a wrong problem here is the most expensive error in the
lifecycle.

| File | Producer | Gate |
|------|----------|------|
| `problem.md` | `agent.problem-discovery` | reviewer |
| `research.md` | `agent.market-research` | reviewer |
| `evidence.md` | `agent.market-research` | reviewer |

## Rules
- **Read-mostly after its stage.** Once gated, an analysis artifact is a stable input; revising it
  means re-opening the stage and re-gating, not quietly editing.
- **Every claim is sourced.** `research.md` claims cite `evidence.md` ids; `evidence.md` items are
  rated for strength. Unverifiable claims are flagged, never asserted (Principle: no confident
  hallucination).
- **Feeds the loop.** At `knowledge_update`, durable findings are distilled into `knowledge/` so
  the next project's discovery starts from them instead of rediscovering them.

Templates: [`../templates/problem.template.md`](../templates/problem.template.md),
`research.template.md`, `evidence.template.md`.
