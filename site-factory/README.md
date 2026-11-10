# Site Factory — proposed generator system

**Current status: specification library; not an executable generator.** The production website includes a planning page at https://landing-page-generator-actions.vercel.app/factory, not a functioning factory.

This directory holds versioned project types, project-brief and template contracts, layout/design/motion catalogs, examples, and deployment guides. These are useful source assets for a real generator, but there is currently **no** `factory:new` command, project renderer, GitHub repository writer, Vercel deployment adapter, or connected-provider authorization.

## Existing building blocks

- [Project brief schema](schemas/project-brief.schema.json) and [five example briefs](examples/README.md)
- [Project types](catalogs/project-types.json) and [design styles](catalogs/design-styles.json)
- [Template specifications](template-catalog.md) and existing [HTML starter files](../templates/)
- [Architecture](architecture.md), [generator contract](generator-spec.md), [integration map](integration-map.md), [roadmap](roadmap.md)

## Recommended delivery sequence

1. **Implement executable static generation:** accept a project brief, validate IDs/dependencies against catalogs and schemas, render one existing HTML template with real user-provided content, and emit deterministic project files plus a ZIP. Reject unknown IDs and never invent customer proof or deployment credentials.
2. **Add more production templates:** prove at least two distinct templates in tests, extract shared components, support explicitly selected styles, and generate screenshot-ready previews.
3. **Integrate deployment behind explicit authorization:** first read connected GitHub/Vercel targets, then implement narrowly scoped create/update + preview workflows with safe defaults and per-project isolation. Never make provider changes from a mere preview or generated brief.
4. **Expand once the static generator is reliable:** Next.js app starter, directories, dashboards, embeds, and optional auth/database integrations. Validate each template's runtime/dependencies.

Avoid scaffolding a new monorepo, inventing provider credentials, or claiming generation and deployment features before tests demonstrate they work. The original API/MCP service and the existing private plugin remain operational and separate from this backlog.
