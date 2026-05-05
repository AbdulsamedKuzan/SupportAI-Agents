#!/usr/bin/env node

/**
 * Build a browser-friendly catalog from agent manifests.
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { glob } = require('glob');

const repoRoot = path.resolve(__dirname, '..');

function toolNames(tools = []) {
  return tools.map((tool) => {
    if (tool.$ref) return tool.$ref.replace(/^tools\//, '');
    return tool.name || tool.type || 'tool';
  });
}

function cleanText(value, fallback = '') {
  const text = String(value || '').replace(/\s+/g, ' ').trim();
  if (!text) return fallback;
  if (/[^\x00-\x7F]/.test(text)) return fallback || text;
  return text;
}

async function main() {
  const manifests = await glob('agents/{official,community}/*/agent.yaml', {
    cwd: repoRoot,
    absolute: true
  });

  const agents = [];

  for (const manifestPath of manifests) {
    const dir = path.dirname(manifestPath);
    const slug = path.basename(dir);
    if (slug === '_template') continue;

    const manifest = yaml.load(fs.readFileSync(manifestPath, 'utf8'));
    const bucket = manifestPath.includes(`${path.sep}agents${path.sep}official${path.sep}`)
      ? 'official'
      : 'community';

    const displayName = cleanText(manifest.metadata.name, manifest.metadata.nameEN || manifest.metadata.id);
    const description = cleanText(
      manifest.spec.identity.description,
      `${manifest.metadata.nameEN || displayName} official SupportAI agent.`
    );

    agents.push({
      id: manifest.metadata.id,
      name: displayName,
      nameEN: manifest.metadata.nameEN || manifest.metadata.name,
      version: manifest.metadata.version,
      author: manifest.metadata.author,
      avatar: manifest.metadata.avatar || manifest.metadata.id.slice(0, 2).toUpperCase(),
      color: manifest.metadata.color || '#111827',
      category: manifest.metadata.category,
      maturity: manifest.metadata.maturity || (bucket === 'official' ? 'official' : 'community'),
      bucket,
      tags: manifest.metadata.tags || [],
      description,
      reasoning: manifest.spec.capabilities.reasoning,
      maxSteps: manifest.spec.capabilities.maxSteps,
      multiModal: Boolean(manifest.spec.capabilities.multiModal),
      preferredModels: manifest.spec.models.preferred || [],
      minimumModel: manifest.spec.models.minimum || '',
      tools: toolNames(manifest.spec.tools || []),
      permissions: manifest.spec.permissions || {},
      budgetPolicy: manifest.spec.lifecycle?.budgetPolicy || 'quota-bound',
      communicationFiles: manifest.spec.lifecycle?.communicationFiles || [],
      accepts: manifest.spec.io?.input?.accepts || ['text'],
      outputFormats: manifest.spec.io?.output?.formats || ['markdown'],
      riskLevel: manifest.spec.riskLevel || 'low',
      rootApprovalRequired: Boolean(manifest.spec.rootApprovalRequired),
      outputArtifacts: Boolean(manifest.spec.io?.output?.artifacts),
      path: path.relative(repoRoot, dir).replace(/\\/g, '/')
    });
  }

  agents.sort((a, b) => {
    if (a.bucket !== b.bucket) return a.bucket === 'official' ? -1 : 1;
    return a.name.localeCompare(b.name, 'tr');
  });

  const catalog = {
    schemaVersion: 'supportai.catalog.v1',
    generatedAt: new Date().toISOString(),
    source: 'supportai-agents',
    agentCount: agents.length,
    agents
  };

  const outputPath = path.join(repoRoot, 'catalog.json');
  fs.writeFileSync(outputPath, `${JSON.stringify(catalog, null, 2)}\n`, 'utf8');
  console.log(`Built catalog: ${agents.length} agents -> ${outputPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
