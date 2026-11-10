# Deployment status and requirements

The service runs locally and provides Express HTTP routes plus Streamable HTTP MCP at `/mcp`. This repository does not establish a current production host, endpoint, authentication configuration, reverse-proxy behavior, or distributed rate limit. Do not infer a successful deployment from local tests or example hostnames.

Before adding a plugin connection, deploy the service using the repository's supported hosting setup, verify the exact HTTPS `/mcp` URL and auth behavior, and set production request limits at the actual hosting/proxy layer. The current in-memory limiter is per process and should not be treated as a distributed production control. Keep URL-fetch protections, request size bounds, and timeouts enabled.

After verification, supply `MCP_SERVER_URL`, `MCP_ALLOWED_HOSTS`, and `MCP_AUTH_TYPE` to `scripts/package-plugin-release.ts`; package only after the endpoint, configured service host allowlist, and auth declaration are confirmed. OAuth/API-key configurations also require appropriate non-secret `MCP_AUTH_CONFIG`. Never place credentials in the plugin archive. See [release process](plugin-release-process.md).
