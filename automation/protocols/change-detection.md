---
id: protocol.change-detection
kind: policy
version: 0.1.0
status: active
owner: repository-indexer
updated: 2026-07-18
---

# Protocol: Change detection

**Job:** answer "what changed, and what does it affect?" cheaply, so indexing, retrieval, and
evaluation all operate on deltas instead of the whole repo. This is the primitive every other
token optimization builds on.

## What changed (the delta)
The source of truth is git. `change-detection` computes:

```
delta = git diff --name-status <graph.source_commit>..HEAD
      → { added[], modified[], deleted[], renamed[] }
```

Renames are tracked as (delete old node, add new node, carry summary if content hash unchanged) so
a pure move costs almost nothing.

## What it affects (the blast radius)
Beyond the literal file list, change-detection expands the delta through the dependency graph to
the set of nodes whose behavior *could* be affected:

```
blast_radius(delta) = delta ∪ { n : path(n → any changed node) exists in dependency graph,
                                 depth ≤ blast_depth }
```

This drives:
- **Indexing:** which neighbors `incremental-indexing` must revisit.
- **Retrieval:** which nodes a task about the change should consider.
- **Evaluation:** which gates a change must run (a change touching a boundary in the blast radius
  pulls in `gate.architecture`; one touching auth pulls in `gate.security`).

## Content hashing
Each file node stores a content hash. Change-detection uses hashes, not timestamps, so a
touched-but-unchanged file (re-saved, reformatted-then-reverted) produces **no** delta. Timestamps
lie; hashes don't.

## Outputs
- `delta` — added/modified/deleted/renamed paths.
- `blast_radius` — the affected node set.
- `required_gates` — gates implied by the categories the blast radius touches.

## Why this is the keystone
Every "don't re-do the whole repo" behavior downstream depends on a trustworthy, cheap delta. Get
this wrong (miss a changed file, over-report the blast radius) and either correctness suffers or
the cost savings evaporate. It is deliberately git-based and hash-based — boring, exact, cheap.
