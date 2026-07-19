---
id: protocol.incremental-indexing
kind: policy
version: 0.1.0
status: active
owner: repository-indexer
updated: 2026-07-18
---

# Protocol: Incremental indexing

**Job:** keep the graphs and summaries fresh at sub-linear cost. A full re-index on every change
would itself blow the token budget; incremental indexing reprocesses only what changed and its
graph neighbors.

## Trigger
Runs on the output of `change-detection`: a set of changed/added/deleted file paths since the
graph's `source_commit`.

## Algorithm

```
changed = change_detection(since = graph.source_commit)

for file in changed.deleted:
    remove file's nodes; prune edges pointing to them (no dangling edges)

for file in changed.added ∪ changed.modified:
    reparse file -> new symbols, imports, exports
    rebuild file node + symbol nodes + summary (repo→module→file→symbol)
    update edges: contains/exports (local), imports/calls (may touch neighbors)

# Neighbor fixups: only nodes with an edge to a changed node are revisited.
for neighbor in edges_touching(changed):
    revalidate edge endpoints; refresh module/architecture rollup summaries if a child changed

recompute affected summaries bottom-up (symbol → file → module → repo),
  reusing unchanged children's summaries verbatim (cache).

graph.source_commit = HEAD
validate(graph, schema)         # CI-enforced: no dangling edges, schema-valid
```

## Cost invariant
`reprocessed_files ≈ |changed| + |direct neighbors|`, **not** `|repo|`. If reprocessed ≫ changed,
that's the "full re-index on small change" failure mode (agent.repository-indexer) — abort and
investigate the change-detection boundary.

## Summary reuse
Summaries are hierarchical and content-addressed by child hash. A module summary is regenerated
only if a child file's summary hash changed. Unchanged subtrees are free. This is what keeps
indexing cheap enough to run on every commit.

## Consistency guarantees (checked in CI)
- No edge references a non-existent node.
- No node lacks a summary at file level.
- `source_commit` matches `HEAD` after a successful run (else retrieval knows the graph is stale).
