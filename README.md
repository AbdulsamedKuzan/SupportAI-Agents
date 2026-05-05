<p align="center">
  <img src="docs/assets/logo.png" alt="SupportAI Agents" width="120" />
</p>

<h1 align="center">SupportAI Agents</h1>

<p align="center">
  <strong>Open-source AI agent ecosystem — build, share, and run autonomous agents.</strong>
</p>

<p align="center">
  <a href="#quick-start">Quick Start</a> •
  <a href="#agent-catalog">Agent Catalog</a> •
  <a href="#create-your-own">Create Your Own</a> •
  <a href="#architecture">Architecture</a> •
  <a href="CONTRIBUTING.md">Contributing</a> •
  <a href="docs/">Docs</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/license-Apache%202.0-blue.svg" alt="License" />
  <img src="https://img.shields.io/badge/manifest-YAML-green.svg" alt="Manifest Format" />
  <img src="https://img.shields.io/badge/agents-14%20official-purple.svg" alt="Agents" />
  <img src="https://img.shields.io/badge/BYOK-supported-orange.svg" alt="BYOK" />
</p>

---

## What is this?

**SupportAI Agents** is an open-source repository of AI agents that can be used inside [SupportAI](https://supportai.abdulsamedkuzan.com) or any compatible runtime. Each agent is defined by a declarative YAML manifest — no vendor lock-in, no proprietary formats.

### Key Principles

- 🔓 **Open & Free** — Apache 2.0 license, use commercially, modify freely
- 🔑 **BYOK** — Bring Your Own Key — use OpenAI, Google, Anthropic, local Ollama, or any OpenAI-compatible API
- 🏗️ **Declarative** — Agents defined in YAML, validated by JSON Schema
- 🔄 **Long-Running** — Agents can run for hours with checkpoint/resume
- 🤝 **Community-Driven** — Submit your agents via Pull Request
- 🔒 **Secure** — Sandboxed execution, permission boundaries, audit trails

---

## Quick Start

### Use an Agent in SupportAI

1. Open [SupportAI](https://supportai.abdulsamedkuzan.com)
2. Click the **Agent** button in the header
3. Browse and select an agent from the marketplace
4. Start chatting — the agent handles the rest

### Use an Agent Programmatically

```bash
# Install the SDK
npm install @supportai/agent-sdk

# Run an agent
npx supportai-run --agent code-architect --task "Refactor this module"
```

```javascript
import { AgentRunner } from '@supportai/agent-sdk';

const runner = new AgentRunner({
  agent: 'code-architect',
  apiKey: process.env.OPENAI_API_KEY,  // BYOK
  provider: 'openai',
  model: 'gpt-4o'
});

const result = await runner.execute({
  task: 'Analyze this codebase and create a refactoring plan',
  files: ['./src/**/*.ts']
});

console.log(result.output);
```

---

## Agent Catalog

### Official Agents (14)

| Agent | ID | Category | Description |
|-------|----|----------|-------------|
| 🏗️ **Code Architect** | `code-architect` | Development | Software architecture, refactoring plans, tech debt analysis, code review |
| 🔍 **Deep Search** | `deep-search` | Research | Multi-pass web research, fact-checking, source-verified investigation |
| 🎨 **UI Designer** | `ui-designer` | Design | Premium, responsive, accessible interface design |
| 📊 **Data Analyst** | `data-analyst` | Analytics | PDF, CSV, table analysis with statistics and visualizations |
| 🔬 **Researcher** | `researcher` | Research | Academic research with structured reports and citations |
| 📋 **Product Manager** | `product-manager` | Management | Roadmap, sprint planning, user stories, acceptance criteria |
| 🎬 **Studio** | `studio` | Creative | Image/video prompt engineering and creative direction |
| 🤖 **Orchestrator** | `orchestrator` | General | Multi-agent coordination, task decomposition, governance enforcement |
| 🔌 **MCP Operator** | `mcp-operator` | DevOps | MCP connector management, third-party service integrations |
| 🖥️ **Terminal Operator** | `terminal-operator` | DevOps | CLI command planning, shell scripting, DevOps automation |
| ⚡ **PCB & Embedded** | `pcb-embedded-engineer` | Development | Electronics design, STM32 firmware, PCB planning |
| 📝 **Quiz Builder** | `quiz-builder` | Education | Quiz, exam, flashcard generation with Bloom's taxonomy |
| 📱 **Social Growth** | `social-growth-agent` | Creative | Social media strategy, content calendars, campaign design |
| 📅 **System Planner** | `system-planner` | Management | Project planning, scheduling, OKR frameworks, decision matrices |

### Community Agents

Community agents are contributed by developers worldwide. See [`agents/community/`](agents/community/) for the full list.

---

## Create Your Own Agent

### 1. Fork & Clone

```bash
git clone https://github.com/YOUR_USERNAME/supportai-agents.git
cd supportai-agents
```

### 2. Copy the Template

```bash
cp -r agents/community/_template agents/community/my-agent
```

### 3. Edit `agent.yaml`

```yaml
apiVersion: supportai/v1
kind: Agent
metadata:
  id: my-agent
  name: My Agent
  version: 1.0.0
  author: your-github-username
  license: Apache-2.0
  tags: [custom, example]
  category: general

spec:
  identity:
    systemPromptFile: system.md
    language: [en]
    description: "A brief description of what your agent does."

  capabilities:
    reasoning: chain-of-thought
    maxSteps: 15
    memory:
      type: sliding-window
      maxTokens: 16000
    streaming: true

  models:
    preferred: [gpt-4o, gemini-2.5-pro]
    minimum: gpt-4o-mini
    fallback: auto

  tools: []

  governance:
    maxExecutionTime: 300
    maxApiCalls: 50
    sandboxed: true
```

### 4. Write Your System Prompt

Edit `system.md` with detailed instructions for the agent.

### 5. Validate

```bash
npm run validate -- agents/community/my-agent
```

### 6. Submit a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for full guidelines.

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                   User Interface                     │
│            (SupportAI Web / CLI / SDK)               │
├─────────────────────────────────────────────────────┤
│                 Orchestration Layer                   │
│          ┌──────────┬──────────┬──────────┐          │
│          │ Planner  │ Memory   │ Tool     │          │
│          │ (ReAct)  │ Manager  │ Handler  │          │
│          └──────────┴──────────┴──────────┘          │
├─────────────────────────────────────────────────────┤
│                  Agent Executor                      │
│     manifest.yaml → parse → validate → run loop      │
├─────────────────────────────────────────────────────┤
│                 Provider Layer (BYOK)                 │
│   ┌────────┬────────┬─────────┬────────┬──────────┐  │
│   │ OpenAI │ Google │Anthropic│ Ollama │ Custom   │  │
│   └────────┴────────┴─────────┴────────┴──────────┘  │
└─────────────────────────────────────────────────────┘
```

### ReAct Execution Loop

Every agent follows this autonomous loop:

```
OBSERVE → THINK → ACT → REFLECT → REPEAT → RESPOND
```

1. **Observe** — Read user input + context + memory
2. **Think** — Analyze situation, create/update plan
3. **Act** — Call tools or delegate to sub-agents
4. **Reflect** — Evaluate results, detect errors
5. **Repeat** — Continue until goal is reached
6. **Respond** — Present final output to user

### Long-Running Stability

Agents designed for hours-long tasks use:
- **Checkpoint/Resume** — State saved every N steps, recoverable after crashes
- **Heartbeat** — Regular signals to UI, timeout = auto-recovery
- **Circuit Breaker** — 5 consecutive failures = pause + ask user
- **Token Budget** — Hard limit prevents runaway costs
- **Graceful Degradation** — Fallback to cheaper models if primary unavailable

---

## Repository Structure

```
supportai-agents/
├── README.md                     # This file
├── LICENSE                       # Apache 2.0
├── CONTRIBUTING.md               # How to contribute
├── CODE_OF_CONDUCT.md            # Community standards
├── agent-schema.json             # JSON Schema for agent.yaml validation
│
├── agents/
│   ├── official/                 # 14 SupportAI official agents
│   │   ├── code-architect/       # Software architecture & refactoring
│   │   ├── deep-search/          # Multi-pass web research
│   │   ├── ui-designer/          # Frontend design & CSS
│   │   ├── data-analyst/         # Data processing & visualization
│   │   ├── researcher/           # Academic research & reports
│   │   ├── product-manager/      # Roadmap & sprint planning
│   │   ├── studio/               # Creative direction & AI art
│   │   ├── orchestrator/         # Multi-agent coordination
│   │   ├── mcp-operator/         # MCP connector management
│   │   ├── terminal-operator/    # CLI & DevOps automation
│   │   ├── pcb-embedded-engineer/# Electronics & firmware
│   │   ├── quiz-builder/         # Educational assessments
│   │   ├── social-growth-agent/  # Social media strategy
│   │   └── system-planner/       # Project planning & OKRs
│   └── community/                # Community-contributed agents
│       └── _template/            # Starter template
│
├── tools/                        # Shared tool definitions
├── runtimes/                     # Execution environments
├── sdk/                          # Developer SDKs
├── docs/                         # Documentation
└── .github/                      # CI/CD workflows
```

---

## BYOK (Bring Your Own Key)

SupportAI Agents never store or transmit your API keys to our servers. All LLM calls are made directly from your client.

### Supported Providers

| Provider | Models | Config Key |
|----------|--------|------------|
| OpenAI | GPT-4o, GPT-4o-mini, o3 | `openai` |
| Google | Gemini 2.5 Pro/Flash | `google` |
| Anthropic | Claude Sonnet/Opus | `anthropic` |
| DeepSeek | DeepSeek V3/R1 | `deepseek` |
| xAI | Grok 3/4 | `xai` |
| Ollama | Any local model | `ollama` |
| Custom | Any OpenAI-compatible API | `custom` |

---

## License

This project is licensed under the [Apache License 2.0](LICENSE) — free for personal and commercial use, modification, and distribution.

---

## Community

- 🐛 [Report a Bug](https://github.com/supportai-team/supportai-agents/issues/new?template=bug-report.md)
- 💡 [Request an Agent](https://github.com/supportai-team/supportai-agents/issues/new?template=new-agent.md)
- 🤝 [Contributing Guide](CONTRIBUTING.md)
- 📖 [Documentation](docs/)

---

<p align="center">
  Built with ❤️ by the <a href="https://supportai.abdulsamedkuzan.com">SupportAI</a> team and the open-source community.
</p>
