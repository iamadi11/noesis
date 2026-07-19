---
id: protocol.semantic-retrieval
kind: policy
version: 0.1.0
status: active
owner: repository-indexer
updated: 2026-07-18
---

# Protocol: Semantic retrieval

**Job:** turn a task into the minimal set of relevant nodes, by walking graphs — not by grepping
or embedding the whole repo. Retrieval decides *what* is relevant; `context-assembly` decides how
much to send.

## Strategy: `graph_first` (config default)

```
1. SEED     Resolve the task to seed nodes:
              - from an id (an ADR, a contract, a component), or
              - from a diff (changed files → their module/symbol nodes), or
              - from a PRD (its concepts → knowledge-graph nodes).

2. EXPAND   Walk edges from the seeds to the relevant neighborhood:
              - dependency graph for blast radius ("what calls/imports this?"),
              - architecture graph for boundaries ("what component owns this?"),
              - knowledge graph for rationale ("what decision constrains this?").
            Bound the walk by retrieval.max_files_per_query (default 12). Rank
            frontier nodes by edge weight × recency; stop at the cap.

3. LEVEL    For each node, choose the coarsest summary level that could answer the
            task (repo → module → file → symbol). Routing rarely needs raw source.

4. HANDOFF  Emit ranked nodes with their chosen level + token estimate to
            context-assembly.
```

## Why graph-first beats embeddings-only (ADR-0002, rejected R-001)
- **Structure is signal.** "What breaks if I change this function?" is an exact graph traversal;
  an embedding search returns *similar-looking* code, which is not the same as *dependent* code.
- **Bounded cost.** A graph walk visits O(neighborhood), not O(repo). Embedding every file scales
  with repo size — the very thing we're trying to escape.
- **Explainable.** The retrieved set is justified by a path of edges, which the reviewer can audit
  ("you touched X; here's the caller chain"). Embedding similarity is a black box.

Embeddings still help for **fuzzy discovery** ("where do we do anything like rate-limiting?") when
no seed id exists. When used, they *propose seed nodes* for a graph walk — they never replace it.

## Escalation ladder (cost-ascending)
`summary_only` → `graph_first` → `full_file_allowed`. An agent declares the lowest rung it needs
in its spec (`context.retrieval`). Only the `repository-indexer` defaults to `full_file_allowed`,
because reading raw source *is* its job.

## Freshness guard
Retrieval checks the graph's `source_commit` against `HEAD`. If they diverge on files in the
neighborhood, it triggers `change-detection` + `incremental-indexing` before answering, so it
never retrieves against a stale map (open-issue O-001).
