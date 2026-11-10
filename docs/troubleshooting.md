# Troubleshooting

- **Build errors:** Run `npm --prefix services ci`, then `npm --prefix services run build`. Confirm a compatible current Node runtime.
- **OpenAPI validation errors:** Run `npm --prefix services run schemas` to regenerate contracts from runtime schemas, then `npm --prefix services run validate`.
- **MCP invalid input:** Tool inputs use the same strict Zod schemas as HTTP routes. Remove unknown fields and follow each tool's listed input shape.
- **URL analysis fails:** The fetcher intentionally rejects private/internal destinations, limits response size and duration, and only analyzes supported public HTML responses.
- **HTTP 429:** The current limiter is per process and keys from Express request IP. Configure trusted proxies explicitly; use the deployment platform's controls for distributed limits.
- **No remote plugin tools:** The repository has no verified public MCP endpoint yet. Local `/mcp` support is not an installed remote connection; do not use the template URL.
- **Release package refuses to build:** Set a verified HTTPS `MCP_SERVER_URL` ending in `/mcp`, `MCP_ALLOWED_HOSTS` matching the host configured on the running service, and a verified `MCP_AUTH_TYPE`. Add non-secret auth metadata only when the actual server requires it.
