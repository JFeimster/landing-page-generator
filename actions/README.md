# HTTP and OpenAPI compatibility

MCP at `/mcp` is the primary service tool interface. This directory contains generated OpenAPI compatibility contracts for clients that need direct HTTP operations. Runtime behavior and request schemas are owned by `services/src/registry.ts`, `services/src/schemas.ts`, and the existing functions under `services/src/actions/`.

The combined contract lists all 12 operations. Existing endpoints are `POST /analyze-url`, `/audit-html`, `/score-copy`, `/validate-proof`, `/build-offer-stack`, `/generate-faqs`, `/generate-cta-variants`, `/generate-design-tokens`, `/generate-image-briefs`, `/map-input-to-sections`, `/package-landing-page`, and `/compare-competitors`.

Regenerate with `npm --prefix services run schemas`, then validate with `npm --prefix services run validate`. Server URLs default to a placeholder and are not production endpoints. OpenAPI is a compatibility interface, not the plugin installation workflow.
