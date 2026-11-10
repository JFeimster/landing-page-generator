# Single-File HTML Template

**Status:** proposed specification; existing standalone examples are available under `../../templates/`.

## Purpose and capabilities

Portable landing page with inline CSS and optional lightweight JS. Required: content. Optional: seo, forms, analytics. Runtime: static. Resolve capability IDs via `../catalogs/capabilities.json`; add no optional capability without a real need.

## Suggested structure and screens

```text
index.html, README.md, assets/ (optional)
```

Core screens and reusable blocks: semantic document, hero, benefits, optional proof and FAQ, CTA.

## Configuration and data

Example placeholders: `[CANONICAL_URL], [FORM_ACTION], [ANALYTICS_ID]`. These are configuration names and examples, not credentials. Requirements: Supplied content, approved assets and a real optional submission target. Never place private values in a browser bundle.

## Deployment and quality

Open locally for preview; deploy static HTML to a host.

Validate HTML, labels, keyboard states, metadata, responsive CSS, and no unsupported claims. Test failure and empty states. Consider indexing only for intended public pages and use optimized assets and lazy loading when appropriate.

## Acceptance criteria

- [ ] Setup, data sources, configuration and runtime are documented.
- [ ] Core screens and selected capabilities work with keyboard and on mobile.
- [ ] Required integrations have real configured adapters and meaningful error states.
- [ ] Build, behavior checks and a preview deployment pass.
- [ ] Unsupported claims, sensitive information and unresolved publishable placeholders are absent.

## Minimal example brief

[Offer] for [audience] with CTA [contact]. See `../examples/` for schema-valid complete briefs.
