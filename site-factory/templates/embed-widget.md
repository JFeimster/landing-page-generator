# Embed Widget Template

**Status:** proposed specification.

## Purpose and capabilities

Calculator, form or mini-app embedded on another site. Required: embed. Optional: forms, api, analytics. Runtime: static or server. Resolve capability IDs via `../catalogs/capabilities.json`; add no optional capability without a real need.

## Suggested structure and screens

```text
loader/, widget/, demo-host/, assets/, docs/
```

Core screens and reusable blocks: installation snippet, widget, loading, error and completion states.

## Configuration and data

Example placeholders: `WIDGET_ORIGIN=[origin], API_ENDPOINT=[optional endpoint]`. These are configuration names and examples, not credentials. Requirements: Versioned widget URL, configurable host origins, documented events and sizing. Never place private values in a browser bundle.

## Deployment and quality

Host versioned assets; choose iframe isolation for interactive tools or script for lightweight UI.

Title iframe; verify postMessage origin and source, restrict allowed origins, avoid leaking secrets, support keyboard and reduced motion. Test failure and empty states. Consider indexing only for intended public pages and use optimized assets and lazy loading when appropriate.

## Acceptance criteria

- [ ] Setup, data sources, configuration and runtime are documented.
- [ ] Core screens and selected capabilities work with keyboard and on mobile.
- [ ] Required integrations have real configured adapters and meaningful error states.
- [ ] Build, behavior checks and a preview deployment pass.
- [ ] Unsupported claims, sensitive information and unresolved publishable placeholders are absent.

## Minimal example brief

[Calculator] for [audience] embedded in [host]. See `../examples/` for schema-valid complete briefs.
