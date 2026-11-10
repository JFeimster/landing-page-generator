# Dashboard Template

**Status:** proposed specification.

## Purpose and capabilities

Client portal, internal operation or analytics application. Required: auth, database. Optional: api, analytics, email. Runtime: server. Resolve capability IDs via `../catalogs/capabilities.json`; add no optional capability without a real need.

## Suggested structure and screens

```text
app/, features/, components/, lib/, migrations/
```

Core screens and reusable blocks: overview, tables, detail, settings, sign-in, empty/error states.

## Configuration and data

Example placeholders: `DATABASE_URL=[secret], AUTH_SECRET=[secret]`. These are configuration names and examples, not credentials. Requirements: Synthetic seed data, access roles, tenant isolation and audit requirements. Never place private values in a browser bundle.

## Deployment and quality

Deploy server and managed data services with backup and migration plan.

Authorize every server operation, support keyboard tables, describe charts and avoid exposing private pages to search. Test failure and empty states. Consider indexing only for intended public pages and use optimized assets and lazy loading when appropriate.

## Acceptance criteria

- [ ] Setup, data sources, configuration and runtime are documented.
- [ ] Core screens and selected capabilities work with keyboard and on mobile.
- [ ] Required integrations have real configured adapters and meaningful error states.
- [ ] Build, behavior checks and a preview deployment pass.
- [ ] Unsupported claims, sensitive information and unresolved publishable placeholders are absent.

## Minimal example brief

[Portal] for [team] tracking [records]. See `../examples/` for schema-valid complete briefs.
