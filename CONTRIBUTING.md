# Contributing to SupportAI Agents

Thank you for your interest in contributing! This guide will help you create and submit agents to the SupportAI ecosystem.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Creating a New Agent](#creating-a-new-agent)
- [Agent Quality Standards](#agent-quality-standards)
- [Pull Request Process](#pull-request-process)
- [Tool Development](#tool-development)

---

## Code of Conduct

This project follows our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold a welcoming, inclusive, and respectful community.

---

## How to Contribute

### Types of Contributions

1. **New Agent** — Create a new agent for the community
2. **Improve Existing Agent** — Enhance prompts, add tools, fix bugs
3. **New Tool** — Add a reusable tool to the shared library
4. **Documentation** — Improve docs, add examples, fix typos
5. **Bug Reports** — Report issues with agents or the runtime
6. **Runtime/SDK** — Contribute to execution environments or SDKs

---

## Creating a New Agent

### Step 1: Fork & Clone

```bash
git clone https://github.com/YOUR_USERNAME/supportai-agents.git
cd supportai-agents
```

### Step 2: Copy the Template

```bash
cp -r agents/community/_template agents/community/your-agent-name
cd agents/community/your-agent-name
```

### Step 3: Define Your Agent

Edit `agent.yaml` following the schema in `agent-schema.json`. Required fields:

```yaml
apiVersion: supportai/v1
kind: Agent
metadata:
  id: your-agent-name          # Unique, lowercase, kebab-case
  name: Your Agent Name         # Display name
  version: 1.0.0               # Semantic versioning
  author: your-github-username
  license: Apache-2.0
  tags: [tag1, tag2]
  category: general             # See categories below

spec:
  identity:
    systemPromptFile: system.md
    language: [en]
    description: "What your agent does in 1-2 sentences."

  capabilities:
    reasoning: chain-of-thought  # or: react, plan-execute
    maxSteps: 15
    memory:
      type: sliding-window
      maxTokens: 16000

  models:
    preferred: [gpt-4o]
    minimum: gpt-4o-mini
    fallback: auto

  governance:
    maxExecutionTime: 300
    sandboxed: true
```

### Step 4: Write the System Prompt

Create `system.md` with clear, detailed instructions. Good system prompts:

- Define the agent's role and expertise clearly
- Specify output format expectations
- Include examples of ideal responses
- Set boundaries (what the agent should NOT do)
- Are written in the agent's primary language

### Step 5: Add Tests (Optional but Recommended)

Create test scenarios in `tests/`:

```yaml
# tests/basic.yaml
name: Basic functionality test
scenarios:
  - input: "Example user message"
    expectedBehavior: "Agent should respond with..."
    tools_used: []
```

### Step 6: Validate

```bash
npm run validate -- agents/community/your-agent-name
```

### Step 7: Submit a Pull Request

See [Pull Request Process](#pull-request-process) below.

---

## Agent Categories

| Category | Description |
|----------|-------------|
| `development` | Code, architecture, DevOps |
| `design` | UI/UX, visual design |
| `research` | Analysis, fact-checking, literature review |
| `analytics` | Data analysis, visualization |
| `management` | Project management, planning |
| `creative` | Content creation, writing, art |
| `education` | Teaching, tutoring, learning |
| `health` | Health information (NOT medical advice) |
| `legal` | Legal information (NOT legal advice) |
| `finance` | Financial analysis, budgeting |
| `accessibility` | Accessibility tools and assistance |
| `translation` | Language translation and localization |
| `general` | General purpose |

---

## Agent Quality Standards

### Manifest Requirements

- [ ] Valid `agent.yaml` that passes JSON Schema validation
- [ ] Unique `metadata.id` (no conflicts with existing agents)
- [ ] Semantic version (`major.minor.patch`)
- [ ] Accurate `tags` and `category`
- [ ] `description` clearly explains what the agent does

### System Prompt Requirements

- [ ] `system.md` exists and is non-empty
- [ ] Clear role definition
- [ ] Appropriate boundaries set
- [ ] No harmful, biased, or unsafe instructions
- [ ] Prompt injection resistant

### Documentation Requirements

- [ ] `README.md` with usage examples
- [ ] At least one test scenario

### Quality Levels

| Level | Badge | Requirements |
|-------|-------|-------------|
| 🧪 Experimental | — | Valid manifest, basic functionality |
| 🔵 Community | ⭐ | 10+ users, 4.0+ rating, good docs |
| 🟢 Verified | ✅ | Security review passed, 50+ users |
| 🟣 Featured | 🏆 | Top 5%, team-approved excellence |

---

## Pull Request Process

1. **Branch naming**: `agent/your-agent-name` or `tool/your-tool-name`
2. **One agent per PR** — Keep PRs focused
3. **CI must pass** — Automated validation runs on every PR
4. **Review process**:
   - Automated: Schema validation + security scan
   - Manual: Community review (at least 1 approval)
   - For `official/`: Core team review required

### PR Template

```markdown
## New Agent: [Agent Name]

**Category:** [category]
**Description:** [What does this agent do?]

### Checklist
- [ ] `agent.yaml` passes validation
- [ ] `system.md` is complete
- [ ] `README.md` with usage examples
- [ ] No sensitive data or API keys in files
- [ ] Tested with at least one provider
```

---

## Tool Development

Shared tools live in `tools/` and can be referenced by any agent.

### Tool Structure

```
tools/your-tool/
├── tool.yaml          # Tool manifest
├── handler.js         # JavaScript implementation
├── handler.py         # Python implementation (optional)
├── README.md          # Documentation
└── tests/
    └── basic.yaml     # Test scenarios
```

### Tool Manifest

```yaml
apiVersion: supportai/v1
kind: Tool
metadata:
  id: your-tool
  name: Your Tool
  version: 1.0.0

spec:
  description: "What this tool does"
  parameters:
    - name: input
      type: string
      required: true
      description: "Input parameter"
  returns:
    type: string
    description: "What the tool returns"
  permissions:
    - network        # Needs network access
    - filesystem-read # Needs file read access
```

---

## Questions?

- Open an [issue](https://github.com/supportai-team/supportai-agents/issues)
- Check the [documentation](docs/)

Thank you for making SupportAI Agents better for everyone! 🎉
