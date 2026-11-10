# Landing Page Template

**Status:** proposed specification; existing standalone examples are available under `../../templates/`.

## Purpose and capabilities

One offer and one conversion goal. Required: seo, content. Optional: forms, analytics. Runtime: static. Resolve capability IDs via `../catalogs/capabilities.json`; add no optional capability without a real need.

## Suggested structure and screens

```text
index.html or app/, assets/, content/
```

Core screens and reusable blocks: hero, proof placeholder, problem, mechanism, offer, FAQ, CTA.

## Configuration and data

Example placeholders: `PUBLIC_SITE_URL=[URL], FORM_ENDPOINT=[endpoint]`. These are configuration names and examples, not credentials. Requirements: Approved offer facts, assets and real form destination. Never place private values in a browser bundle.

## Deployment and quality

Deploy static output; link a real external service if needed.

Review copy for unsupported claims, mobile reflow, keyboard focus and metadata. Test failure and empty states. Consider indexing only for intended public pages and use optimized assets and lazy loading when appropriate.

## Acceptance criteria

- [ ] Setup, data sources, configuration and runtime are documented.
- [ ] Core screens and selected capabilities work with keyboard and on mobile.
- [ ] Required integrations have real configured adapters and meaningful error states.
- [ ] Build, behavior checks and a preview deployment pass.
- [ ] Unsupported claims, sensitive information and unresolved publishable placeholders are absent.

## Minimal example brief

[Offer] for [audience]; CTA [request details]. See `../examples/` for schema-valid complete briefs.
