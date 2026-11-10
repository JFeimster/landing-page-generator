# Utility service

The Express service provides 12 deterministic operations through existing HTTP routes and Streamable HTTP MCP at `/mcp`. `src/registry.ts` is the operation registry; `src/schemas.ts` defines strict Zod inputs; `src/actions/` contains the reusable implementations. The MCP adapter in `src/mcp.ts` calls those same registry entries.

## Local development

```bash
npm ci
npm run dev
npm run build
npm test
npm run validate
```

The development server listens on `127.0.0.1:3000` by default. Production URL, auth, proxy configuration, and hosting-level rate limits are not verified here. Existing URL-fetch protections and request bounds should remain enabled. The current memory limiter is process-local and is not distributed across hosts.

Scores represent deterministic writing signals, not predicted conversion. Proof validation flags risky claims; it does not determine truth. URL analysis observes public static HTML and can miss content requiring JavaScript or authentication.
