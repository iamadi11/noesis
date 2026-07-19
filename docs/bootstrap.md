---
id: doc.bootstrap
kind: doc
version: 0.1.0
status: active
owner: architect
updated: 2026-07-18
---

# Bootstrapping guide — booting a new project on Noesis

This is Phase 10: how a new software company or project starts on top of the operating system.
The goal is that a new project reaches its first gated PRD with almost no bespoke setup, and gets
cheaper from there.

## 1. Vendor the OS

You have two supported topologies; pick per your constraints.

- **Template repo (simplest):** create your project repo *from* Noesis (GitHub "Use this
  template"). You own a copy; pull OS updates by merging upstream.
- **Subtree/submodule (shared OS):** keep Noesis as a `git subtree` under `os/` (or a submodule)
  and put project source alongside. Multiple projects share one pinned OS version.

> In this environment the OS currently lives under `noesis/` inside a host repo. To lift it into
> its own standalone repository, see **§7 Extraction** below.

## 2. Configure

Edit `noesis.config.yaml`:
- Set `project.name` / `slug`.
- Map `models.*` tiers to the provider IDs you actually run.
- Adjust `tokens.context_budget_default` and gate policy if your risk tolerance differs.

That's the only file you must touch to boot. Everything else is filled in *by the agents* as the
project runs.

## 3. Seed memory (once)

- `memory/business-rules.md` — your domain's hard constraints (the one place business logic
  lives, as data). Start with what you already know must always be true.
- `knowledge/glossary.md` — your first domain terms. Agents will extend it.

Leave `memory/decisions.md`, `rejected-ideas.md`, and `open-issues.md` seeded with the OS's own
entries; append your project's as they arise.

## 4. Wire CI

Copy `pipelines/ci/noesis-invariants.yml` to `.github/workflows/`. This turns the OS's principles
into build-breaking checks from commit one — frontmatter, schema validity, graph integrity, no
stale knowledge, contract sync, and the objective metrics.

## 5. Run the lifecycle

Drop a problem in and let the pipeline drive:

```
State the problem  →  agents run playbook 01 → 05  →  you answer only at human gates
```

Concretely:
1. Add a raw signal (a paragraph, or a `telemetry/` production event).
2. The `problem-discovery` → `market-research` agents produce gated `analysis/`.
3. `product-manager` produces a PRD; you approve it at the human gate (the *what*).
4. `architect` designs it; you approve architecture (the least-reversible call).
5. Engineers build in parallel against registered contracts; the gate chain evaluates; most
   changes auto-merge.
6. Deploy → telemetry → learning updates `knowledge/`, `graphs/`, `memory/`, `prompts/`.

Your job is steps 3 and 4's *decisions*, not the typing. That ratio is the −95% effort.

## 6. Let it compound

By your second feature, retrieval is walking a richer graph and prompts have been tuned by your
first feature's telemetry — so it costs fewer tokens and fewer human touches to reach the same
quality. By your second *project*, the distilled knowledge carries over (the v1.0 bar in
`roadmap.md`).

## 7. Extraction — lifting `noesis/` into its own repo

When you have permission to create the standalone repository, extract the subtree with full
history preserved:

```bash
# From the host repo, on the branch that contains noesis/:
git subtree split --prefix=noesis -b noesis-standalone

# Create an empty 'noesis' repo on your Git host, then:
git push git@github.com:<you>/noesis.git noesis-standalone:main
```

Or, if history isn't needed, simply copy the `noesis/` directory into a fresh repo — it is
self-contained (no dependency on the host project). Nothing in `noesis/` references anything
outside it.

## Checklist

- [ ] `noesis.config.yaml` configured (project + model tiers).
- [ ] `memory/business-rules.md` seeded.
- [ ] CI workflow copied and green.
- [ ] First problem stated.
- [ ] Human gates answered; first PRD accepted.
- [ ] Learning loop verified: a merge updated `knowledge/` (CI would have blocked it otherwise).
