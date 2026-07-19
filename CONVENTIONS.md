# Conventions

The conventions *are* the product. An agent that follows these produces artifacts that every
other agent — and every future project — can consume without translation. Deviating breaks
retrieval, evaluation, and learning silently. Don't.

## 1. Frontmatter on every authored artifact

Every spec, prompt, template, playbook, rubric, and doc carries a YAML frontmatter header:

```yaml
---
id: <namespace.stable-id>     # unique, stable, never reused. e.g. agent.architect
kind: agent|prompt|playbook|template|eval|rubric|schema|graph|doc|memory|policy
version: 0.1.0                # semver; bump on any semantic change
status: draft|active|deprecated
owner: <role>                 # the accountable agent/role
updated: YYYY-MM-DD
supersedes: <id@version|null> # what this replaces, for lineage
token_budget: <int|n/a>       # for agents/prompts: the context ceiling
---
```

`id` is the primary key across the whole OS. Cross-references use `id`, not file paths, so files
can move without breaking links.

## 2. Versioning

- **Semver** for every artifact. PATCH = wording/no behavior change, MINOR = new capability
  backward-compatible, MAJOR = contract change consumers must adapt to.
- **Append-only** logs (`memory/decisions`, `memory/rejected-ideas`, `telemetry/`) are never
  edited in place. Correct a past entry with a new superseding entry.
- **Current-state** files (`knowledge/`) are overwritten to stay true, but every overwrite is a
  git commit, so history is recoverable.

## 3. Naming

- Files: `kebab-case.md`. IDs: `dot.namespaced`. Folders: lowercase, singular responsibility.
- Agents: `agent.<role>`. Prompts: `prompt.<purpose>`. Gates: `gate.<name>`. Rubrics:
  `rubric.<name>`. Playbooks: `playbook.<stage>`.

## 4. Machine-readability first

Anything an agent must parse (graphs, contracts, gate configs, telemetry) is structured data
(YAML/JSON), not prose. Prose is for humans and lives alongside as `.md`. When in doubt, emit
both: the structured file is the source of truth; the markdown is the explanation.

## 5. Token discipline

- Never reference "the whole repo." Reference specific `id`s or graph nodes.
- Prefer the smallest summary level that answers the question (`repo → module → file → symbol`).
- Assembled context must declare its token cost; runs over budget fail the builder gate.
- Cite sources by `id`. An artifact that can't cite where its context came from is unverifiable.

## 6. Attribution

Generated artifacts record their provenance in frontmatter or a sidecar: producing agent,
prompt `id@version`, model tier, input artifact `id`s, and the run id in `telemetry/`.

## 7. Definition of Done (for any artifact)

An artifact is *done* only when: it has valid frontmatter, it passed its stage's gate, its
provenance is recorded, and the learning step has updated `knowledge/`/`graphs/`/`memory/` if it
changed the system's understanding. "Merged but knowledge stale" is not done — CI blocks it.
