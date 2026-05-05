# GitHub Repository Flow

## What exists now

The agent ecosystem exists locally in this workspace. It has not been pushed to GitHub automatically.

You need these GitHub repositories:

- `SupportAI_web`: current web app.
- `supportai-agents`: public agent manifests and community PR workflow.
- `supportai-agent`: separate Firebase Functions backend for runtime/governance.

## Create Repositories

From GitHub UI:

1. Create `supportai-agents`.
2. Create `supportai-agent`.
3. Keep `SupportAI_web` as the app repository or create it if it is not already on GitHub.

## Push `supportai-agents`

The `supportai-agents` repository should contain only:

- `agents/`
- `tools/`
- `docs/`
- `scripts/`
- `agent-schema.json`
- `catalog.json`
- `package.json`
- `README.md`
- governance/contribution docs

Every agent is a folder. The system discovers agents by reading `agents/{official,community}/*/agent.yaml` and rebuilding `catalog.json`.

## Push `supportai-agent`

The `supportai-agent` repository should contain:

- `firebase.json`
- `.firebaserc`
- `functions/`
- `docs/`

This repo deploys to the separate Firebase project named `supportai-agent`.

## Catalog Sync

After pushing `supportai-agents`, set this environment variable in the `supportai-agent` Firebase Functions project:

```text
AGENT_CATALOG_URL=https://raw.githubusercontent.com/<org>/supportai-agents/main/catalog.json
```

Then call `syncAgentCatalog` as root. The backend caches verified agents into Firestore:

```text
AgentCatalog/{agentId}
```

The web app can read local `catalog.json` during development and Firebase-cached catalog in production.

## Community Agent Flow

1. Contributor forks `supportai-agents`.
2. Adds one folder under `agents/community/<agent-id>`.
3. Runs validation.
4. Opens PR.
5. CI checks schema, duplicate ids, prompt safety, governance, and catalog.
6. Root governance can promote verified agents to official when ready.
