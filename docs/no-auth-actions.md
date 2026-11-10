# HTTP compatibility interface

The service exposes the 12 operations listed in [MCP tools](mcp-tools.md) through unauthenticated HTTP POST endpoints as well as MCP. No authentication is currently implemented by the service; that fact must be reconciled with actual production hosting before remote use.

Request inputs are strict Zod schemas, JSON bodies are capped at 512 KB, and URL fetches retain public-network protections, size limits, and timeouts. The current process-local limiter is not a distributed defense. Do not expose a production service until hosting, request limits, and auth requirements have been reviewed.

OpenAPI files are generated compatibility documents. They are not a GPT setup guide and their default example host is not a real endpoint.
