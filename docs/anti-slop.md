---
id: doc.anti-slop
kind: doc
version: 0.1.0
status: active
owner: reviewer
updated: 2026-07-18
---

# Preventing AI slop

**Slop** is output that is fluent but wrong, redundant, hallucinated, or needlessly complex. It is
the characteristic failure of confident generation, and left unchecked it compounds: each AI edit
built on slop produces more slop until the codebase is unmaintainable. Preventing it is a core
guardrail, operationalized across the OS — not left to one reviewer's taste.

## The slop signatures (what gates hunt for)

| Signature | What it looks like | Caught by |
|-----------|--------------------|-----------|
| **Hallucinated API** | Calls a symbol/endpoint that doesn't exist | reviewer (checks vs. module graph); testing (fails) |
| **Duplication** | Re-implements logic the graph already exposes | reviewer (reuse check) |
| **Dead abstraction** | Interface/generality with one or zero consumers | reviewer (YAGNI); engineering standard |
| **Copy-paste drift** | Pasted block half-adapted, half not | reviewer (consistency) |
| **Cargo-cult pattern** | A pattern applied because it's common, not because it fits | reviewer; architecture gate |
| **Confident unsourced claim** | An assertion with no citable basis | reviewer; research evidence rating |
| **Scope inflation** | Building beyond the requirement | reviewer (traceability); PRD out-of-scope |
| **Happy-path-only** | Ignores errors/edges named in the design | testing gate |
| **Context-starved guess** | Fills a gap it should have flagged | context-frame prompt (declare omissions) |

## The layered defense

Slop is prevented at four layers, cheapest first — so most slop dies before an expensive gate sees it:

1. **Retrieval** — graph-first retrieval gives agents the *right* context, so they hallucinate less
   in the first place. The `context-frame` prompt forces them to declare blind spots instead of
   guessing.
2. **Standards** — `knowledge/standards/engineering.md` makes anti-slop rules *checkable*, turning
   taste into pass/fail.
3. **Gates** — the reviewer gate hunts the signatures above with evidence; a pass without evidence
   is itself a fail. Specialist gates catch domain slop (insecure, slow, untested).
4. **Learning** — repeated slop of one class becomes a new standard or a tightened prompt via the
   loop, so the same slop can't recur. `metrics/`: slop-findings-per-KLOC must trend down.

## Why this is structural, not vibes
Any single reviewer — human or AI — misses slop inconsistently. By encoding the signatures as
graph checks, standards, and rubrics, detection becomes *reproducible*: the same defect is caught
the same way every time, and the catch rate improves as the learning loop feeds new signatures
back in.
