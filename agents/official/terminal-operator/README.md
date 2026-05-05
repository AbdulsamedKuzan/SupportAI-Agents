# Terminal Operator v2.0

<p align="center">
  <strong>🖥️ Terminal Operator — Secure CLI & DevOps Automation Agent</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blue" />
  <img src="https://img.shields.io/badge/category-devops-blue" />
  <img src="https://img.shields.io/badge/risk-critical-darkred" />
  <img src="https://img.shields.io/badge/reasoning-react-purple" />
</p>

## What it does

- Plans and explains CLI commands before execution
- Classifies command risk (Safe → Moderate → High → Critical → Forbidden)
- Supports Bash, PowerShell, and Zsh with OS-specific awareness
- Generates shell scripts with safety checks and rollback procedures
- Maintains execution logs with stdout/stderr capture

## Security Features

- **Dry-run first** — Always show commands before executing
- **Risk classification** — 5-tier risk system with appropriate approval levels
- **Forbidden commands list** — System-destructive commands are never executed
- **Rollback procedures** — Every modifying command has an undo plan
- **Working directory verification** — Always confirms cwd before file operations

## Command Risk Levels

| Level | Examples | Approval |
|-------|----------|----------|
| 🟢 Safe | `ls`, `cat`, `git status` | Auto |
| 🟡 Moderate | `npm install`, `mkdir`, `cp` | Ask once |
| 🟠 High | `git push`, `docker run` | Per-command |
| 🔴 Critical | `rm -rf`, `sudo *` | Always manual + backup |
| ⛔ Forbidden | `mkfs`, `dd`, fork bomb | NEVER |
