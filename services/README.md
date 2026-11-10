# Express website + utility service

The existing Vercel project serves the public **Landing Page Generator** website alongside 12 deterministic utility operations. This is one Express application; there is no additional frontend deployment.

## Public routes

| Path | Purpose |
|---|---|
| `GET /` | Public product homepage |
| `GET /tools` | Interactive workbench using four existing REST utilities |
| `GET /factory` | Transparent Site Factory roadmap |
| `GET /health` | Health endpoint (`{"ok":true}`) |
| `POST /mcp` | MCP Streamable HTTP endpoint exposing 12 registered tools |
| `POST /score-copy` and other action paths | Existing REST compatibility surface |

`src/site.ts` owns the public pages. `src/registry.ts` owns the utility registry; `src/schemas.ts` validates action inputs. `src/mcp.ts` adapts the same 12 utilities for MCP, and `src/routes.ts` exposes the REST routes. The website uses those existing REST paths and does not add duplicate scoring logic.

## Local development

```bash
npm ci
npm run build
npm test
npm run validate
npm run dev
```

Open `http://127.0.0.1:3000/` or `http://127.0.0.1:3000/tools`. The default host is loopback and the default port is 3000.

## Deployment

Production: https://landing-page-generator-actions.vercel.app. The canonical MCP endpoint remains `/mcp` on that hostname. Website changes merge to `main` and deploy through Vercel's existing Git integration. See [deployment details](../docs/deployment.md).

The public workbench requires no login and must not be used with sensitive information. The current per-process memory rate limiter is not a distributed control. Scores are writing heuristics, not conversion predictions; proof validation flags unsupported claims, not factual truth.
