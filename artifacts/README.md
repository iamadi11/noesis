---
id: doc.artifacts-readme
kind: doc
version: 0.1.0
status: active
owner: architect
updated: 2026-07-18
---

# artifacts/ — *Where do generated outputs live?*

Per-run generated outputs: PRDs, design docs, and other produced deliverables. Artifacts are
addressed by a stable id and retained by policy — the **index is versioned in git; bulky payloads
are not** (see `.gitignore`). This keeps full traceability without bloating the repository.

## Layout

```
artifacts/
  prd/         <prd-id>/            # one dir per PRD, versioned
  design/      <design-id>/         # technical designs
  <other>/     ...                  # any produced deliverable, namespaced by kind
```

Each artifact dir carries a small `index.md` with frontmatter (id, producer, run_id, status) that
git tracks. Large binary or regenerable payloads live under a `payload/` subdir that git ignores;
they ship to an artifact store keyed by the same id.

## Retention policy
- **Index records:** kept in git indefinitely (they are small and are the provenance trail).
- **Payloads:** retained in the store per the project's policy; the index always records where a
  payload lives and whether it's still available.
- **Superseding:** a new version of an artifact does not delete the old; it links `supersedes` so
  lineage is intact (Principle 5).

## Why separate index from payload
Versioning a 50 MB build output in git poisons every future clone and retrieval. Versioning its
*index* — who made it, from what, when, and where the bytes are — preserves everything the OS
needs to reason about it at a fraction of the cost. Same distill-don't-dump discipline as
`telemetry/` and `knowledge/`.
