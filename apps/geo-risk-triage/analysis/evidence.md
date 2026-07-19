---
id: analysis.evidence.v1
kind: memory
version: 0.1.0
status: active
owner: market-research
updated: 2026-07-19
supersedes: null
token_budget: n/a
---

# Evidence: AI-native geospatial platform (Phase 0)

Confidence legend: **[H]** high (multiple independent sources) · **[M]** medium · **[L]** low / single source / synthetic.

## E1 — Market is venture-scale [H]
- Geospatial analytics: $95–114B (2024/25), CAGR 11–19%, → $174–244B by 2030.
  - GrandView: https://www.grandviewresearch.com/industry-analysis/geospatial-analytics-market
  - MarketsandMarkets (GEOINT): https://www.marketsandmarkets.com/Market-Reports/geospatial-intelligence-market-198354497.html
- GeoAI subset: $37.13B (2025) → $62.88B (2030), CAGR 11.1%.
  - https://finance.yahoo.com/news/geospatial-intelligence-market-worth-62-150100880.html

## E2 — The idea (NL→GIS) is NOT a moat [H]
- Active research area, near-solved as demos: LLM-Geo (https://github.com/gladcolor/LLM-Geo),
  ChatGeoAI (https://www.mdpi.com/2220-9964/13/10/348), GIS Copilot (86% / 110 QGIS tasks),
  GeoJSON Agents (97% / 70 tasks), GeoAnalystBench (https://arxiv.org/html/2509.05881v1),
  GISclaw (https://arxiv.org/html/2603.26845v1).
- Implication: differentiation must be data/workflow/trust, not the natural-language interface.

## E3 — The broad vision is already being built by better-funded players [H]
- Bunting Labs (YC): Kue (AI copilot for QGIS) + Mundi (open-source AI-native web GIS) + AI
  Vectorizer. 30+ governments, 5 Fortune 500s.
  - https://www.ycombinator.com/companies/bunting-labs · https://buntinglabs.com/
- Esri ArcGIS: ~26.88% GIS market share; integrating Azure OpenAI; shipping NL assistants
  (Pro/Hub/Arcade).
  - https://6sense.com/tech/mapping-and-gis/arcgis-market-share
  - https://www.businesswire.com/news/home/20250714615254/en/

## E4 — Capital is cooling [H]
- Geo-spatial intelligence funding: ~$158M (2024) → ~$11M (2025 YTD).
  - https://tracxn.com/d/trending-business-models/startups-in-geo-spatial-intelligence/__X5EwuZWE4qCycDilfdvzeS_cHXg8DEdDChDcsC6q3us
- Recent: dataplor $20.5M Series B; EvaluateLocate £300K seed (£2.75M val).
- Implication for $0 solo founder: optimize for revenue/design-partners, not a raise.

## E5 — The #1 evidence-backed pain is data prep, not analysis [H]
- 87.5% name data cleaning/formatting as most time-consuming stage; 50% name import/export
  between formats; CRS mismatches + lossy conversions pervasive.
  - https://biomedware.com/how-to-overcome-the-geospatial-data-crisis/
- "Mandatory coding skills" a major pain across 5,000+ specialists (Aspectum survey).
  - https://www.directionsmag.com/pressrelease/10026
- ~40% of time on data prep (cross-domain baseline): https://www.jmp.com/en/blog/data-prep/stop-wasting-time-on-data-preparation

## E6 — Location-intelligence incumbents have a capital moat to avoid [H]
- Placer.ai / Foursquare / Unacast: proprietary foot-traffic panels; enterprise-priced;
  vertical-locked (retail/RE). Competing on their panel needs capital → avoid Day 0.
  - https://www.placer.ai/ · https://www.growthfactor.ai/resources/blog/placer-ai-alternatives

## Gaps requiring PRIMARY research before Phase 2 locks [L]
- No real user interviews yet. Phase 1 personas/pains are SYNTHETIC hypotheses.
- Beachhead vertical unproven. Willingness-to-pay unproven ("vitamin vs painkiller" risk).
- ACTION: ≥10 interviews (insurance/RE/logistics analysts w/o GIS teams) before committing.
