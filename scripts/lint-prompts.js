#!/usr/bin/env node

/**
 * Basic linting for system prompts.
 * Checks for minimum length and potential issues.
 */

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

async function main() {
  const prompts = await glob('agents/{official,community}/*/system.md', {
    cwd: path.resolve(__dirname, '..'),
    absolute: true
  });

  let warnings = 0;

  for (const promptPath of prompts) {
    const agentDir = path.basename(path.dirname(promptPath));
    if (agentDir === '_template') continue;

    const content = fs.readFileSync(promptPath, 'utf8').trim();

    if (content.length < 100) {
      console.warn(`⚠️  ${agentDir}/system.md is very short (${content.length} chars)`);
      warnings++;
    }

    if (content.length > 50000) {
      console.warn(`⚠️  ${agentDir}/system.md is very long (${content.length} chars)`);
      warnings++;
    }

    // Check for placeholder text
    if (content.includes('[Agent Name]') || content.includes('[domain]')) {
      console.warn(`⚠️  ${agentDir}/system.md contains placeholder text`);
      warnings++;
    }
  }

  if (warnings === 0) {
    console.log(`✅ All system prompts passed linting (${prompts.length} checked).`);
  } else {
    console.log(`\n${warnings} warning(s) found.`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
