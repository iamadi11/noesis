---
id: doc.principles
kind: doc
version: 0.1.0
status: active
owner: architect
updated: 2026-07-18
---

# First principles

Noesis is derived from a small set of axioms. When a design decision is contested, resolve it
by asking which choice better serves these principles — in order. Later principles yield to
earlier ones.

## 1. Context is the scarce resource, not compute

The binding constraint on an AI engineering system is not model intelligence or GPU time. It is
the quantity and *quality* of information you can place in the model's attention window, and the
price of doing so. A dumber model with the right 5,000 tokens beats a smarter model with the
wrong 100,000.

**Consequences.** We invest in retrieval, summarization, and graphs far more than in prompts.
We measure success partly in *tokens saved*. We treat "just send the whole file" as a bug.

## 2. The repository is a graph, not a pile of files

Source code has structure: modules import modules, functions call functions, decisions
constrain designs. That structure is a graph. Directory listings are a lossy, expensive
projection of it.

**Consequences.** Retrieval walks `graphs/` first. We answer "what does this change affect?"
by traversing the dependency graph, not by grepping. A file is fetched only after the graph
says it is relevant.

## 3. Knowledge must outlive the conversation

An agent's context window is volatile RAM. It is erased between runs and truncated within them.
Any understanding that is expensive to reconstruct must be persisted to disk — `memory/` and
`knowledge/` — before the window closes.

**Consequences.** "Learning" is not a vibe; it is a write. The end of every task includes a
persistence step. If it is not written down, it did not happen, and the next agent will pay to
rediscover it.

## 4. No output is trusted until it is evaluated

Generation is cheap, fluent, and confidently wrong. That combination is *why* it needs gates.
Trust is a property of an evaluated artifact, not of the model that produced it.

**Consequences.** The evaluation chain (`evaluations/`) is not optional QA bolted on at the
end; it is the acceptance protocol. Nothing merges without passing. "Prevent AI slop" is
operationalized here: slop is exactly the output that fails a rubric.

## 5. Every artifact is versioned and attributable

For any artifact — a PRD, a graph, a line of code — we can recover: what produced it, which
agent and prompt version, from which inputs, and what it superseded.

**Consequences.** Frontmatter headers everywhere. Append-only logs for decisions. Semantic
versioning for prompts and specs. Reproducibility is a feature, not an audit burden.

## 6. The system improves itself

A project that does not leave the OS smarter has wasted its most valuable byproduct. Better
summaries, better prompts, better standards, fewer repeated mistakes — these are harvested
automatically.

**Consequences.** The learning loop (`experiments/`, `metrics/`, and the on-merge hooks) is a
first-class subsystem. "Make every future project cheaper and better" is enforced in CI, not
left to goodwill.

## 7. No business logic lives here

Noesis is domain-neutral. It knows how to *run* engineering, not what your product does. The
moment a rule only makes sense for one product, it belongs in that product's repo.

**Consequences.** This repo is safe to fork into any company. The test for any addition: *would
a fintech and a game studio both want this?* If not, it is project content, not OS.

---

## The tensions we accept

First principles conflict in practice. We resolve them deliberately, not by accident:

- **Persist everything (P3) vs. token efficiency (P1).** We persist *distilled* knowledge, not
  raw transcripts. `knowledge/` is curated and small; raw material is summarized then dropped.
- **Evaluate everything (P4) vs. reduce human effort (Objective 1).** Machines run every gate;
  humans are pulled in only for the decisions `noesis.config.yaml → evaluation.human_gate`
  reserves for them. The chain is mostly autonomous.
- **Version everything (P5) vs. simplicity.** We version artifacts that inform future decisions.
  We do not version regenerable caches (see `.gitignore`).
