---
id: memory.decisions
kind: memory
version: 0.1.0
status: active
owner: knowledge-manager
updated: 2026-07-18
append_only: true
---

# Decisions (ADR log)

Append-only. Newest at the bottom. Each entry uses the ADR shape from
[`../templates/adr.template.md`](../templates/adr.template.md). To reverse a decision, append a
new ADR that `supersedes` the old one — never edit or delete history.

These first entries are Noesis's own decisions — the OS dogfoods its memory format.

---

## ADR-0001 — Separate append-only `memory/` from overwritten `knowledge/`
- **Date:** 2026-07-18 · **Status:** accepted · **Supersedes:** none
- **Context:** The OS must both remember history (why decisions were made) and expose current
  truth (how the system is shaped now). These have opposite update semantics.
- **Options:** (a) one store for both; (b) two stores with distinct semantics.
- **Decision:** Two stores. `memory/` is append-only events; `knowledge/` is overwritten
  current-state. The `knowledge-manager` writes both on a merge that changes the system.
- **Consequences:** Slightly more write work per merge; in exchange, neither store lies about its
  semantics, and history is never destroyed. Enables "never lose architectural knowledge".

## ADR-0002 — Graph-first retrieval; never send the whole repo
- **Date:** 2026-07-18 · **Status:** accepted · **Supersedes:** none
- **Context:** Objective #2 requires −90% tokens. Whole-file/whole-repo context is the dominant
  cost in naive AI coding.
- **Options:** (a) send files as needed; (b) embeddings-only RAG; (c) graph-first retrieval with
  hierarchical summaries, files fetched only when the graph says they're relevant.
- **Decision:** (c). Build module/dependency/architecture/knowledge graphs; retrieve by walking
  them; zoom `repo → module → file → symbol`; fetch raw source only at the leaf, within budget.
- **Consequences:** We invest in the `repository-indexer` and graph schemas. Retrieval quality now
  depends on graph freshness, so indexing is incremental and runs on change detection.

## ADR-0003 — No business logic in the OS
- **Date:** 2026-07-18 · **Status:** accepted · **Supersedes:** none
- **Context:** The repository must be reusable across unrelated startups.
- **Options:** (a) allow convenient product-specific helpers; (b) forbid all domain logic.
- **Decision:** (b). Domain rules live only in a project's `memory/business-rules.md` as data
  agents read — never as code in `automation/`. The test: "would a fintech and a game studio both
  want this?"
- **Consequences:** Some duplication across projects is accepted as the price of forkability. The
  OS stays domain-neutral and safe to reuse.

## ADR-0004 — Trust is per-artifact (gates), not per-model
- **Date:** 2026-07-18 · **Status:** accepted · **Supersedes:** none
- **Context:** Generation is cheap and confidently wrong. Objective #3 and the "prevent AI slop"
  guardrail require a defense that doesn't assume the model is right.
- **Options:** (a) trust a strong model's output; (b) evaluate every artifact against rubrics.
- **Decision:** (b). The chain `builder → reviewer → architecture → security → testing → human`
  gates every artifact. Cheap gates run first (fail-fast). Humans are reserved for the categories
  in `noesis.config.yaml → evaluation.human_gate`.
- **Consequences:** Some latency and token cost per artifact, bought back many times over by
  avoided rework and prevented slop. Auto-merge is allowed only when all machine gates pass at
  high confidence.

## ADR-0005 — The learning loop is enforced in CI, not encouraged
- **Date:** 2026-07-18 · **Status:** accepted · **Supersedes:** none
- **Context:** Objective #4 (compounding returns) fails if "update the knowledge" is optional —
  it will be skipped under deadline pressure.
- **Options:** (a) document the expectation; (b) block merges that change the system without
  updating knowledge/graphs/memory.
- **Decision:** (b). `learning.block_merge_if_knowledge_stale: true`. A merge that changes
  architecture but not `knowledge/` fails CI.
- **Consequences:** Marginally stricter merges; in exchange, the compounding-returns thesis is
  mechanically guaranteed rather than hoped for.

<!-- Append new ADRs below this line. Do not edit entries above; supersede them. -->
