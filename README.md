# Noesis

**An AI-native software engineering operating system.**

Noesis is not an application. It is the *substrate* an AI-built software company runs on —
the reusable infrastructure that lets AI agents carry a project from customer problem to
deployed, telemetered, continuously-improving software, while a small number of humans
supervise instead of type.

> In Greek epistemology, *eidos* is the **form** of a thing and *noesis* is the **act of
> intelligent cognition** that grasps it. This repository is the cognition layer for
> software: the memory, the reasoning scaffolds, the graphs, and the gates that let AI
> *understand* a codebase instead of re-reading it.

Think of it as **Linux for AI software development**: a kernel of conventions, contracts,
and tooling that any project boots on top of. The business logic lives in *your* project.
The engineering operating system lives here, and it is designed to be forked once and
reused across every future startup.

---

## The four numbers this repository exists to move

Noesis is engineered against four measurable objectives. Every folder, contract, and gate
below traces back to at least one of them (see [`metrics/objectives.md`](metrics/objectives.md)).

| # | Objective | Mechanism |
|---|-----------|-----------|
| 1 | **−95% human effort** | Agents own the SDLC; humans review at gates, not keystrokes. |
| 2 | **−90% token usage** | Never send the whole repo. Retrieve from graphs + hierarchical summaries. |
| 3 | **↑ software quality, continuously** | No output merges without passing the evaluation chain. |
| 4 | **Compounding returns** | Every merged PR updates memory, knowledge, and prompts, so the next project is cheaper and better. |

Plus the guardrails that make those numbers *safe*: **prevent AI slop**, **never lose
architectural knowledge**, **make every future project cheaper and better**.

---

## First principles

These are the axioms. Everything else is derived. See [`docs/principles.md`](docs/principles.md).

1. **Context is the scarce resource, not compute.** The bottleneck is the model's attention
   window and its price. Optimize the *information* an agent sees, not the size of the model.
2. **The repository is a graph, not a pile of files.** Modules, dependencies, and decisions
   form graphs. Retrieval walks the graph; it does not `cat` directories.
3. **Knowledge must outlive the conversation.** A chat context is volatile RAM. Noesis is the
   disk. Anything worth keeping is written to `memory/` or `knowledge/`, versioned, before the
   context is discarded.
4. **No output is trusted until it is evaluated.** Generation is cheap and confident; that is
   exactly why it needs gates. Trust is earned per-artifact, not granted per-model.
5. **Every artifact is versioned and attributable.** Who/what produced it, from which inputs,
   under which prompt version, is always recoverable.
6. **The system improves itself.** Each project leaves the OS smarter: better summaries, better
   prompts, better standards. Learning is a build step, not a hope.
7. **No business logic lives here.** This repo is domain-neutral. If it only makes sense for one
   product, it belongs in that product's repo, not in Noesis.

---

## Repository map

Each folder has a **single responsibility**. Full charters in
[`docs/architecture.md`](docs/architecture.md).

| Folder | Single responsibility |
|--------|----------------------|
| [`agents/`](agents/) | Versioned specifications for every specialized AI agent (contract, budget, gates). |
| [`memory/`](memory/) | Persistent, append-only project memory: decisions, rejected ideas, open issues, rules. |
| [`knowledge/`](knowledge/) | Curated, current understanding: architecture, standards, API contracts, dependencies, glossary. |
| [`analysis/`](analysis/) | Outputs of the discovery stages: problem, research, evidence, market. |
| [`graphs/`](graphs/) | Machine-readable module / architecture / dependency / knowledge graphs (the retrieval index). |
| [`prompts/`](prompts/) | The prompt library: versioned, evaluated, reusable prompt templates. |
| [`playbooks/`](playbooks/) | Runnable procedures — the SDLC stages as step-by-step, agent-assigned workflows. |
| [`evaluations/`](evaluations/) | The evaluation framework: gates, rubrics, and stored results. |
| [`automation/`](automation/) | The glue: context assembly, indexing, retrieval, and gate-runner tooling (infra, not domain). |
| [`pipelines/`](pipelines/) | The versioned end-to-end workflow and CI/CD definitions. |
| [`telemetry/`](telemetry/) | Runtime signals: token spend, agent traces, cost, latency, production quality. |
| [`templates/`](templates/) | Reusable document templates: PRD, ADR, tech design, RFC, agent spec, rubric. |
| [`artifacts/`](artifacts/) | Generated per-run outputs, addressed and retained by policy. |
| [`experiments/`](experiments/) | Hypotheses and A/B tests over prompts, models, and workflows. |
| [`metrics/`](metrics/) | KPI definitions and dashboards tracking the four objectives. |
| [`docs/`](docs/) | Documentation of the OS itself: principles, architecture, phases, ADRs, bootstrap. |

---

## The lifecycle, in one line

```
Problem → Research → Evidence → PRD → Architecture → Design → Implementation
   → Testing → Evaluation → Deployment → Telemetry → Learning → Knowledge Update ↺
```

Every arrow is a versioned handoff with a defined producer agent, input contract, output
contract, and evaluation gate. The loop closes: *Knowledge Update* feeds the *next* Problem
with cheaper, richer context. See [`pipelines/sdlc.pipeline.yaml`](pipelines/sdlc.pipeline.yaml)
and [`playbooks/`](playbooks/).

---

## How a human uses this

You do three things. The system does the rest.

1. **State the problem.** Drop a problem statement in; the discovery agents research it.
2. **Answer at the gates.** When an evaluation gate needs a human decision, you get a focused
   question with the evidence attached — not a diff to read line by line.
3. **Let it learn.** On merge, the learning loop updates memory, knowledge, and prompts
   automatically. You do nothing.

---

## Status

`v0.1.0` — foundational architecture. This is the **specification and scaffold** of the
operating system: contracts, schemas, conventions, and the reference tooling shape. It is
deliberately implementation-light and convention-heavy, because the conventions are the
product. See [`docs/roadmap.md`](docs/roadmap.md) for what hardens next.

## License

MIT — see [`LICENSE`](LICENSE). Fork it, reuse it, build your company on it.
