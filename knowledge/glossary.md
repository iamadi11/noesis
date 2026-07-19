---
id: knowledge.glossary
kind: doc
version: 0.1.0
status: active
owner: knowledge-manager
updated: 2026-07-18
---

# Glossary — the ubiquitous language

Every term the project uses is defined here exactly once. Agents bind to these definitions so that
"user", "account", "order" mean the same thing in the PRD, the code, and the tests. A shared
vocabulary is a token optimization: it removes the re-explanation that ambiguity forces.

## Noesis OS terms (domain-neutral, ship with the OS)

| Term | Definition |
|------|------------|
| **Agent** | A versioned contract (`agents/specs/`) declaring what an AI actor consumes, produces, and is judged by. Not code. |
| **Gate** | An evaluation checkpoint an artifact must pass before handoff. Machine or human. |
| **Artifact** | Any produced, versioned output (PRD, design, code, graph, result). |
| **Handoff** | A versioned transfer: producer agent → typed artifact → gate → consumer agent. |
| **Knowledge** | The current-state snapshot of understanding (`knowledge/`). Overwritten to stay true. |
| **Memory** | The append-only ledger of events and decisions (`memory/`). Never edited in place. |
| **Graph** | A machine-readable model of relationships (module/dependency/architecture/knowledge). The retrieval index. |
| **Context assembly** | Selecting the minimal set of tokens an agent needs for a task, within budget. |
| **Slop** | AI output that is fluent but wrong, redundant, hallucinated, or needlessly complex. What gates exist to catch. |
| **Learning loop** | The on-merge process that updates knowledge, graphs, memory, and prompts so the next project is cheaper. |
| **Token budget** | The hard ceiling on an agent's assembled context; exceeding it fails the run. |

## Project terms

_Populated per project by the `knowledge-manager`. Every domain noun the PRD introduces is defined
here before it appears in code._
