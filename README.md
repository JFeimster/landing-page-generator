# Landing Page Generator

Landing Page Generator is an existing plugin for creating, auditing, rewriting, and implementing landing pages. Its canonical package is `plugin/landing-page-generator/`; the package keeps its existing name, presentation, icon, and three starter prompts.

## Start here

- [Plugin installation](docs/plugin-installation.md)
- [Architecture](docs/plugin-architecture.md)
- [MCP tools](docs/mcp-tools.md)
- [Release process](docs/plugin-release-process.md)
- [Migration from GPT setup](docs/gpt-to-plugin-migration.md)

## Implemented service

The TypeScript service provides 12 deterministic utilities through existing HTTP endpoints and a Streamable HTTP MCP adapter at `/mcp`. See [services/README.md](services/README.md) and [actions/README.md](actions/README.md). URL inspection is restricted to public destinations. Scores are writing signals rather than conversion forecasts; proof checks flag claims and do not establish factual truth.

The MCP code is implemented locally. A production endpoint, hosting configuration, and authentication requirements have not been verified, so this repository does not ship a live server URL or portable `mcp.json` yet.

## Repository assets

`plugin/` owns identity and skills; `knowledge/`, `data/`, `templates/`, `examples/`, and `site-factory/` preserve product guidance, catalogs, examples, and template specifications. Specifications and catalogs are not executable generators. Existing GPT instructions and OpenAPI contracts remain historical or compatibility materials.

## Development

```powershell
npm --prefix services ci
npm --prefix services run build
npm --prefix services test
npm --prefix services run validate
```

See [docs/getting-started.md](docs/getting-started.md), [docs/testing.md](docs/testing.md), and [docs/troubleshooting.md](docs/troubleshooting.md).
