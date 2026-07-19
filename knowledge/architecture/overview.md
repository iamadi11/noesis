---
id: knowledge.architecture.overview
kind: doc
version: 0.1.0
status: template
owner: architect
updated: 2026-07-18
---

# Architecture overview — <PROJECT>

> This is a **template instance**. When a project boots on Noesis, the `architect` agent fills
> this in and keeps it current. The headings are the contract; the content is per-project.

## System context
_What the system is, who uses it, and what external systems it touches. One paragraph + a
context diagram reference (a node id in `graphs/architecture-graph.json`)._

## Components
_The top-level components and each one's single responsibility. Mirror these as nodes in the
architecture graph so retrieval can traverse them._

| Component | Responsibility | Owner agent | Graph node |
|-----------|----------------|-------------|------------|
| _example_ | _..._ | _..._ | _arch:component:example_ |

## Boundaries & contracts
_Where components meet: APIs, events, shared schemas. Every boundary contract is registered in
[`../api-contracts.md`](../api-contracts.md)._

## Data flow
_How data moves through the system for the primary use cases. Reference the data model in
[`data-model.md`](data-model.md)._

## Key quality attributes
_The non-functional priorities this architecture optimizes for (e.g. simplicity, cost, latency),
in priority order. An unstated priority is a hidden trade-off — name it._

## Open architectural questions
_Link to `../../memory/open-issues.md` entries. Do not resolve them silently here._
