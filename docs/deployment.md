# Vercel deployment and MCP configuration

## Verified deployment target

- **GitHub source:** `JFeimster/landing-page-generator` (production branch `main`)
- **Existing Vercel project:** `landing-page-generator-actions`
- **Vercel project ID:** `prj_Yx96rCJG9W48jf1LmcTOXZN24Zvp`
- **Canonical production domain:** `https://landing-page-generator-actions.vercel.app`
- **HTTP health endpoint:** `/health`
- **Streamable HTTP MCP endpoint:** `/mcp`

The project was verified in Vercel on November 10, 2026. Its preview for plugin v0.12.0 built successfully. **A READY deployment alone does not prove live MCP discovery or tool invocation**; verify the production endpoint after merging and before distributing a plugin package.

## Host and authentication configuration

The service uses an explicit host allowlist. When `MCP_ALLOWED_HOSTS` is unset, the verified Vercel production hostname and loopback development hosts are allowed. Set `MCP_ALLOWED_HOSTS` to a comma-separated list of exact hostnames if a different alias or deployment target is used. Its value must match the hostname clients actually call.

The current MCP and legacy HTTP utility routes do **not** authenticate requests. For plugin packaging, set `MCP_AUTH_TYPE=none` only after confirming the public production endpoint behaves accordingly. Do not invent OAuth or API-key configuration.

The existing in-memory request limiter is per instance rather than distributed. Configure suitable rate limiting and abuse controls at the hosting edge when warranted, particularly for public URL analysis and larger package responses. Keep URL/IP safety checks, request size caps, and timeouts enabled.

## Release verification

1. Inspect the latest `main` production deployment in the existing Vercel project; confirm that it matches the merged commit and reports READY.
2. Check that `GET /health` returns a successful response.
3. Use an MCP-capable client to POST an `initialize` request to `https://landing-page-generator-actions.vercel.app/mcp`, then call `tools/list` and a harmless utility such as `scoreCopy`. `GET /mcp` may return 405 by design; that is not an MCP health test.
4. Inspect runtime errors and verify that the host/origin checks do not reject the intended client.
5. When verified, generate the plugin ZIP with `MCP_SERVER_URL=https://landing-page-generator-actions.vercel.app/mcp`, `MCP_AUTH_TYPE=none`, and `MCP_ALLOWED_HOSTS=landing-page-generator-actions.vercel.app`. These package-time values do not require deployment secrets.
6. Update the **existing** Landing Page Generator plugin using the reviewed ZIP; do not create a second plugin.

See [plugin release process](plugin-release-process.md) and [MCP tools](mcp-tools.md).
