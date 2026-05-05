# Agent Format Reference

## Overview

Every SupportAI agent is defined by a YAML manifest file (`agent.yaml`). This document describes every field in the manifest.

The manifest is validated against `agent-schema.json` using JSON Schema Draft-07.

## Top-Level Structure

```yaml
apiVersion: supportai/v1    # Always "supportai/v1"
kind: Agent                  # Always "Agent"
metadata: { ... }            # Identity and discovery
spec: { ... }                # Behavior and configuration
```

---

## `metadata` — Agent Identity

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | ✅ | Unique ID, kebab-case, 3-64 chars |
| `name` | string | ✅ | Display name (any language) |
| `nameEN` | string | | English name |
| `version` | string | ✅ | Semantic version (e.g., `1.2.0`) |
| `author` | string | ✅ | GitHub username |
| `license` | string | ✅ | SPDX license ID |
| `tags` | string[] | ✅ | 1-10 discovery tags |
| `avatar` | string | | 1-4 char avatar |
| `color` | string | | Hex color (e.g., `#6366f1`) |
| `category` | enum | ✅ | See categories below |
| `maturity` | enum | | `experimental`, `beta`, `stable` |
| `minRuntime` | enum | | `browser`, `node`, `python` |

### Categories

`development` `design` `research` `analytics` `management` `creative` `education` `health` `legal` `finance` `accessibility` `translation` `devops` `security` `general`

---

## `spec.identity` — Personality

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `systemPromptFile` | string | ✅ | Path to system prompt (usually `system.md`) |
| `personality` | enum | | `professional`, `friendly`, `academic`, `creative`, `concise` |
| `language` | string[] | | ISO 639-1 codes (e.g., `[tr, en]`) |
| `description` | string | ✅ | 10-500 char description |

---

## `spec.capabilities` — What the Agent Can Do

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `reasoning` | enum | ✅ | `direct`, `chain-of-thought`, `react`, `plan-execute` |
| `maxSteps` | integer | ✅ | 1-200, max reasoning steps |
| `memory.type` | enum | | `none`, `sliding-window`, `summary`, `full` |
| `memory.maxTokens` | integer | | 1000-2000000 |
| `streaming` | boolean | | Enable streaming output |
| `multiModal` | boolean | | Can process images/audio |

### Reasoning Strategies

- **`direct`** — Single LLM call, no iteration
- **`chain-of-thought`** — Multi-step thinking, no tool use
- **`react`** — ReAct loop: Reason → Act (tools) → Observe → Repeat
- **`plan-execute`** — Create full plan first, then execute each step

---

## `spec.models` — LLM Preferences

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `preferred` | string[] | ✅ | Priority-ordered model list |
| `minimum` | string | | Minimum capable model |
| `fallback` | enum | | `auto` or `none` |
| `temperature` | number | | 0-2, default generation temperature |
| `maxOutputTokens` | integer | | 100-128000 |

---

## `spec.tools` — Available Tools

Tools can be shared references or inline definitions:

```yaml
tools:
  # Shared tool reference
  - $ref: tools/web-search

  # Inline tool definition
  - name: my-tool
    type: builtin       # builtin, inline, mcp, external
    description: What it does
    permissions: [read, network]
```

---

## `spec.governance` — Safety Limits

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `maxExecutionTime` | integer | ✅ | Max seconds (10-86400) |
| `maxApiCalls` | integer | | Max LLM calls per task |
| `maxTokenBudget` | integer | | Max total tokens |
| `sandboxed` | boolean | ✅ | Run in sandbox |
| `allowedDomains` | string[] | | Network access domains |
| `dataRetention` | enum | | `none`, `session`, `persistent` |
| `humanApproval.required` | boolean | | Require human approval |
| `humanApproval.forActions` | string[] | | Actions needing approval |

---

## `spec.io` — Input/Output

```yaml
io:
  input:
    accepts: [text, code, file, image, audio, video, url]
    maxFileSize: 10MB
  output:
    formats: [text, markdown, code, json, html, csv, artifact, image]
    artifacts: true
```
