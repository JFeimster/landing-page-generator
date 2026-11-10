# Plugin architecture

## Sources of truth

1. `plugin/landing-page-generator/plugin.json` owns portable plugin identity, presentation, version, and starter prompts. The existing name `gpt-7ae4dc668705b6719ce1d8e858f4facd`, display name, icon, category, audience-facing copy, and three prompts are preserved. `.codex-plugin/plugin.json` is a legacy compatibility overlay; its identity, version, and presentation must stay synchronized with the portable manifest.
2. `skills/instructions/SKILL.md` owns operational guidance. It loads selected files from the 19 packaged references as needed.
3. `services/src/registry.ts` and `services/src/schemas.ts` own the 12 utility contracts and behavior. `services/src/actions/` contains their unchanged implementations.
4. `services/src/openapi.ts` generates the OpenAPI compatibility contracts in `actions/`; generated YAML is not an independent source of behavior.
5. GitHub is the canonical source for versioned code and release artifacts. Local files and workflow output must not be described as deployment evidence.
6. `gpt/`, `gpts/`, and GPT Builder docs are historical migration context, not active installation instructions.

## Runtime interfaces

Express serves the existing per-operation HTTP paths and `/health`. `services/src/mcp.ts` adapts the registry to MCP tools and Streamable HTTP at `/mcp`; it does not duplicate business logic. The stateless transport creates a fresh server/transport for each request. Existing input Zod schemas and structured utility responses are reused.

The adapter is implemented locally. A verified public URL and authentication contract do not exist in the repository, so the plugin intentionally has no `mcp.json`. A configuration template documents the required shape; release packaging must stop until the endpoint and auth are verified.

## Extension assets

The package's knowledge references, templates, examples, and site-factory catalogs remain intact. Templates and catalogs can guide static pages, lead funnels, SaaS/waitlist pages, directories, resource hubs, embeds, and Next.js scaffolds, but their specifications do not themselves generate those projects.
