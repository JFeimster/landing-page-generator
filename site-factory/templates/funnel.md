# Funnel Template

**Status:** proposed specification.

## Purpose and capabilities

Quiz, lead magnet or multi-step application. Required: forms. Optional: analytics, seo, email. Runtime: static or server. Resolve capability IDs via `../catalogs/capabilities.json`; add no optional capability without a real need.

## Suggested structure and screens

```text
steps/, thank-you/, components/, content/
```

Core screens and reusable blocks: entry, step screens, review, success and errors.

## Configuration and data

Example placeholders: `FORM_ENDPOINT=[endpoint], ANALYTICS_ID=[configured value]`. These are configuration names and examples, not credentials. Requirements: Question schema, consent policy, server validation and delivery adapter. Never place private values in a browser bundle.

## Deployment and quality

Static frontend requires a configured server for submissions.

Preserve form state, label fields, expose errors, avoid recording sensitive answers in analytics. Test failure and empty states. Consider indexing only for intended public pages and use optimized assets and lazy loading when appropriate.

## Acceptance criteria

- [ ] Setup, data sources, configuration and runtime are documented.
- [ ] Core screens and selected capabilities work with keyboard and on mobile.
- [ ] Required integrations have real configured adapters and meaningful error states.
- [ ] Build, behavior checks and a preview deployment pass.
- [ ] Unsupported claims, sensitive information and unresolved publishable placeholders are absent.

## Minimal example brief

[Service] qualification form for [audience]. See `../examples/` for schema-valid complete briefs.
