# Deep Search v2.0

<p align="center">
  <strong>🔍 Deep Search — Multi-Pass Source-Verified Research Agent</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blue" />
  <img src="https://img.shields.io/badge/category-research-teal" />
  <img src="https://img.shields.io/badge/risk-medium-yellow" />
  <img src="https://img.shields.io/badge/reasoning-react-purple" />
</p>

## What it does

- Conducts multi-pass web research with iterative query refinement
- Triangulates claims across 3+ independent sources
- Assigns confidence levels (HIGH / MEDIUM / LOW / SPECULATIVE) to every finding
- Fact-checks claims against primary sources
- Produces research reports with full citation trails

## Capabilities

| Feature | Detail |
|---------|--------|
| **Reasoning** | ReAct loop (multi-pass search) |
| **Max Steps** | 80 |
| **Multi-Modal** | ✅ Images + Text |
| **Languages** | Auto-detect (user language) |
| **Output Formats** | Research Report, Quick Answer, Comparison, Trend Monitor |

## Preferred Models

| Priority | Model |
|----------|-------|
| 1st | Gemini 2.5 Pro |
| 2nd | ChatGPT 5.5 |
| 3rd | Claude Sonnet 4 |

## Tools

- `web-search` — Multi-pass web search with query refinement
- `source-ranker` — Credibility scoring for sources

## Use Cases

- Market research and competitive analysis
- Fact-checking claims and news verification
- Academic literature review
- Trend monitoring and forecasting
- OSINT investigations

## Example

```
User: "Türkiye'nin 2026 yapay zeka stratejisi ne durumda?"

Agent: [Searches 4 passes] → [Evaluates 12 sources] → [Produces report with
       confidence levels, timeline, comparison matrix, and 8 cited sources]
```
