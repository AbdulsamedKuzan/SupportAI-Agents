# Community Agent Template

This is a starter template for creating your own SupportAI agent.

## Quick Start

1. Copy this entire `_template` directory to `agents/community/your-agent-name/`
2. Edit `agent.yaml` with your agent's configuration
3. Write your system prompt in `system.md`
4. Update this `README.md` with documentation
5. Add test scenarios in `tests/`
6. Submit a Pull Request

## Files

| File | Purpose |
|------|---------|
| `agent.yaml` | Agent manifest (required) |
| `system.md` | System prompt (required) |
| `README.md` | Documentation (required) |
| `tests/basic.yaml` | Test scenarios (recommended) |

## Validation

```bash
npm run validate -- agents/community/your-agent-name
```

## Need Help?

- Read the [Contributing Guide](../../../CONTRIBUTING.md)
- Check [existing agents](../../official/) for examples
- Open an [issue](https://github.com/supportai-team/supportai-agents/issues)
