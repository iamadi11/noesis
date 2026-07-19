---
id: doc.prompts-readme
kind: doc
version: 0.1.0
status: active
owner: prompt-optimizer
updated: 2026-07-18
---

# prompts/ — *How do we ask?*

The prompt library: versioned, evaluated, reusable prompt templates. Prompts are **assets**, not
throwaway strings. They are versioned like code, improved by evidence, and shared across every
agent and project — so a lesson learned once (a phrasing that reduces hallucination, a structure
that saves tokens) is never re-learned.

## Structure

| Path | Holds |
|------|-------|
| [`library/`](library/) | The active and draft prompt templates, one per purpose. |

## Prompt template anatomy

Every prompt carries frontmatter (`id: prompt.<purpose>`, semver, status) and declares typed
variables so callers can't misuse it. Prose instructions reference OS concepts by their glossary
term, so a prompt improvement propagates meaning consistently.

## How prompts improve (the loop, not the whim)

Prompts are **not** edited by hunch. The `prompt-optimizer`:
1. Reads `evaluations/results/` + `telemetry/` to find prompts with low pass rate, high token
   cost, or frequent rework.
2. Proposes a revised version as an **experiment** (`experiments/`) with a control and a variant.
3. The experiment routes a fraction of runs to the variant and measures the target metric.
4. Only a variant that **beats control** is promoted to `status: active`. Losers are archived with
   their verdict (so the same dead-end isn't retried).

This is why the library compounds: every project's runs are evidence that sharpens the prompts the
next project inherits (Objective #4).

## Token discipline in prompts
- Prefer references (ids) over inlined context — let retrieval fetch, don't paste.
- Put invariant instructions in the **stable prefix** (cache-friendly); put the task-specific ask
  last (see `context-assembly` cache discipline).
- A prompt that gets the same quality in fewer tokens wins. Length is a cost, not a virtue.
