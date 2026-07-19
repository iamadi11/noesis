---
id: playbook.problem
kind: playbook
version: 0.1.0
status: active
owner: problem-discovery
updated: 2026-07-18
---

# Playbook 01 — Problem → Research → Evidence

**Goal:** turn a raw signal into a validated, evidenced problem statement ready for a PRD.

**Preconditions:** a raw signal exists (human input or a `telemetry/` production event).

## Steps
1. **Frame the problem** — `agent.problem-discovery` → `analysis/problem.md`.
   - Check `memory/rejected-ideas.md` first; kill zombie ideas or cite new evidence.
   - Output must be falsifiable: who, the job-to-be-done, the cost of the status quo.
2. **Gate: reviewer** — verify the problem is a problem (not a disguised solution), scoped, falsifiable.
3. **Research** — `agent.market-research` → `analysis/research.md`.
   - Top-3 existing solutions; the specific gap; each claim sourced.
4. **Collect evidence** — `agent.market-research` → `analysis/evidence.md`.
   - Every claim rated strong/moderate/weak/anecdotal; unverifiable claims flagged, not asserted.
5. **Gate: reviewer** — every brief claim cites an evidence id.

## Outputs
`analysis/problem.md`, `analysis/research.md`, `analysis/evidence.md` — all gated.

## On fail
Return to the producing agent with the failing rubric criteria. Do not proceed to PRD with an
unvalidated problem — a wrong problem here is the most expensive error in the whole lifecycle.
