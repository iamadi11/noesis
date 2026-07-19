---
id: doc.architecture
kind: doc
version: 0.1.0
status: active
owner: architect
updated: 2026-07-18
---

# Architecture

Noesis is layered. Higher layers depend on lower layers; lower layers never import upward. This
keeps the substrate stable while the workflow on top evolves.

```
┌─────────────────────────────────────────────────────────────────────┐
│  L5  WORKFLOW      pipelines/  playbooks/         (how work flows)    │
├─────────────────────────────────────────────────────────────────────┤
│  L4  ACTORS        agents/  prompts/              (who does the work) │
├─────────────────────────────────────────────────────────────────────┤
│  L3  JUDGMENT      evaluations/  experiments/     (is it good?)       │
├─────────────────────────────────────────────────────────────────────┤
│  L2  RUNTIME       automation/  telemetry/  metrics/  (glue + signal) │
├─────────────────────────────────────────────────────────────────────┤
│  L1  MEMORY        knowledge/  memory/  graphs/  analysis/  artifacts/│
│                                                   (what is known)     │
├─────────────────────────────────────────────────────────────────────┤
│  L0  CONVENTION    noesis.config.yaml  docs/  templates/  CONVENTIONS │
└─────────────────────────────────────────────────────────────────────┘
```

The dependency rule: an agent (L4) may read knowledge (L1) and be judged by a gate (L3), but
`knowledge/` never depends on which agent wrote it. This is what makes the OS reusable.

---

## Folder charters (single responsibility each)

Each folder answers exactly one question. If a file doesn't serve that folder's question, it is
in the wrong folder.

### `agents/` — *Who does the work?*
Versioned specifications for each specialized agent. An agent spec is a **contract**: purpose,
inputs, outputs, context sources, token budget, acceptance criteria, and failure modes. Specs
are declarative; they do not contain runtime code (that's `automation/`). Index:
[`agents/AGENTS.md`](../agents/AGENTS.md). Schema: [`agents/agent.schema.yaml`](../agents/agent.schema.yaml).

### `memory/` — *What decisions and history define this project?*
Persistent, **append-only** project memory. Decisions (ADR-style), rejected ideas (with the
reason, so they aren't re-proposed), open issues, and business rules. Memory is the antidote to
"never lose architectural knowledge." It is written *at gates*, not ad hoc.

### `knowledge/` — *What is currently true about the system?*
Curated, **current** understanding: architecture overview, coding standards, API contracts,
dependency inventory, glossary. Where `memory/` is an append-only ledger of *events*,
`knowledge/` is the *current-state* snapshot, continuously overwritten to stay true. This is the
primary retrieval target.

### `analysis/` — *What did we learn about the problem and market?*
Outputs of the discovery stages: problem discovery, market research, evidence collection.
Timestamped reports that feed the PRD. Read-mostly after their stage completes.

### `graphs/` — *How is everything connected?*
Machine-readable graphs — module, architecture, dependency, and knowledge — plus their schemas.
This is the index that makes graph-first retrieval possible. Regenerated incrementally on change.

### `prompts/` — *How do we ask?*
The prompt library. Versioned, evaluated, reusable prompt templates with typed variables. The
Prompt Optimizer agent proposes changes here; experiments validate them before they become
`active`.

### `playbooks/` — *In what order, by whom?*
Runnable procedures. Each SDLC stage is a playbook: preconditions, the agent that owns it,
step-by-step actions, the gate that closes it, and outputs. Playbooks compose into pipelines.

### `evaluations/` — *Is it good enough to accept?*
The evaluation framework: gate definitions, rubrics (scored criteria), and stored results. The
chain `builder → reviewer → architecture → security → testing → human` lives here. No merge
without a passing result.

### `automation/` — *What glue makes this run without humans?*
Infrastructure tooling and protocols: context assembly, incremental indexing, semantic
retrieval, gate runner, change detection. This is where "reduce human effort" is implemented.
It contains **no business logic** — only mechanisms.

### `pipelines/` — *What is the end-to-end, versioned flow?*
The declarative definition of the whole lifecycle and the CI/CD that enforces it. One file
describes every stage, its playbook, its gate, and its handoff contract.

### `telemetry/` — *What actually happened at runtime?*
Signal collection: token spend, agent traces, cost, latency, and production quality events.
Schemas plus rollup conventions. Raw dumps ship to a store; git keeps rollups.

### `templates/` — *What shape should new artifacts take?*
Reusable document templates: PRD, ADR, tech design, RFC, agent spec, eval rubric, playbook,
experiment. Templates enforce structure so agents produce consistent, parseable output.

### `artifacts/` — *Where do generated outputs live?*
Per-run generated outputs, content-addressed and retained by policy. The index is versioned; the
bulky payloads are not (see `.gitignore`). This keeps history without bloating the repo.

### `experiments/` — *What are we testing to get better?*
Hypotheses and A/B tests over prompts, models, and workflows. An experiment has a hypothesis, a
metric, a variant, and a verdict that either promotes a change or records why it was rejected.

### `metrics/` — *Are we moving the four numbers?*
KPI definitions and dashboard specs tied to the core objectives (human effort, tokens, quality,
compounding return). The scoreboard for the whole OS.

### `docs/` — *How does the OS itself work?*
Documentation of Noesis: principles, this architecture, the phase plan, ADRs about the OS,
and the bootstrapping guide. Meta, not project.

---

## The versioned SDLC workflow

Every stage is a **versioned handoff**. A handoff is (producer agent) → (typed output artifact)
→ (gate) → (consumer agent). If the gate fails, the flow returns to the producer with the
rubric scores; it does not proceed.

```
 Stage            Owner agent            Output artifact          Closing gate
 ─────            ──────────             ───────────────          ────────────
 Problem          problem-discovery      analysis/problem.md      reviewer
 Research         market-research        analysis/research.md     reviewer
 Evidence         market-research        analysis/evidence.md     reviewer
 PRD              product-manager        artifacts/prd/           reviewer + human
 Architecture     architect              knowledge/architecture   architecture + human
 Design           architect + engineers  artifacts/design/        architecture
 Implementation   *-engineer             code + artifacts         builder → reviewer
 Testing          testing-engineer       tests + results          testing
 Evaluation       evaluation-agent       evaluations/results/     (the chain itself)
 Deployment       infrastructure-eng     pipelines/ run           security + human
 Telemetry        (runtime)              telemetry/               —
 Learning         knowledge-manager      memory/ + prompts/       reviewer
 Knowledge Update knowledge-manager      knowledge/ + graphs/     architecture
        │
        └──────────────────────────────────────────► feeds the next Problem
```

The loop is the point. By the time a project reaches *Knowledge Update*, it has enriched the
graphs, memory, and prompts that the *next* problem will retrieve — so the next project starts
with more context and spends fewer tokens to reach the same quality. That is Objective #4 made
mechanical.

Canonical machine-readable definition: [`pipelines/sdlc.pipeline.yaml`](../pipelines/sdlc.pipeline.yaml).

---

## Why these boundaries (challenged decisions)

- **Why split `memory/` from `knowledge/`?** Because *events* and *current state* have different
  lifecycles. Decisions are immutable history (append-only); architecture is a living snapshot
  (overwritten). Merging them would force one to lie about its update semantics.
- **Why is `automation/` forbidden business logic?** Reusability. The instant automation encodes
  a product rule, the OS stops being forkable. Product rules live in `memory/business-rules.md`
  of the *project*, as data agents read — never as code in the OS.
- **Why graphs as their own folder, not inside `knowledge/`?** Because graphs are machine-first
  and regenerable; knowledge is human-curated and authored. Different producers, different trust,
  different review. Co-locating them would blur both.
- **Why a `human` gate at the end of a chain meant to remove humans?** Removing 95% of effort is
  not removing 100%. Humans are reserved for irreversible and architecture-defining calls, where
  their judgment is worth its token cost. See `noesis.config.yaml → evaluation.human_gate`.
