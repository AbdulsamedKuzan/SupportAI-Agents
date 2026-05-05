#!/usr/bin/env node

/**
 * Check for duplicate agent IDs across all manifests.
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { glob } = require('glob');

async function main() {
  const manifests = await glob('agents/{official,community}/*/agent.yaml', {
    cwd: path.resolve(__dirname, '..'),
    absolute: true
  });

  const idMap = new Map();
  let duplicates = 0;

  for (const manifestPath of manifests) {
    const agentDir = path.basename(path.dirname(manifestPath));
    if (agentDir === '_template') continue;

    try {
      const content = yaml.load(fs.readFileSync(manifestPath, 'utf8'));
      const id = content?.metadata?.id;
      if (!id) continue;

      if (idMap.has(id)) {
        console.error(`❌ Duplicate ID "${id}" found in:`);
        console.error(`   - ${idMap.get(id)}`);
        console.error(`   - ${manifestPath}`);
        duplicates++;
      } else {
        idMap.set(id, manifestPath);
      }
    } catch (err) {
      console.error(`⚠️  Could not parse ${manifestPath}: ${err.message}`);
    }
  }

  if (duplicates === 0) {
    console.log(`✅ No duplicate agent IDs found (${idMap.size} unique agents).`);
  } else {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
