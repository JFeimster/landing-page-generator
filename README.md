# Landing Page Generator

**Landing Page Generator v0.12.0** is an existing private ChatGPT plugin for creating, reviewing, and improving landing pages. This repository is the canonical source for the plugin, its production MCP and HTTP utilities, the public companion website, and a proposed Site Factory generator.

**Public website:** https://landing-page-generator-actions.vercel.app/  
**Plugin:** https://chatgpt.com/plugins/plugin_550e4f7010a081919a7f5030cb3ec822  
**Source:** https://github.com/JFeimster/landing-page-generator

## What is live today

| Surface | Path | Status |
|---|---|---|
| Public homepage | `/` | Implemented companion website |
| Interactive utility workbench | `/tools` | Working browser interface for four existing REST utilities |
| Site Factory planning | `/factory` | Roadmap and product scope, **not** an operational generator |
| Health | `/health` | Production health endpoint |
| MCP server | `/mcp` | Streamable HTTP MCP: 12 registered tools, **POST** requests |
| Legacy REST utilities | e.g. `/score-copy`, `/generate-cta-variants` | 12 existing HTTP-compatible operations |

The public website is served by the **same Express/Vercel project** as the utility service. This is intentional: it eliminates the root 404 without replacing the existing MCP connection, changing the plugin identity, or creating a redundant deployment. Opening `/mcp` in a browser does not test MCP; use an MCP-capable client to initialize and discover tools.

The current production MCP endpoint was verified on November 10, 2026: it initialized as `landing-page-generator` v0.12.0, discovered 12 tools, and invoked `scoreCopy`. The installed personal plugin was subsequently updated in place to v0.12.0. See [deployment notes](docs/deployment.md).

## What is not implemented yet

The [Site Factory](site-factory/README.md) contains project types, schemas, design catalogs, examples, and template **specifications**. It does **not** yet have an executable brief-to-project generator, preview renderer, deployment orchestration, GitHub project writer, or provider authentication.

**Recommended implementation order:** (1) deterministic static-page generator and ZIP export; (2) real design-pack and template rendering; (3) opt-in GitHub/Vercel preview deployment; (4) advanced Next.js, directory, dashboard and embedded-app starters. The production `/factory` page is a planning surface, not a generator UI.

## Repository map

- `plugin/landing-page-generator/` — canonical plugin identity, instructions, skills, 19 knowledge references and icon
- `services/src/` — Express application, MCP adapter, HTTP utility registry, and public website routes
- `services/src/site.ts` — three public website pages (`/`, `/tools`, `/factory`)
- `knowledge/`, `data/`, `templates/`, `examples/` — reusable source assets
- `site-factory/` — generator product contracts, catalogs, and roadmap
- `actions/` — generated OpenAPI compatibility contracts
- `gpt/`, `gpts/` — retained historical GPT files, **not** the current plugin configuration

## Local development

```powershell
npm --prefix services ci
npm --prefix services run build
npm --prefix services test
npm --prefix services run validate
npm --prefix services run dev
```

Open http://127.0.0.1:3000 for the homepage or http://127.0.0.1:3000/tools to try the workbench. The dev server binds to `127.0.0.1:3000` by default.

## Shipping changes

The connected Vercel project `landing-page-generator-actions` automatically deploys GitHub `main` to production. Changes to the public website/service are deployed by merging a validated PR into `main`. **Changes to plugin skills or packaged metadata also require a separate, intentional update of the existing ChatGPT plugin** through Plugin Creator. Do not create a duplicate plugin or treat a Git merge as an installed-plugin update.

Reference: [architecture](docs/plugin-architecture.md) · [MCP tools](docs/mcp-tools.md) · [release process](docs/plugin-release-process.md) · [getting started](docs/getting-started.md).

## Reliability and safety

Copy scores are deterministic writing signals, not predictions of conversion outcomes. Proof validation flags claims; it does not verify their truth. URL inspection accepts only public destinations and may not see JavaScript-rendered content. The service has no user authentication; do not submit confidential information through the public tools. Deployment/provider actions for the future Site Factory must be opt-in and authorized.
