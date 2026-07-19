---
id: knowledge.api-contracts
kind: doc
version: 0.1.0
status: template
owner: backend-engineer
updated: 2026-07-18
---

# API contracts — single source of truth

Every internal and external interface is registered here. Producers publish their contract on
change; consumers bind to this file, never to a producer's private knowledge. A contract change
that isn't reflected here fails CI (the "silent contract change" failure mode). This is how many
agents build against the same interface in parallel without drift.

## Contract format

Each contract is a block with a stable id. Consumers reference the id.

```yaml
id: api.<domain>.<operation>
version: 0.1.0
owner: agent.backend-engineer
transport: http | event | rpc
method: GET | POST | ...          # for http
path: /v1/...                     # for http
request:
  schema: <inline or $ref to a schema file>
response:
  200: <schema>
  4xx/5xx: <error schema + when it occurs>
errors:
  - code: ...
    when: ...
idempotent: true | false
auth: none | user | service
```

## Registered contracts

_None yet — this is the template. The first `backend-engineer` run for a project registers the
first contract here. Example shape below, to be deleted on first real entry._

```yaml
id: api.example.get-thing        # DELETE ME
version: 0.1.0
owner: agent.backend-engineer
transport: http
method: GET
path: /v1/things/{id}
request:  { schema: "{ id: string }" }
response:
  200: "{ id: string, name: string }"
  404: "{ error: 'not_found' } when id does not exist"
errors:
  - { code: not_found, when: "id does not exist" }
idempotent: true
auth: user
```

## Change policy
- MAJOR bump = breaking change; consumers must migrate. Requires an ADR in `memory/decisions.md`.
- Deprecations are announced here with a removal version before the contract is deleted.
