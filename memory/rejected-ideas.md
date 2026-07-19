---
id: memory.rejected-ideas
kind: memory
version: 0.1.0
status: active
owner: architect
updated: 2026-07-18
append_only: true
---

# Rejected ideas

Append-only. The graveyard of ideas considered and killed, **with the reason they were killed**.
The `problem-discovery` and `architect` agents consult this file before proposing anything, so a
dead idea is not re-litigated at full token cost. An idea may be revived — but only by appending a
new entry that presents the *new evidence* that changes the calculus.

| # | Idea | Why rejected | Would revive if… |
|---|------|--------------|------------------|
| R-001 | Embed the whole repo and vector-search everything | Cost scales with repo size and retrieval is fuzzy; loses the structural signal that module/dependency graphs carry. | Graphs prove insufficient for a class of queries that embeddings demonstrably answer better. |
| R-002 | One mega-agent that does the whole SDLC | Impossible to evaluate, budget, or improve; failure modes entangle. Narrow agents are cheaper to gate and swap. | Never, at current model reliability. |
| R-003 | Store raw conversation transcripts as "memory" | Bloats retrieval, buries signal in noise, and re-reads cost tokens. We store *distilled* decisions instead. | A cheap way to summarize-on-write makes raw retention free. |
| R-004 | Let a strong model self-approve its output | Violates ADR-0004; generation is confidently wrong. Trust must be earned per-artifact by an independent gate. | Never; self-grading is not independent. |
| R-005 | Put reusable domain helpers in the OS for convenience | Violates ADR-0003; the first product-specific line makes the OS un-forkable. | Never. |

<!-- Append new rejections below. Include the reason; a rejection without a reason is useless. -->
