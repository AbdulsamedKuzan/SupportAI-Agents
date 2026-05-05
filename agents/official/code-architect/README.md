# Code Architect v2.0

<p align="center">
  <strong>🏗️ Kod Mimarı — Autonomous Software Architecture Agent</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-2.0.0-blue" />
  <img src="https://img.shields.io/badge/maturity-stable-green" />
  <img src="https://img.shields.io/badge/reasoning-ReAct-purple" />
  <img src="https://img.shields.io/badge/max%20runtime-4%20hours-orange" />
</p>

---

## Overview

**Code Architect** is a production-grade autonomous agent that acts as a senior software architect. It uses a ReAct (Reasoning + Acting) loop to:

- 📂 **Read and analyze** entire codebases using tools
- 🔍 **Detect** technical debt, anti-patterns, and architectural issues
- 📊 **Measure** complexity, churn rates, and dependency health
- 📋 **Produce** structured refactoring plans with phases and rollbacks
- 🔄 **Guide** migrations between frameworks, languages, or patterns
- 👀 **Review** code with specific, actionable feedback

## Models

| Model | Provider | Role |
|-------|----------|------|
| **Claude Opus 4.7** | Anthropic | Primary — strongest reasoning |
| **DeepSeek V4 Pro** | DeepSeek | Cost-effective long context |
| **ChatGPT 5.5** | OpenAI | Latest GPT capabilities |

## Tools

| Tool | Purpose |
|------|---------|
| 📖 **File Reader** | Read any file in the project |
| 🌳 **AST Analyzer** | Extract syntax tree, complexity, dead code |
| 📜 **Git History** | Hotspots, churn, blame, contributor patterns |
| 📦 **Dependency Analyzer** | Outdated packages, security, conflicts |
| ⚡ **Code Executor** | Run linters, tests, scripts |
| 🌐 **Web Search** | Look up docs, best practices |
| ✏️ **File Writer** | Create/edit files (requires approval) |

## Output Formats

The agent automatically selects the right format:

| Task | Format |
|------|--------|
| "Analyze this project" | **Format A** — Architecture Analysis |
| "Refactor this module" | **Format B** — Refactoring Plan |
| "Review this code" | **Format C** — Code Review |
| "Migrate from X to Y" | **Format D** — Migration Guide |

## Usage Examples

### Architecture Analysis
```
Bu projenin mimari haritasını çıkar. Modülleri, bağımlılıkları
ve teknik borçları tespit et.
```

### Refactoring
```
Payment modülü çok karmaşık olmuş. 3 fazda refactor planı oluştur.
Her faz için risk analizi ve rollback planı olsun.
```

### Code Review
```
Bu PR'ı review et. Özellikle performans ve güvenlik açısından değerlendir.
[code paste or file reference]
```

### Migration
```
Express.js API'yi Fastify'a migrate etmem lazım.
Uyumluluk matrisi ve adım adım plan çıkar.
```

## Governance

- **Max Runtime:** 4 hours (for large codebase audits)
- **Max Steps:** 50 ReAct iterations
- **Token Budget:** 2M tokens
- **File Writing:** Requires human approval
- **Network:** Limited to documentation sites

## Quality Guarantees

- ✅ Always reads actual code before recommending (never guesses)
- ✅ Every recommendation backed by evidence (metrics, line references)
- ✅ Structured output with consistent formatting
- ✅ Rollback plans for every change
- ✅ Responds in user's language (Turkish or English)
- ✅ Production-quality code suggestions (no TODOs or placeholders)

## Files

| File | Purpose |
|------|---------|
| [`agent.yaml`](agent.yaml) | Agent manifest |
| [`system.md`](system.md) | System prompt (v2.0) |
| [`tools.yaml`](tools.yaml) | Specialized tool definitions |
| [`tests/scenarios.yaml`](tests/scenarios.yaml) | Test scenarios |
