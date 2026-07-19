---
id: doc.pipelines-readme
kind: doc
version: 0.1.0
status: active
owner: architect
updated: 2026-07-18
---

# pipelines/ — *What is the end-to-end, versioned flow?*

The declarative definition of the whole lifecycle and the CI/CD that enforces it.

| File | Role |
|------|------|
| [`sdlc.pipeline.yaml`](sdlc.pipeline.yaml) | The canonical, machine-executable lifecycle: every stage, producer, output, gate, and dependency. |
| [`ci/`](ci/) | CI/CD workflow templates that enforce the OS's invariants on every change. |

## Two representations, one truth
`sdlc.pipeline.yaml` is what a runtime executes; the [`../playbooks/`](../playbooks/) explain it
for humans. They describe the same flow at different altitudes and are kept in sync by CI
(`ci/noesis-invariants.yml` checks every stage has a matching playbook and vice-versa).

## CI enforces the invariants the OS is built on
CI is not an afterthought here — it is how the principles become non-negotiable:

- **Frontmatter + schema validity** — every spec/graph/gate validates, or the build fails.
- **No stale knowledge** — a change to architecture without a `knowledge/` update fails
  (`learning.block_merge_if_knowledge_stale`). This is ADR-0005 made mechanical.
- **Graph integrity** — no dangling edges; `source_commit` matches `HEAD` after indexing.
- **Contract sync** — an API shape change without a `knowledge/api-contracts.md` update fails.
- **Gate results present** — a merge requires a complete, passing `evaluations/results/` chain.
- **No business logic in the OS** — a lint rule flags domain-specific code under `automation/`.

See [`ci/noesis-invariants.yml`](ci/noesis-invariants.yml).
