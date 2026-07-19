---
id: rubric.security
kind: rubric
version: 0.1.0
status: active
owner: security-engineer
updated: 2026-07-18
---

# Security rubric

Applied by `gate.security`. Unlike the reviewer rubric, security is **finding-based**: the gate
does not "score" the change, it enumerates findings and blocks on severity. A clean pass requires
an explicit per-category result, not silence (see agent.security-engineer "Rubber-stamp").

## Categories (each returns findings, possibly none)

| Category | Looks for |
|----------|-----------|
| AuthN/AuthZ | Missing or broken authentication/authorization on new endpoints and data paths. |
| Secrets & PII | Credentials, tokens, keys, or personal data in code, logs, tests, fixtures, config. |
| Input handling | Injection, unvalidated input at trust boundaries, unsafe deserialization. |
| Output handling | Unencoded output, data exposure in responses/errors/logs. |
| Dependencies | Known-vulnerable versions; unnecessary or over-privileged packages. |
| Access & isolation | Over-broad permissions, missing tenant isolation, IDOR. |

## Severity → gate action

| Severity | Definition | Gate action |
|----------|-----------|-------------|
| Critical | Exploitable now, high impact | **Block**; escalate to human gate |
| High | Exploitable with conditions, high impact | **Block** |
| Medium | Limited impact or hard to exploit | Warn; may pass with a tracked open-issue |
| Low | Hygiene / defense-in-depth | Log; capped surfacing |

## Output
Each finding: `{category, severity, location, description, remediation}`. Remediation is concrete
("parameterize this query"), never vague ("improve security").
