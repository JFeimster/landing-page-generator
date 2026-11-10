import { z } from 'zod';
import { actions } from './registry.js';
const errorSchema = { type: 'object', required: ['status','error'], properties: { status: { const: 'error' }, error: { type: 'object', required: ['code','message'], properties: { code: { type: 'string' }, message: { type: 'string' } } } } };
export function buildOpenApi(serverUrl = 'https://example.com', onlyId?: string) {
  const url = new URL(serverUrl);
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) throw new Error('ACTION_SERVER_URL must be HTTP(S) without credentials.');
  const paths: Record<string,unknown> = {};
  for (const action of actions.filter(a => !onlyId || a.id === onlyId)) {
    const requestSchema = z.toJSONSchema(action.input, { target: 'draft-2020-12', io: 'input' });
    delete requestSchema.$schema;
    paths[action.path] = { post: {
      operationId: action.id, summary: action.summary,
      requestBody: { required: true, content: { 'application/json': { schema: requestSchema } } },
      responses: {
        '200': { description: 'Result; fields are action-specific. No independent claim verification is implied.', content: { 'application/json': { schema: { type: 'object', required: ['status','data'], properties: { status: { const: 'ok' }, data: { type: 'object', additionalProperties: true } } } } } },
        ...Object.fromEntries([400,413,422,429,500,502,503,504].map(status => [String(status), { description: 'Structured error.', content: { 'application/json': { schema: errorSchema } } }])),
      },
    } };
  }
  return { openapi: '3.1.0', info: { title: 'Landing Page Generator Actions', version: '1.0.0', description: 'Deterministic no-auth utilities. Configure the server URL before importing.' }, servers: [{ url: serverUrl }], security: [], paths };
}
