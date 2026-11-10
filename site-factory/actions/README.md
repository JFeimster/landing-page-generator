# Action Specifications

Existing POST endpoints are **placeholder**, not connected services: `services/src/routes.ts` returns the input with a placeholder status. OpenAPI schemas and similarly named action modules exist but do not establish working behavior. Health GET is implemented as a static response only.

Use [public-url-analysis.md](public-url-analysis.md), [validation-and-scoring.md](validation-and-scoring.md), and [generation-and-export.md](generation-and-export.md). Their contracts are proposed. `catalogs/action-capabilities.json` is the route inventory; `schemas/action-manifest.schema.json` describes individual catalog entries.
