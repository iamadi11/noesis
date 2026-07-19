---
id: doc.playbooks-readme
kind: doc
version: 0.1.0
status: active
owner: architect
updated: 2026-07-18
---

# playbooks/ — *In what order, by whom?*

Runnable procedures. Each SDLC stage is a playbook: its preconditions, the agent that owns it, the
steps, the gate that closes it, and its outputs. Playbooks are the *human-and-machine-readable*
form of the pipeline; [`../pipelines/sdlc.pipeline.yaml`](../pipelines/sdlc.pipeline.yaml) is the
machine-executable form. They must stay in sync (CI checks it).

## Why both playbooks and a pipeline?
The pipeline is what the runtime executes; the playbook is what a human (or a debugging agent)
reads to understand *why* a stage is shaped the way it is. Separating them lets the pipeline be
terse and the playbook be explanatory without bloating either.

## The stages

| Playbook | Stage | Owner | Closing gate |
|----------|-------|-------|--------------|
| [`01-problem.playbook.md`](01-problem.playbook.md) | Problem → Evidence | problem-discovery, market-research | reviewer |
| [`02-prd.playbook.md`](02-prd.playbook.md) | PRD | product-manager | reviewer + human |
| [`03-architecture.playbook.md`](03-architecture.playbook.md) | Architecture → Design | architect | architecture + human |
| [`04-implementation.playbook.md`](04-implementation.playbook.md) | Implementation → Testing | *-engineer, testing-engineer | builder→reviewer→security→testing |
| [`05-deploy-learn.playbook.md`](05-deploy-learn.playbook.md) | Deploy → Telemetry → Learning | infrastructure, knowledge-manager | security + human, then reviewer |

## Playbook anatomy
Every playbook states: **preconditions** (what must be true / present to start), **owner agent**,
**steps** (each an agent action with its inputs/outputs), **closing gate**, **outputs**, and
**on-fail** (where control returns). A stage cannot start until its preconditions — the prior
stage's gated outputs — exist.
