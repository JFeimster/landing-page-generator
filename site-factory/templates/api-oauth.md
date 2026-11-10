# API and OAuth Template

**Status:** proposed specification.

## Purpose and capabilities

Developer API or third-party delegated integration. Required: api. Optional: auth, oauth, database. Runtime: server. Resolve capability IDs via `../catalogs/capabilities.json`; add no optional capability without a real need.

## Suggested structure and screens

```text
routes/, auth/, services/, schemas/, docs/, tests/
```

Core screens and reusable blocks: health, API routes, OAuth start/callback if selected, developer docs.

## Configuration and data

Example placeholders: `OAUTH_CLIENT_ID=[value], OAUTH_CLIENT_SECRET=[secret], TOKEN_ENCRYPTION_KEY=[secret]`. These are configuration names and examples, not credentials. Requirements: Configured provider, registered redirect URI, scoped authorization and token storage. Never place private values in a browser bundle.

## Deployment and quality

Host over HTTPS with environment-specific callbacks and monitoring.

Use state and PKCE where appropriate, secure server-side token storage, refresh/revocation, scopes, validation, quotas and webhook signature verification. Test failure and empty states. Consider indexing only for intended public pages and use optimized assets and lazy loading when appropriate.

## Acceptance criteria

- [ ] Setup, data sources, configuration and runtime are documented.
- [ ] Core screens and selected capabilities work with keyboard and on mobile.
- [ ] Required integrations have real configured adapters and meaningful error states.
- [ ] Build, behavior checks and a preview deployment pass.
- [ ] Unsupported claims, sensitive information and unresolved publishable placeholders are absent.

## Minimal example brief

[API] enables [authorized integration] for [audience]. See `../examples/` for schema-valid complete briefs.
