#!/usr/bin/env node

/**
 * Validate a single agent manifest against the JSON Schema.
 *
 * Usage:
 *   node scripts/validate-agent.js agents/official/code-architect
 *   node scripts/validate-agent.js agents/community/my-agent
 */

const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const yaml = require('js-yaml');

const agentDir = process.argv[2];
if (!agentDir) {
  console.error('Usage: node scripts/validate-agent.js <agent-directory>');
  process.exit(1);
}

const schemaPath = path.resolve(__dirname, '..', 'agent-schema.json');
const manifestPath = path.resolve(agentDir, 'agent.yaml');
const systemPromptPath = path.resolve(agentDir, 'system.md');

// Check files exist
if (!fs.existsSync(manifestPath)) {
  console.error(`❌ agent.yaml not found in ${agentDir}`);
  process.exit(1);
}

if (!fs.existsSync(systemPromptPath)) {
  console.error(`❌ system.md not found in ${agentDir}`);
  process.exit(1);
}

// Load schema
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

// Load and parse YAML manifest
let manifest;
try {
  manifest = yaml.load(fs.readFileSync(manifestPath, 'utf8'));
} catch (err) {
  console.error(`❌ Failed to parse agent.yaml: ${err.message}`);
  process.exit(1);
}

// Validate against schema
const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);
const validate = ajv.compile(schema);
const valid = validate(manifest);

if (!valid) {
  console.error(`❌ Validation failed for ${manifest?.metadata?.id || agentDir}:`);
  validate.errors.forEach((err) => {
    console.error(`   ${err.instancePath || '/'}: ${err.message}`);
  });
  process.exit(1);
}

// Additional checks
const systemPrompt = fs.readFileSync(systemPromptPath, 'utf8').trim();
if (systemPrompt.length < 50) {
  console.error(`⚠️  system.md is very short (${systemPrompt.length} chars). Consider adding more detail.`);
}

console.log(`✅ ${manifest.metadata.id}@${manifest.metadata.version} — valid`);
process.exit(0);
