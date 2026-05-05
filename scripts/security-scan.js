#!/usr/bin/env node

/**
 * Basic security scan for system prompts.
 * Detects common prompt injection patterns and unsafe instructions.
 */

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

const DANGEROUS_PATTERNS = [
  { pattern: /ignore\s+(all\s+)?(previous|above|prior)\s+(instructions|rules)/i, name: 'prompt-injection-override' },
  { pattern: /you\s+are\s+now\s+(a\s+)?different/i, name: 'identity-hijack' },
  { pattern: /disregard\s+(your|all|any)\s+(safety|rules|guidelines)/i, name: 'safety-bypass' },
  { pattern: /pretend\s+(you\s+)?(are|have)\s+no\s+(rules|restrictions|limits)/i, name: 'restriction-bypass' },
  { pattern: /output\s+(your|the)\s+system\s+prompt/i, name: 'prompt-leak' },
  { pattern: /\beval\s*\(|\bexec\s*\(|subprocess|os\.system/i, name: 'code-execution-risk' },
  { pattern: /api[_-]?key|secret[_-]?key|password\s*[:=]/i, name: 'credential-exposure' },
  { pattern: /rm\s+-rf|del\s+\/[sS]|format\s+[a-zA-Z]:\s+\//i, name: 'destructive-command' },
];

async function main() {
  const prompts = await glob('agents/{official,community}/*/system.md', {
    cwd: path.resolve(__dirname, '..'),
    absolute: true
  });

  let issues = 0;

  for (const promptPath of prompts) {
    const agentDir = path.basename(path.dirname(promptPath));
    if (agentDir === '_template') continue;

    const content = fs.readFileSync(promptPath, 'utf8');

    for (const { pattern, name } of DANGEROUS_PATTERNS) {
      if (pattern.test(content)) {
        console.error(`❌ ${agentDir}/system.md: Detected "${name}" pattern`);
        issues++;
      }
    }
  }

  if (issues === 0) {
    console.log(`✅ Security scan passed (${prompts.length} prompts scanned).`);
  } else {
    console.error(`\n${issues} security issue(s) found.`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
