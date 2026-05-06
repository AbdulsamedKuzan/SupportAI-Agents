#!/usr/bin/env node

/**
 * Validate all agent manifests in the repository without spawning a shell.
 */

const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const yaml = require('js-yaml');
const { glob } = require('glob');

const repoRoot = path.resolve(__dirname, '..');
const schema = JSON.parse(fs.readFileSync(path.join(repoRoot, 'agent-schema.json'), 'utf8'));
const modelRegistry = JSON.parse(fs.readFileSync(path.join(repoRoot, 'model-registry.json'), 'utf8'));
const registeredModels = new Set(Object.keys(modelRegistry.models || {}));
const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);
const validate = ajv.compile(schema);

function validateAgentDir(agentDir) {
  const manifestPath = path.join(agentDir, 'agent.yaml');
  const systemPromptPath = path.join(agentDir, 'system.md');

  if (!fs.existsSync(manifestPath)) {
    return [`agent.yaml not found in ${agentDir}`];
  }
  if (!fs.existsSync(systemPromptPath)) {
    return [`system.md not found in ${agentDir}`];
  }

  let manifest;
  try {
    manifest = yaml.load(fs.readFileSync(manifestPath, 'utf8'));
  } catch (err) {
    return [`Failed to parse agent.yaml: ${err.message}`];
  }

  const valid = validate(manifest);
  const errors = [];
  if (!valid) {
    for (const err of validate.errors || []) {
      errors.push(`${err.instancePath || '/'}: ${err.message}`);
    }
  }

  const models = manifest?.spec?.models || {};
  const declaredModels = [
    ...(Array.isArray(models.preferred) ? models.preferred : []),
    models.minimum
  ].filter(Boolean);
  for (const model of declaredModels) {
    if (!registeredModels.has(model)) {
      errors.push(`Unknown model "${model}". Add it to model-registry.json.`);
    }
  }

  const prompt = fs.readFileSync(systemPromptPath, 'utf8').trim();
  if (prompt.length < 50) {
    errors.push(`system.md is too short (${prompt.length} chars)`);
  }

  return errors;
}

async function main() {
  const agentManifests = await glob('agents/{official,community}/*/agent.yaml', {
    cwd: repoRoot,
    absolute: true
  });

  if (agentManifests.length === 0) {
    console.log('No agent manifests found.');
    process.exit(0);
  }

  let failed = 0;
  let passed = 0;

  for (const manifestPath of agentManifests) {
    const agentDir = path.dirname(manifestPath);
    const agentName = path.basename(agentDir);
    if (agentName === '_template') continue;

    const errors = validateAgentDir(agentDir);
    if (errors.length) {
      console.error(`  ERROR ${agentName}`);
      errors.forEach((err) => console.error(`    - ${err}`));
      failed++;
    } else {
      console.log(`  OK ${agentName}`);
      passed++;
    }
  }

  console.log(`\n${passed} passed, ${failed} failed out of ${passed + failed} agents.`);
  if (failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
