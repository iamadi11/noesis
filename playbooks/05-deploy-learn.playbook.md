---
id: playbook.deploy-learn
kind: playbook
version: 0.1.0
status: active
owner: infrastructure-engineer
updated: 2026-07-18
---

# Playbook 05 — Deployment → Telemetry → Learning → Knowledge Update

**Goal:** ship safely, observe reality, and feed what happened back into the OS so the next
project is cheaper and better. This playbook **closes the loop**.

**Preconditions:** a change that passed the implementation gate chain.

## Steps
1. **Deploy** — `agent.infrastructure-engineer` runs the pipeline.
   - Requires a tested rollback path and wired telemetry before go-live.
2. **Gate: security + human** — deploys are security-sensitive and often irreversible.
3. **Telemetry** — runtime emits token/cost/latency/error/quality events per `telemetry/schemas/`.
   Rollups land in `telemetry/rollups/`; raw ships to a store.
4. **Learn** — `agent.prompt-optimizer` mines `evaluations/results/` + telemetry for prompts to
   improve; proposes experiments (never silent edits).
5. **Knowledge update** — `agent.knowledge-manager`:
   - Overwrites affected `knowledge/` to stay true (current-state).
   - Appends ADRs / new open-issues / newly-rejected-ideas to `memory/` (append-only).
   - Triggers `repository-indexer` to refresh `graphs/`.
6. **Gate: reviewer** — the knowledge/memory updates are themselves reviewed for accuracy.

## Outputs
A running, observed deployment; enriched `knowledge/`, `memory/`, `graphs/`, `prompts/`; updated
`metrics/` against the four objectives.

## On fail (and why this stage is non-optional)
CI blocks the merge if the system changed but `knowledge/` didn't
(`learning.block_merge_if_knowledge_stale`). Skipping the learning step breaks Objective #4 — so
the OS makes it structurally impossible to skip. The output of this stage becomes richer context
for the *next* Problem, which is the entire point of Noesis.
