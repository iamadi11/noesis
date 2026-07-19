---
id: template.evidence
kind: template
version: 0.1.0
status: active
owner: market-research
updated: 2026-07-18
---

# Evidence ledger: <problem-id>

<!-- Instance: id: evidence.<slug>. The research brief's claims reference these ids. Append-only. -->

Each item is a discrete, sourced, rated piece of evidence. Strength ratings keep "we verified"
separate from "we believe."

| id | Claim it supports | Source | Date | Strength | Notes |
|----|-------------------|--------|------|----------|-------|
| E-001 | _..._ | _url / doc / interview_ | YYYY-MM-DD | strong / moderate / weak / anecdotal | _recency, bias, caveats_ |

## Strength rubric
- **strong** — multiple independent, credible, recent sources agree.
- **moderate** — a credible source, or several weak ones aligned.
- **weak** — single low-credibility or dated source.
- **anecdotal** — a single instance; illustrative, not conclusive.

## Unverified
_Claims the research wanted but could not source. Listed honestly here rather than smuggled into
the brief as fact._
