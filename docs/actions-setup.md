# OpenAPI compatibility

MCP is the primary service tool interface. The OpenAPI files in `actions/` remain generated compatibility contracts for clients that use HTTP operations directly. Their source of truth is `services/src/registry.ts` and `services/src/schemas.ts`.

Regenerate and validate contracts with `npm --prefix services run schemas` and `npm --prefix services run validate`. A production server URL is not verified; generated defaults such as `example.com` are placeholders and must not be used as deployment instructions. See [MCP tools](mcp-tools.md).
