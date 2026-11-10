import test from 'node:test';
import assert from 'node:assert/strict';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import { createApp } from '../src/app.js';
import { createMcpServer } from '../src/mcp.js';

async function connected() {
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  const client = new Client({ name: 'landing-page-generator-tests', version: '1.0.0' });
  const server = createMcpServer();
  await server.connect(serverTransport);
  await client.connect(clientTransport);
  return { client, server };
}

test('MCP discovers all 12 registered operations', async () => {
  const { client, server } = await connected();
  try {
    const result = await client.listTools();
    const names = result.tools.map(tool => tool.name).sort();
    assert.deepEqual(names, ['analyzeUrl','auditHtml','buildOfferStack','compareCompetitors','generateCtaVariants','generateDesignTokens','generateFaqs','generateImageBriefs','mapInputToSections','packageLandingPage','scoreCopy','validateProof'].sort());
    assert.ok(result.tools.every(tool => typeof tool.description === 'string' && tool.inputSchema));
  } finally { await server.close(); await client.close(); }
});

test('MCP invokes existing utility and returns its structured result', async () => {
  const { client, server } = await connected();
  try {
    const result = await client.callTool({ name: 'scoreCopy', arguments: { copy: '# Clear offer\n\nBook a call today.' } });
    assert.equal(result.isError, undefined);
    assert.match(String(result.content?.[0]?.text), /"status":"ok"/);
    assert.match(String(result.content?.[0]?.text), /"max_score":100/);
  } finally { await server.close(); await client.close(); }
});

test('MCP reports validation failures through its tool error result', async () => {
  const { client, server } = await connected();
  try {
    const result = await client.callTool({ name: 'scoreCopy', arguments: { unexpected: true } });
    assert.equal(result.isError, true);
    assert.match(String(result.content?.[0]?.text), /-32602: Input validation error/);
  } finally { await server.close(); await client.close(); }
});

test('MCP URL tool preserves private-network fetch protection', async () => {
  const { client, server } = await connected();
  try {
    const result = await client.callTool({ name: 'analyzeUrl', arguments: { url: 'http://127.0.0.1/' } });
    assert.equal(result.isError, true);
    assert.match(String(result.content?.[0]?.text), /BLOCKED_URL/);
  } finally { await server.close(); await client.close(); }
});

test('Streamable HTTP endpoint discovers and invokes a tool', async () => {
  const app = createApp();
  const httpServer = app.listen(0, '127.0.0.1');
  await new Promise<void>(resolve => httpServer.once('listening', resolve));
  const address = httpServer.address();
  assert.ok(address && typeof address !== 'string');
  const client = new Client({ name: 'landing-page-generator-http-tests', version: '1.0.0' });
  try {
    await client.connect(new StreamableHTTPClientTransport(new URL(`http://127.0.0.1:${address.port}/mcp`)));
    const tools = await client.listTools();
    assert.equal(tools.tools.length, 12);
    const result = await client.callTool({ name: 'scoreCopy', arguments: { copy: 'Book a call.' } });
    assert.match(String(result.content?.[0]?.text), /"status":"ok"/);
    const previousAllowedHosts = process.env.MCP_ALLOWED_HOSTS;
    process.env.MCP_ALLOWED_HOSTS = 'untrusted.example';
    try {
      const rejected = await fetch(`http://127.0.0.1:${address.port}/mcp`, { method: 'POST', headers: { accept: 'application/json, text/event-stream', 'content-type': 'application/json' }, body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'initialize', params: { protocolVersion: '2025-03-26', capabilities: {}, clientInfo: { name: 'bad-host', version: '1' } } }) });
      assert.equal(rejected.status, 400);
      assert.match(await rejected.text(), /INVALID_HOST/);
    } finally {
      if (previousAllowedHosts === undefined) delete process.env.MCP_ALLOWED_HOSTS;
      else process.env.MCP_ALLOWED_HOSTS = previousAllowedHosts;
    }
  } finally {
    await client.close();
    await new Promise<void>((resolve, reject) => httpServer.close(error => error ? reject(error) : resolve()));
  }
});
