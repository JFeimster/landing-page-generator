# Next.js App Template

**Status:** proposed specification.

## Purpose and capabilities

SaaS product, member application or portal. Required: content. Optional: auth, database, api, payments, email, analytics. Runtime: server when request-time features are used. Resolve capability IDs via `../catalogs/capabilities.json`; add no optional capability without a real need.

## Suggested structure and screens

```text
app/(marketing)/, app/(auth)/, app/app/, app/api/, features/, lib/
```

Core screens and reusable blocks: marketing, sign-in, app home, settings, loading and error states.

## Configuration and data

Example placeholders: `DATABASE_URL=[secret], AUTH_SECRET=[secret], PUBLIC_SITE_URL=[URL]`. These are configuration names and examples, not credentials. Requirements: Configured identity provider and database when selected; server-side authorization. Never place private values in a browser bundle.

## Deployment and quality

Use a runtime supporting selected server functions; separate preview credentials.

Enforce authorization per operation, isolate secrets, render accessible states, monitor server response time. Test failure and empty states. Consider indexing only for intended public pages and use optimized assets and lazy loading when appropriate.

## Acceptance criteria

- [ ] Setup, data sources, configuration and runtime are documented.
- [ ] Core screens and selected capabilities work with keyboard and on mobile.
- [ ] Required integrations have real configured adapters and meaningful error states.
- [ ] Build, behavior checks and a preview deployment pass.
- [ ] Unsupported claims, sensitive information and unresolved publishable placeholders are absent.

## Minimal example brief

[Product] for [team] to manage [work]. See `../examples/` for schema-valid complete briefs.
