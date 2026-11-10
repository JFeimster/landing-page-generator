# Production deployment and MCP connection

## Current production configuration

- **Source:** `JFeimster/landing-page-generator`, `main`
- **Existing Vercel project:** `landing-page-generator-actions`
- **Project ID:** `prj_Yx96rCJG9W48jf1LmcTOXZN24Zvp`
- **Canonical URL:** https://landing-page-generator-actions.vercel.app
- **Public website:** `/`, `/tools`, `/factory`
- **Health check:** `GET /health`
- **MCP:** `POST /mcp` using Streamable HTTP
- **REST utilities:** Existing registry routes such as `POST /score-copy` and `POST /generate-cta-variants`

The website and MCP API run in the same Express service; `services/src/site.ts` registers the public GET pages without changing the existing MCP and action interfaces.

Production v0.12.0 MCP was verified on November 10, 2026: initialization, discovery of all 12 tools, and a `scoreCopy` invocation succeeded. The **existing** ChatGPT plugin was updated in place to v0.12.0. Future changes to packaged skills or MCP configuration must be released separately from a website/service Git merge.

## Publishing the website

Merge a tested pull request into `main` and confirm the existing Vercel Git integration deployed the **same commit SHA** to production. Check that `GET /` responds with HTML, `GET /tools` and `GET /factory` respond with HTML, and `GET /health` remains healthy. Test a tool request from the workbench and an independent MCP client. Monitor runtime errors.

The Vercel default hostname ends in `-actions` because the project originated as an API. A display name or custom domain can be added later, but a rename is not required to publish the website. **Do not break the canonical MCP address**: https://landing-page-generator-actions.vercel.app/mcp. If a new frontend hostname is introduced, preserve the old MCP URL and explicitly verify aliases, host allowlists and the plugin's connection metadata.

## Host and auth limitations

The MCP host allowlist defaults to `localhost`, `127.0.0.1`, and `landing-page-generator-actions.vercel.app`; `MCP_ALLOWED_HOSTS` overrides the list. A new hostname needs the corresponding allowlist value. Origin checks apply to MCP. The service currently has **no authentication**, and its rate limiter is per-instance memory rather than distributed. Configure appropriate hosting-edge rate limits before public workloads increase. URL analysis blocks private destinations, and the JSON body is bounded.

## Plugin release packaging

Use only a verified HTTPS endpoint and observed authentication scheme:

```powershell
$env:MCP_SERVER_URL = "https://landing-page-generator-actions.vercel.app/mcp"
$env:MCP_AUTH_TYPE = "none"
$env:MCP_ALLOWED_HOSTS = "landing-page-generator-actions.vercel.app"
npm --prefix services run package:plugin
```

Plugin Creator updates must target the existing backend ID `plugin_550e4f7010a081919a7f5030cb3ec822`, preserving identity and sharing settings. Follow [plugin release process](plugin-release-process.md), and never create a second plugin.
