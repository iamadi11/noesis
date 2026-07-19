---
id: knowledge.standards.readme
kind: doc
version: 0.1.0
status: active
owner: reviewer
updated: 2026-07-18
---

# Coding standards

Standards are the rubric the `reviewer` and specialist gates check against. They are what turns
"looks fine" into a pass/fail. Keeping them explicit is how the OS prevents slop *consistently*
instead of relying on any single reviewer's taste.

Each surface has its own standard so agents retrieve only the one they need (Objective #2):

| Standard | Applies to | Enforced by |
|----------|-----------|-------------|
| [`engineering.md`](engineering.md) | All code, all surfaces | `reviewer` gate |
| `frontend.md` | UI code | `frontend-engineer`, `reviewer` |
| `backend.md` | Services/APIs | `backend-engineer`, `reviewer` |
| `data.md` | Schema/migrations | `database-engineer`, `security` |
| `security.md` | All changes | `security` gate |
| `testing.md` | Tests | `testing` gate |
| `infra.md` | Deploy/infra | `infrastructure-engineer` |

> Only `engineering.md` ships in `v0.1` as the cross-cutting baseline. Surface-specific standards
> are authored per project by the relevant engineer agent and reviewed like any other artifact —
> they are not baked into the OS, because standards are where reasonable projects legitimately
> differ. The *requirement to have them* is universal; their content is local.

## How standards evolve

Standards are improved by the learning loop, not by decree. When the `reviewer` repeatedly finds
the same defect class, the `knowledge-manager` proposes a standard change; it ships as an
experiment and is adopted only if it reduces that defect rate without slowing delivery. A standard
nobody's data supports is dead weight — prune it.
