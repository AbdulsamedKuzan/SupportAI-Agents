# Getting Started with SupportAI Agents

## For Users

### Using Agents in SupportAI Web

1. Go to [supportai.abdulsamedkuzan.com](https://supportai.abdulsamedkuzan.com)
2. Click the **Agent** button in the top-right
3. Browse available agents in the Agent Center
4. Click an agent card to activate it
5. Start chatting — the agent's expertise guides the conversation

### Using Your Own API Keys (BYOK)

SupportAI supports Bring Your Own Key. Go to **Settings → API Keys** and add your keys:

- **OpenAI**: Get your key from [platform.openai.com](https://platform.openai.com)
- **Google**: Get your key from [aistudio.google.com](https://aistudio.google.com)
- **Anthropic**: Get your key from [console.anthropic.com](https://console.anthropic.com)
- **Local (Ollama)**: Run [Ollama](https://ollama.ai) locally and connect via `http://localhost:11434`

Your keys are stored **only on your device** — never sent to our servers.

## For Developers

### Creating Your First Agent

```bash
# 1. Fork and clone the repo
git clone https://github.com/YOUR_USERNAME/supportai-agents.git
cd supportai-agents

# 2. Install validation tools
npm install

# 3. Copy the template
cp -r agents/community/_template agents/community/my-agent

# 4. Edit your agent
code agents/community/my-agent/agent.yaml
code agents/community/my-agent/system.md

# 5. Validate
npm run validate -- agents/community/my-agent

# 6. Submit a PR
git checkout -b agent/my-agent
git add agents/community/my-agent
git commit -m "feat: add my-agent"
git push origin agent/my-agent
```

### Understanding the Manifest

See [Agent Format](agent-format.md) for the complete manifest reference.

### Testing Your Agent

See [Testing Guide](testing.md) for how to write and run test scenarios.

## Architecture Overview

```
User → SupportAI UI → Agent Executor → LLM Provider (BYOK)
                          ↓
                    manifest.yaml
                    system.md
                    tools/
```

The Agent Executor:
1. Parses the `agent.yaml` manifest
2. Loads the system prompt from `system.md`
3. Configures tools, memory, and governance limits
4. Runs the reasoning loop (direct / CoT / ReAct / plan-execute)
5. Returns structured output to the UI
