---
id: doc.templates-readme
kind: doc
version: 0.1.0
status: active
owner: documentation-agent
updated: 2026-07-18
---

# templates/ — *What shape should new artifacts take?*

Reusable document templates. Templates enforce structure so agents produce consistent, parseable
output — a downstream agent can rely on a PRD having an "out-of-scope" section because the template
mandates it. Structure is a token optimization too: a predictable shape is cheaper to retrieve
from and reason over than free-form prose.

| Template | For | Referenced as |
|----------|-----|---------------|
| [`prd.template.md`](prd.template.md) | Product requirements | `template.prd` |
| [`adr.template.md`](adr.template.md) | Architecture decisions | `template.adr` |
| [`tech-design.template.md`](tech-design.template.md) | Technical design / architecture | `template.tech-design` |
| [`rfc.template.md`](rfc.template.md) | Proposals needing discussion | `template.rfc` |
| [`experiment.template.md`](experiment.template.md) | Self-improvement experiments | `template.experiment` |
| [`eval-result.template.md`](eval-result.template.md) | Gate results | `template.eval-result` |
| [`problem.template.md`](problem.template.md) | Problem statement | `template.problem` |
| [`research.template.md`](research.template.md) | Research brief | `template.research` |
| [`evidence.template.md`](evidence.template.md) | Evidence ledger | `template.evidence` |

Agent-spec, rubric, and playbook "templates" are their schemas/examples:
[`../agents/agent.schema.yaml`](../agents/agent.schema.yaml),
[`../evaluations/rubrics/`](../evaluations/rubrics/),
[`../playbooks/`](../playbooks/).

## Rules
- Every template starts with the standard frontmatter block (CONVENTIONS §1).
- Headings are the **contract**; an agent fills content but does not drop mandated sections.
- A template change is versioned; consumers pin the version they target.
