---
id: analysis.interview-plan.v1
kind: memory
version: 0.1.0
status: active
owner: problem-discovery
updated: 2026-07-19
supersedes: null
token_budget: n/a
---

# Interview plan — validate the beachhead (blocks the PRD stage)

**One decision this informs:** which vertical (if any) becomes the beachhead for ADR-0001's wedge —
and whether the pain is a *painkiller* (they already spend money/time on it) or a *vitamin* (nice
idea, no budget). If no segment shows painkiller signal, the wedge is re-scoped, not built.

**Method: The Mom Test.** Ask about their *past and present behavior*, never about our idea. No
pitching, no hypotheticals ("would you use…"), no feature reactions. Talk about *their* last hard
week. If we mention the product, the data is contaminated.

## Sample: 10–12 interviews across 3 segments (~4 each)

| Segment | Who exactly | Where to find them | Why this segment |
|---|---|---|---|
| S1 Insurance / property risk | Underwriters, portfolio/cat-risk analysts at mid-market P&C insurers/MGAs | LinkedIn Sales Nav (title: underwriter, cat modeler); insurance risk subreddits; RIMS/CAS communities | Money + open hazard data + non-GIS users |
| S2 Real estate / retail expansion | Site-selection / market analysts at regional chains, CRE firms | r/gis, r/commercialrealestate; LinkedIn; local ICSC chapters | Pay Placer/consultants; repetitive spatial Qs |
| S3 Logistics / ops | Ops/network analysts doing zones, routing, coverage | r/logistics; ops LinkedIn groups; SMB 3PLs | Own-data driven; fast self-serve potential |

Screener (must pass to book): (a) works with location/address data monthly; (b) is NOT a GIS
specialist / does not own ArcGIS Pro daily; (c) has a budget or influences one.

## Question guide (20–30 min, conversational — reorder freely)

**Warm-up / context**
1. Walk me through the last time you had to answer a question that involved *where* things are.
2. What were you actually trying to decide? Who needed the answer?

**Pain (past behavior — the core)**
3. Take me step by step through how you got that answer last time. (Listen for: data hunting,
   format/CRS wrestling, exporting to a GIS person, spreadsheets, waiting on someone.)
4. Which step took the longest / was most annoying? What did you do when you got stuck?
5. Last time you needed spatial data cleaned or converted — what happened? Who did it?
6. How often does this kind of question come up? Weekly? Per project?

**Current solution & money (painkiller test)**
7. What tools or people do you use for this today? (ArcGIS? a GIS colleague? Placer? a consultant?
   Excel? nothing?)
8. What does that cost you — in dollars, in wait-time, in doing-without? Who pays for it?
9. Have you ever paid for or asked to buy something to make this easier? What happened?
10. If this problem vanished tomorrow, what would you do with the time / what decision would you
    make faster?

**Wrap**
11. Who else struggles with this that I should talk to? (referral chain)
12. Is it OK if I follow up when I have something to show?

## Scoring — rank pains after each interview (feeds the pain ranking that replaces synthetic Phase 1)

Score each 1–5, per interview:
- **Frequency** (how often the pain recurs)
- **Intensity** (time/money lost per occurrence)
- **Current-spend** (do they already pay $ or a person?  ← the painkiller signal)
- **Non-GIS fit** (do they lack GIS staff/tools? = our buyer)
- **Reachability** (can a solo founder find & sell to them?)

Segment score = median across its interviews. **Beachhead = highest-scoring segment where
Current-spend ≥ 4** (proof of painkiller). If no segment clears Current-spend ≥ 4 → the wedge is a
vitamin; STOP and re-scope ADR-0001.

## Kill / confirm criteria (decide honestly)

- **CONFIRM** a beachhead if ≥3 interviews in one segment independently describe the *same*
  data-prep-then-answer pain AND already spend money/a-person on it.
- **KILL / re-scope** if pains are scattered, or everyone says "interesting but I'd use Excel / ask
  our GIS guy / wouldn't pay."

## Logistics
- 10–12 interviews, ~2 weeks. Record (with consent) or write notes within 1h.
- Log each as analysis/interviews/NN-<segment>.md; update the ranking after each.
- Next OS stage (PRD) unlocks only when a beachhead CONFIRMS. Until then, no code.
