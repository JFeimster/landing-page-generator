import type { Request, Response } from 'express';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { actions } from './registry.js';

export function createMcpServer() {
  const server = new McpServer({ name: 'landing-page-generator', version: '0.12.0' });
  for (const action of actions) {
    server.registerTool(action.id, {
      description: action.summary,
      inputSchema: action.input.shape,
    }, async (input: Record<string, unknown>) => {
      try {
        const parsed = action.input.parse(input);
        const data = await action.run(parsed);
        return { content: [{ type: 'text' as const, text: JSON.stringify({ status: 'ok', data }) }], structuredContent: { status: 'ok', data } };
      } catch (error) {
        const code = typeof error === 'object' && error !== null && 'code' in error ? String(error.code) : 'INVALID_INPUT';
        const message = error instanceof Error ? error.message : 'The request could not be completed.';
        return { isError: true, content: [{ type: 'text' as const, text: JSON.stringify({ status: 'error', error: { code, message } }) }] };
      }
    });
  }
  return server;
}

// Stateless transport: each POST is isolated, avoiding cross-client session state.
export async function handleMcpRequest(req: Request, res: Response) {
  if (req.method === 'GET' || req.method === 'DELETE') {
    res.status(405).setHeader('Allow', 'POST').json({ status: 'error', error: { code: 'METHOD_NOT_ALLOWED', message: 'Use Streamable HTTP POST requests.' } });
    return;
  }
  const hostHeader = req.get('host')?.toLowerCase();
  const allowedHosts = (process.env.MCP_ALLOWED_HOSTS ?? 'localhost,127.0.0.1').split(',').map(host => host.trim().toLowerCase()).filter(Boolean);
  let hostname = '';
  try { hostname = new URL(`http://${hostHeader ?? ''}`).hostname.toLowerCase(); } catch { /* rejected below */ }
  if (!hostHeader || !allowedHosts.some(host => host === hostHeader || host === hostname)) {
    res.status(400).json({ status: 'error', error: { code: 'INVALID_HOST', message: 'Host is not configured for this MCP endpoint.' } });
    return;
  }
  const origin = req.get('origin');
  if (origin) {
    try {
      if (new URL(origin).host.toLowerCase() !== hostHeader) throw new Error('Origin does not match host.');
    } catch {
      res.status(403).json({ status: 'error', error: { code: 'INVALID_ORIGIN', message: 'Origin is not allowed.' } });
      return;
    }
  }
  const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
  const server = createMcpServer();
  res.on('close', () => { void transport.close(); void server.close(); });
  await server.connect(transport);
  await transport.handleRequest(req, res, req.body);
}
