#!/usr/bin/env node

/**
 * Validate governance settings in agent manifests.
 * Ensures agents have reasonable execution limits and root-gated permissions.
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { glob } = require('glob');

const MAX_ALLOWED = {
  maxExecutionTime: 86400,
  maxApiCalls: 10000,
  maxSteps: 200,
};

const CRITICAL_PERMISSIONS = ['execute', 'mcp', 'social', 'system'];

function permissionNeedsRoot(level) {
  return level === 'approved' || level === 'full';
}

async function main() {
  const manifests = await glob('agents/{official,community}/*/agent.yaml', {
    cwd: path.resolve(__dirname, '..'),
    absolute: true
  });

  let issues = 0;

  for (const manifestPath of manifests) {
    const agentDir = path.basename(path.dirname(manifestPath));
    if (agentDir === '_template') continue;

    try {
      const content = yaml.load(fs.readFileSync(manifestPath, 'utf8'));
      const gov = content?.spec?.governance;
      const caps = content?.spec?.capabilities;
      const permissions = content?.spec?.permissions || {};
      const riskLevel = content?.spec?.riskLevel || 'low';
      const rootApprovalRequired = Boolean(content?.spec?.rootApprovalRequired);
      const id = content?.metadata?.id || agentDir;

      if (!gov) {
        console.error(`ERROR ${id}: Missing governance section`);
        issues++;
        continue;
      }

      if (!gov.sandboxed) {
        console.warn(`WARN ${id}: sandboxed is false and requires manual review`);
      }

      if (gov.maxExecutionTime > MAX_ALLOWED.maxExecutionTime) {
        console.error(`ERROR ${id}: maxExecutionTime (${gov.maxExecutionTime}s) exceeds limit (${MAX_ALLOWED.maxExecutionTime}s)`);
        issues++;
      }

      if (gov.maxApiCalls && gov.maxApiCalls > MAX_ALLOWED.maxApiCalls) {
        console.error(`ERROR ${id}: maxApiCalls (${gov.maxApiCalls}) exceeds limit (${MAX_ALLOWED.maxApiCalls})`);
        issues++;
      }

      if (caps?.maxSteps && caps.maxSteps > MAX_ALLOWED.maxSteps) {
        console.error(`ERROR ${id}: maxSteps (${caps.maxSteps}) exceeds limit (${MAX_ALLOWED.maxSteps})`);
        issues++;
      }

      const criticalPermissionEnabled = CRITICAL_PERMISSIONS.some((key) => permissionNeedsRoot(permissions[key]));
      if ((riskLevel === 'critical' || criticalPermissionEnabled) && !rootApprovalRequired) {
        console.error(`ERROR ${id}: critical risk/permissions require spec.rootApprovalRequired=true`);
        issues++;
      }

      if ((riskLevel === 'high' || riskLevel === 'critical') && !gov.humanApproval?.required) {
        console.error(`ERROR ${id}: high/critical risk agents must require human approval`);
        issues++;
      }
    } catch (err) {
      console.error(`WARN Could not parse ${manifestPath}: ${err.message}`);
    }
  }

  if (issues === 0) {
    console.log('Governance check passed.');
  } else {
    console.error(`\n${issues} governance issue(s) found.`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
