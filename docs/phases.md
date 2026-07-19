---
id: doc.phases
kind: doc
version: 0.1.0
status: active
owner: architect
updated: 2026-07-18
---

# Build phases

Noesis is built incrementally. Each phase produces a usable increment; nothing is a big-bang.
This document maps the ten delivery phases to the concrete assets that realize them, so you can
see exactly where each requirement landed.

| Phase | Theme | Delivered by |
|-------|-------|--------------|
| 1 | **Architecture** | `docs/principles.md`, `docs/architecture.md`, `CONVENTIONS.md`, `noesis.config.yaml` |
| 2 | **Repository** | The 16-folder tree, each with a charter and a `README.md` |
| 3 | **Agents** | `agents/agent.schema.yaml` + 17 specs in `agents/specs/` |
| 4 | **Knowledge** | `knowledge/` — architecture, standards, API contracts, deps, glossary |
| 5 | **Memory** | `memory/` — decisions, rejected-ideas, open-issues, business-rules (append-only) |
| 6 | **Evaluation** | `evaluations/` — gates, rubrics, the six-stage chain |
| 7 | **Automation** | `automation/protocols/` — context assembly, indexing, retrieval, gate runner |
| 8 | **CI/CD** | `pipelines/` — `sdlc.pipeline.yaml` + CI workflow templates |
| 9 | **Self-improvement** | `experiments/`, `metrics/`, `telemetry/`, the on-merge learning loop |
| 10 | **Bootstrapping** | `docs/bootstrap.md` — how to boot a new project on Noesis |

## Sequencing rationale

The order is not arbitrary; each phase depends on the one before it.

1. **Architecture before repository.** You cannot lay out folders correctly until the layering
   and principles are fixed. Structure encodes decisions; decide first.
2. **Agents before knowledge/memory.** Agents are the *consumers* whose needs define what
   knowledge and memory must store. Design the reader before the library.
3. **Knowledge and memory before evaluation.** Gates check outputs *against* known standards and
   contracts. Without knowledge, "is it good?" has no referent.
4. **Evaluation before automation.** Automation exists to run the gates without humans. Define
   the judgment, then automate it — not the reverse.
5. **Automation before CI/CD.** CI is automation triggered by git events. The protocols must
   exist before the triggers can call them.
6. **Everything before self-improvement.** You can only improve a loop that already runs. The
   learning subsystem observes the working system and tunes it.
7. **Bootstrapping last.** The guide can only be honest once the thing it boots exists.

## What "done" means per phase

Each phase is done when its assets have valid frontmatter, cross-reference by `id`, and are
wired into the layer above (an agent referenced by a playbook, a gate referenced by the
pipeline, etc.). Orphaned assets — present but unreferenced — count as not done.
