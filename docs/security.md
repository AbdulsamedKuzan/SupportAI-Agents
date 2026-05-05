# Security Guide

## Overview

SupportAI Agents uses multiple security layers to protect users from malicious or poorly-designed agents.

## Security Layers

### Layer 1: Manifest Validation
- Every `agent.yaml` is validated against `agent-schema.json`
- Governance limits are enforced (maxExecutionTime, maxApiCalls, maxSteps)
- Invalid manifests are rejected at PR time via CI

### Layer 2: Prompt Security Scan
- System prompts are scanned for prompt injection patterns
- Credential exposure detection (API keys, passwords in prompts)
- Destructive command detection

### Layer 3: Execution Sandbox
- Agents run in Web Workers (browser) or isolated processes (Node.js)
- No direct DOM access from agent code
- Network access restricted to `governance.allowedDomains`
- File system access restricted to `governance.sandboxed` rules

### Layer 4: Human Approval
- Agents can declare `governance.humanApproval.forActions`
- Dangerous actions (file writes, API calls) require user confirmation
- Users can always interrupt a running agent

### Layer 5: BYOK Security
- API keys stored in encrypted IndexedDB (AES-256-GCM)
- Keys never transmitted to SupportAI servers
- All LLM calls made directly from user's client to provider
- Keys can be rotated or deleted at any time

## For Agent Authors

### Do:
- Set `sandboxed: true` unless there's a specific reason not to
- Use the minimum `allowedDomains` your agent needs
- Set reasonable `maxExecutionTime` and `maxApiCalls`
- Include disclaimers for health, legal, and financial agents

### Don't:
- Include API keys or credentials in your agent files
- Write prompts that encourage bypassing safety guidelines
- Request permissions your agent doesn't need
- Store user data unless explicitly needed (`dataRetention: none`)

## Reporting Security Issues

If you discover a security vulnerability in an agent or the platform:
1. **Do NOT** open a public issue
2. Email security concerns to the project maintainers
3. We will respond within 48 hours
