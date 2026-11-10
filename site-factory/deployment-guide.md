# Deployment Guide

## Choose a runtime

- Static hosting: prebuilt files and CDN; forms and analytics need real configured services.
- Server-backed application: runtime supporting the application's framework, callbacks, secrets and request-time logic.
- API: isolated server deployment, TLS, request validation, rate limits and monitoring.
- Embed: versioned loader and widget origin with explicit host integration.

## Release sequence

1. Select a provider based on runtime and project requirements; the provider is configurable and no connection is assumed.
2. Configure environment variable names from the template's example file. Keep values in the deployment provider's secret store, never in client bundles or Git.
3. Provision any required database and apply reviewed migrations; configure auth callback URLs for the target environment.
4. Build and deploy a preview. Test actual links, forms, event delivery, auth, errors, accessibility and mobile layout.
5. Set production domain, canonical URL, metadata, robots and monitoring; verify backups and rollback procedure where state exists.
6. Deploy production only after explicit release approval appropriate to the project.

Static frontend integrations can call a configured service but cannot execute server-only code themselves. Use separate development and production credentials and origins.
