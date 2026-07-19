---
id: memory.business-rules
kind: memory
version: 0.1.0
status: template
owner: product-manager
updated: 2026-07-18
---

# Business rules

**The one place project domain rules live.** Per ADR-0003, the OS contains no business logic;
domain constraints live here as *data* that agents read — never as code in `automation/`. This
keeps the OS forkable while giving every agent a single, authoritative source for "what must
always be true in this domain".

## Format

Each rule is checkable and attributable, so gates and the `database-engineer` can enforce it.

```yaml
id: rule.<domain>.<name>
statement: "A single unambiguous constraint, phrased as an invariant."
rationale: "Why it exists (regulation, product decision, physical reality)."
source: "ADR id, PRD id, or external authority"
enforced_by: [agent.database-engineer, gate.security, ...]
severity: hard | soft   # hard = never violate; soft = default that can be overridden with sign-off
```

## Rules

_Empty — this is the template. A project's `product-manager` and domain experts populate it. The
OS ships it blank on purpose: rules here would be business logic, which the OS forbids._

```yaml
# Example shape — DELETE on first real rule.
id: rule.example.unique-email        # DELETE ME
statement: "No two active accounts share an email address."
rationale: "Product decision; prevents identity ambiguity."
source: "PRD-0001"
enforced_by: [agent.database-engineer, gate.reviewer]
severity: hard
```
