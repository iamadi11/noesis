---
id: doc.agents-index
kind: doc
version: 0.1.0
status: active
owner: architect
updated: 2026-07-18
---

# Agents

An agent is a **contract**, not a script. Each spec in [`specs/`](specs/) declares purpose,
inputs, outputs, allowed context, token budget, acceptance criteria, and failure modes — and
validates against [`agent.schema.yaml`](agent.schema.yaml). A runtime (any SDK/harness) executes
agents by reading these specs; the OS never hard-codes an agent's behavior.

## Design rules for agents

- **One job per agent.** If a purpose needs "and", split it. Narrow agents are cheaper to
  evaluate and easier to improve.
- **Match model tier to difficulty.** Reasoning-tier for architecture and hard review;
  workhorse for building; fast for indexing/summarizing. Cost discipline is Objective #2.
- **Least-context.** An agent may read only the `context.sources` it declares, `graph_first`.
  Broad context is a smell, not a feature.
- **Every output is gated.** An agent hands off only after its `gates` pass.

## Roster

Agents map onto the SDLC stages (see [`../docs/architecture.md`](../docs/architecture.md)).

| Agent | Role | Tier | Owns stage |
|-------|------|------|------------|
| [`agent.problem-discovery`](specs/problem-discovery.agent.yaml) | Problem Discovery | reasoning | Problem |
| [`agent.market-research`](specs/market-research.agent.yaml) | Market Research | workhorse | Research, Evidence |
| [`agent.product-manager`](specs/product-manager.agent.yaml) | Product Manager | reasoning | PRD |
| [`agent.architect`](specs/architect.agent.yaml) | Architect | reasoning | Architecture, Design |
| [`agent.frontend-engineer`](specs/frontend-engineer.agent.yaml) | Frontend Engineer | workhorse | Implementation |
| [`agent.backend-engineer`](specs/backend-engineer.agent.yaml) | Backend Engineer | workhorse | Implementation |
| [`agent.database-engineer`](specs/database-engineer.agent.yaml) | Database Engineer | workhorse | Implementation |
| [`agent.infrastructure-engineer`](specs/infrastructure-engineer.agent.yaml) | Infrastructure Engineer | workhorse | Deployment |
| [`agent.testing-engineer`](specs/testing-engineer.agent.yaml) | Testing Engineer | workhorse | Testing |
| [`agent.security-engineer`](specs/security-engineer.agent.yaml) | Security Engineer | reasoning | Evaluation (security gate) |
| [`agent.performance-engineer`](specs/performance-engineer.agent.yaml) | Performance Engineer | workhorse | Evaluation (perf) |
| [`agent.reviewer`](specs/reviewer.agent.yaml) | Reviewer | reasoning | Evaluation (review gate) |
| [`agent.prompt-optimizer`](specs/prompt-optimizer.agent.yaml) | Prompt Optimizer | reasoning | Learning |
| [`agent.knowledge-manager`](specs/knowledge-manager.agent.yaml) | Knowledge Manager | workhorse | Learning, Knowledge Update |
| [`agent.repository-indexer`](specs/repository-indexer.agent.yaml) | Repository Indexer | fast | (cross-cutting: builds graphs) |
| [`agent.evaluation-agent`](specs/evaluation-agent.agent.yaml) | Evaluation Agent | workhorse | Evaluation (orchestrates chain) |
| [`agent.documentation-agent`](specs/documentation-agent.agent.yaml) | Documentation Agent | fast | (cross-cutting: docs) |

## Orchestration

Agents don't call each other directly. The **pipeline** ([`../pipelines/sdlc.pipeline.yaml`](../pipelines/sdlc.pipeline.yaml))
sequences them, and the **evaluation-agent** orchestrates the gate chain. This keeps agents
composable and independently replaceable — swap the `frontend-engineer` implementation without
touching anyone who consumes its output contract.
