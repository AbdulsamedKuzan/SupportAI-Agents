# Orchestrator v2.0

<p align="center">
  <strong>🤖 Orkestratör — Multi-Agent Coordination & Governance Engine</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blue" />
  <img src="https://img.shields.io/badge/category-general-gray" />
  <img src="https://img.shields.io/badge/risk-medium-yellow" />
  <img src="https://img.shields.io/badge/reasoning-plan--execute-purple" />
</p>

## What it does

- Decomposes complex user goals into discrete, well-scoped sub-tasks
- Routes each sub-task to the most appropriate specialist agent
- Manages dependencies, parallelization, and execution order
- Enforces governance rules and approval gates across all agents
- Synthesizes multi-agent outputs into a single coherent response

## Capabilities

| Feature | Detail |
|---------|--------|
| **Reasoning** | Plan-Execute with dynamic re-planning |
| **Max Steps** | 80 |
| **Agents Available** | All 14 official + community agents |
| **Output Formats** | Execution Plan, Progress Report, Final Synthesis |

## Preferred Models

| Priority | Model |
|----------|-------|
| 1st | ChatGPT 5.5 |
| 2nd | Claude Opus 4.7 |
| 3rd | Gemini 2.5 Pro |

## Key Features

- **Parallel execution** of independent tasks
- **Circuit breaker** — 3 failures = pause + report
- **Approval gates** for write, execute, social, and financial operations
- **Context compression** between agent handoffs
- **Conflict resolution** when agents disagree
