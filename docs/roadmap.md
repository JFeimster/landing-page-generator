# Roadmap

## Live now — v0.12.0

- Existing private Landing Page Generator plugin, updated in place (version 0.12.0).
- 12 implemented deterministic utility operations through REST and production Streamable HTTP MCP.
- Public companion website at the existing Vercel deployment: `/`, `/tools`, and `/factory`.
- Working web workbench for `scoreCopy`, `generateCtaVariants`, `generateDesignTokens`, and `validateProof`.
- Existing HTML templates, 19 plugin knowledge references, Site Factory schemas, catalogs, and example briefs.

## Next: executable Site Factory

1. Validate user project briefs against existing schemas and catalogs.
2. Generate a deterministic single-file static landing page from approved input, with a preview and downloadable ZIP.
3. Implement a second template and reusable style/design tokens with responsive and accessibility checks.
4. Add opt-in connected GitHub/Vercel workflows for reviewed commits, preview builds, and separately authorized production deployment.
5. Expand to Next.js, directories, embeds, dashboards, and provider adapters only after the above are reliable.

The `site-factory/` directory and the public `/factory` page are specifications/roadmap, **not** operational generation or publishing flows. See [factory plan](../site-factory/README.md).

## Non-goals

- Creating a duplicate plugin, GPT, repository, or hosting project.
- Renaming or removing the active MCP endpoint without coordinated migration.
- Using copy scores as conversion forecasts or proof checks as truth verification.
- Automatically creating/deploying customer projects from unapproved previews.
