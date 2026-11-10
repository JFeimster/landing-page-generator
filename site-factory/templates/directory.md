# Directory Template

**Status:** proposed specification.

## Purpose and capabilities

Curated resources, listings or marketplace discovery. Required: search, content. Optional: database, forms, auth, seo, analytics. Runtime: static or server. Resolve capability IDs via `../catalogs/capabilities.json`; add no optional capability without a real need.

## Suggested structure and screens

```text
listings/, categories/, search/, data/, components/
```

Core screens and reusable blocks: directory, categories, listing detail, search, optional submission.

## Configuration and data

Example placeholders: `DATA_SOURCE=[configured source], PUBLIC_SITE_URL=[URL]`. These are configuration names and examples, not credentials. Requirements: Approved listing data, category taxonomy, publication and moderation policy. Never place private values in a browser bundle.

## Deployment and quality

Build static listing pages for stable data; use server APIs for live updates.

Use accessible filters, meaningful empty states, listing canonical URLs and paginated results. Test failure and empty states. Consider indexing only for intended public pages and use optimized assets and lazy loading when appropriate.

## Acceptance criteria

- [ ] Setup, data sources, configuration and runtime are documented.
- [ ] Core screens and selected capabilities work with keyboard and on mobile.
- [ ] Required integrations have real configured adapters and meaningful error states.
- [ ] Build, behavior checks and a preview deployment pass.
- [ ] Unsupported claims, sensitive information and unresolved publishable placeholders are absent.

## Minimal example brief

[Category] directory for [audience] with [approved listings]. See `../examples/` for schema-valid complete briefs.
