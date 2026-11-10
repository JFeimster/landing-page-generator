# MCP tools

The service exposes the existing registry as Streamable HTTP MCP tools at `POST /mcp`. It uses `@modelcontextprotocol/sdk` and reuses each operation's Zod schema, implementation, result, and structured error behavior. No database or storage is added.

| Tool | Behavior |
|---|---|
| `analyzeUrl` | Extract observed signals from public static HTML. |
| `auditHtml` | Check markup, metadata, labels, and CTA destinations. |
| `scoreCopy` | Score deterministic writing signals, not predicted conversion. |
| `validateProof` | Flag claims that need evidence; cannot establish truth. |
| `buildOfferStack` | Organize supplied offer details without inventing terms. |
| `generateFaqs` | Draft FAQs from supplied facts and objections. |
| `generateCtaVariants` | Draft labels for a supplied goal and tone. |
| `generateDesignTokens` | Select a palette and calculate solid-color contrast. |
| `generateImageBriefs` | Create asset handoff briefs. |
| `mapInputToSections` | Map approved fields to page sections. |
| `packageLandingPage` | Return a ZIP encoded as base64. |
| `compareCompetitors` | Compare observations from up to three public URLs. |

The same operations remain on their existing HTTP paths. Zod rejects invalid inputs; action failures are returned as MCP tool errors with structured code/message content. URL fetching retains the existing public-network restrictions, response limits, and timeout. MCP validates Host against `MCP_ALLOWED_HOSTS` (local loopback defaults) and rejects cross-origin requests. Production must set the exact allowed host. The in-memory HTTP rate limiter is process-local and not a distributed production limit; configure hosting/proxy limits after the deployment model is verified.

No live MCP URL or auth method has been verified. `plugin/landing-page-generator/mcp.json.template` is illustrative only and is excluded from release output. Do not treat tool code or local tests as proof of deployment.
