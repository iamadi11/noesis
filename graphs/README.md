---
id: doc.graphs-readme
kind: doc
version: 0.1.0
status: active
owner: repository-indexer
updated: 2026-07-18
---

# graphs/ — *How is everything connected?*

The retrieval index. These machine-readable graphs are what make "never send the whole repo"
possible. Retrieval walks a graph to find the *minimal relevant set*, then fetches only those
nodes' source — usually at a summary level, only descending to raw code at the leaf. This is the
mechanical core of Objective #2 (−90% tokens).

## The four graphs

| Graph | Nodes | Edges | Answers |
|-------|-------|-------|---------|
| **module** (`module-graph.json`) | files, symbols | contains, exports | "Where is X? What's in this module?" |
| **dependency** (`dependency-graph.json`) | modules, packages | imports, calls | "What breaks if I change X?" (blast radius) |
| **architecture** (`architecture-graph.json`) | components, boundaries | data-flow, owns | "How do the big pieces relate?" |
| **knowledge** (`knowledge-graph.json`) | concepts, decisions, artifacts | relates, supersedes, evidences | "What do we know about X, and why?" |

All four validate against [`schemas/`](schemas/). They share a node-id namespace so a query can
hop across graphs (from a `concept` in the knowledge graph to the `module` that implements it).

## Hierarchical summaries

Alongside the graphs, `summaries/` holds the zoom levels: `repo → module → file → symbol`. A query
starts at the coarsest level that could answer it and descends only as needed. Reading a
one-paragraph module summary to decide relevance costs ~50 tokens; reading the module costs
thousands. The summary is almost always enough to *route*, and routing is most of retrieval.

## Freshness is everything

A stale graph silently degrades retrieval (open-issue O-001). So graphs are:
- **Incrementally rebuilt** by the `repository-indexer` on change detection — only changed files
  and their graph neighbors are reprocessed (never a full re-scan).
- **Schema-validated in CI** — no dangling edges, no references to deleted symbols.
- **Regenerable** — they are derived from source, so `.gitignore` keeps heavy caches out of git
  while the canonical graphs stay versioned.

## How an agent uses graphs (the retrieval contract)

1. Resolve the task to a set of **seed nodes** (from the PRD, the diff, or an id).
2. Walk the dependency/architecture graph to the **relevant neighborhood** (bounded by
   `retrieval.max_files_per_query`).
3. Pull **summaries** for that neighborhood; assemble context.
4. Descend to **raw source** only for the nodes the task actually edits, within token budget.

See [`../automation/protocols/semantic-retrieval.md`](../automation/protocols/semantic-retrieval.md).
