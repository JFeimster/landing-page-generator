# Static Site Template

**Status:** proposed specification.

## Purpose and capabilities

Prebuilt marketing, portfolio or documentation sites. Required: seo, content. Optional: forms, analytics, search. Runtime: static. Resolve capability IDs via `../catalogs/capabilities.json`; add no optional capability without a real need.

## Suggested structure and screens

```text
pages/, assets/, content/, config/
```

Core screens and reusable blocks: home, about, contact, 404; hero, navigation and footer.

## Configuration and data

Example placeholders: `PUBLIC_SITE_URL=[canonical URL], FORM_ENDPOINT=[configured endpoint]`. These are configuration names and examples, not credentials. Requirements: Build-time files; optional external form provider. Never place private values in a browser bundle.

## Deployment and quality

Prebuild routes and serve static assets on any compatible host.

Check semantic headings, alt text, canonical metadata, compressed media and no secrets in browser assets. Test failure and empty states. Consider indexing only for intended public pages and use optimized assets and lazy loading when appropriate.

## Acceptance criteria

- [ ] Setup, data sources, configuration and runtime are documented.
- [ ] Core screens and selected capabilities work with keyboard and on mobile.
- [ ] Required integrations have real configured adapters and meaningful error states.
- [ ] Build, behavior checks and a preview deployment pass.
- [ ] Unsupported claims, sensitive information and unresolved publishable placeholders are absent.

## Minimal example brief

[Static brand] serving [audience] with goal [inquiry]. See `../examples/` for schema-valid complete briefs.
