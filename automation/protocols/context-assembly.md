---
id: protocol.context-assembly
kind: policy
version: 0.1.0
status: active
owner: architect
updated: 2026-07-18
---

# Protocol: Context assembly

**Job:** given a task and a set of retrieved nodes, produce the smallest, highest-signal context
that fits the agent's token budget — and maximize prompt-cache reuse. This is the last mile of
token efficiency; retrieval finds *what* is relevant, assembly decides *how much of it* to send.

## Inputs
- `task` — the agent, its `token_budget`, and its goal.
- `candidates` — nodes from `semantic-retrieval`, each with a `tokens` estimate and `summary_ref`.
- `config` — `noesis.config.yaml → tokens`.

## Algorithm

```
budget      = task.token_budget.context_max
threshold   = budget * tokens.compression_threshold      # default 0.8
assembled   = []
running     = 0

# 1. Stable prefix first (maximizes cache hits): pin invariant context up front —
#    the agent spec, active standards, glossary. Same across runs ⇒ served from cache.
for node in stable_prefix(task):
    assembled.add(node); running += node.tokens

# 2. Rank candidates by relevance/token — cheapest signal first.
for node in sort_by(candidates, key = relevance / tokens, desc):
    cost = node.summary_tokens            # start at summary level, not raw
    if running + cost > threshold:
        cost = compress(node)             # see Compression below
    if running + cost > budget:
        break                             # hard stop; note the omission
    assembled.add(node at chosen level); running += cost

# 3. Descend to raw source ONLY for nodes the task will edit, if budget remains.
for node in task.edit_targets:
    if running + node.tokens <= budget:
        upgrade(node -> raw); running += (node.tokens - node.summary_tokens)

emit(assembled, running, omitted)          # omitted list is a first-class output
```

## Compression (in order of preference)
1. **Summarize down a level** (`raw → file → module` summary). Cheapest, lossy-but-structured.
2. **Extract only referenced symbols** from a file rather than the whole file.
3. **Elide unchanged regions** in a diff, keep hunks + signatures.
4. **Reference by id** instead of inlining, when the agent can fetch on demand.

## Cache discipline (Objective #2, second lever)
- The **stable prefix** (agent spec, standards, glossary) is byte-identical across runs so it is
  served from the model's prompt cache. Target `tokens.cache_hit_target` (default 0.5).
- Volatile content (the specific diff, the task) goes **after** the stable prefix, never before —
  a single early byte change invalidates the whole cache.

## Outputs
- `assembled_context` + `token_count` (must be ≤ budget).
- `omitted` — what didn't fit, so the agent knows its blind spots (and can request a follow-up).
- If `token_count > budget` even after compression ⇒ **fail the builder gate** (`budget_overrun`),
  which may escalate to the human gate. Silent truncation is forbidden.

## Why omission is explicit
An agent that doesn't know what it *didn't* see makes confident errors on missing context. Naming
the omission turns a silent failure into a recoverable one (the agent can ask for node X).
