---
id: doc.knowledge-readme
kind: doc
version: 0.1.0
status: active
owner: knowledge-manager
updated: 2026-07-18
---

# knowledge/ — *What is currently true about the system?*

This is the **current-state snapshot** of the project's understanding, and the primary target of
retrieval. Where [`../memory/`](../memory/) is an append-only ledger of *events*, `knowledge/` is
overwritten to stay *true right now*. Every overwrite is a git commit, so history is never lost.

It is the answer to "never lose architectural knowledge": the understanding that would otherwise
evaporate when a context window closes lives here instead, small and searchable.

## What lives here

| File / dir | Understands |
|------------|-------------|
| [`architecture/`](architecture/) | System shape: components, boundaries, data model, flows. |
| [`standards/`](standards/) | Coding standards per surface (frontend, backend, data, security, testing, infra). |
| [`api-contracts.md`](api-contracts.md) | The single source of truth for every internal/external API. |
| [`dependencies.md`](dependencies.md) | Dependency inventory: what, why, version, risk. |
| [`glossary.md`](glossary.md) | The project's ubiquitous language — every term defined once. |

## Rules

- **Current, not historical.** If a fact is no longer true, overwrite it. The old value survives
  in git and, if it informed a decision, in `memory/decisions.md`.
- **Curated, not dumped.** Knowledge is distilled by the `knowledge-manager`. Raw transcripts and
  exploratory notes do not belong here; their *conclusions* do.
- **Small on purpose.** Retrieval cost scales with size. Prune aggressively; archive detail to
  `memory/`. A lean `knowledge/` is a fast, cheap `knowledge/`.
- **Every merge keeps it true.** CI blocks a merge that changes the system without updating the
  relevant knowledge (`noesis.config.yaml → learning.block_merge_if_knowledge_stale`).
