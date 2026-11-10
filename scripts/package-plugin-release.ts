import { readFileSync, readdirSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve, relative, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const require = createRequire(join(root, 'services/package.json'));
const { zipSync, strToU8 } = require('fflate') as typeof import('fflate');
const { parse } = require('yaml') as typeof import('yaml');
const plugin = join(root, 'plugin/landing-page-generator');
const manifest = JSON.parse(readFileSync(join(plugin, 'plugin.json'), 'utf8'));
const expectedPrompts = ['Build a landing page for my SaaS offer', 'Use this URL to extract my landing page angle', 'Write the full landing page copy first'];
if (manifest.name !== 'gpt-7ae4dc668705b6719ce1d8e858f4facd' || manifest.version !== '0.12.0') throw new Error('Unexpected plugin identity or version.');
const ui = manifest.extensions?.['com.openai']?.interface;
if (!ui || JSON.stringify(ui.defaultPrompt) !== JSON.stringify(expectedPrompts)) throw new Error('Plugin presentation or ordered starter prompts changed.');
if (manifest.$schema !== 'https://agent-plugins.org/schemas/1.0.0/plugin.schema.json' || !/^[a-z0-9](?:[a-z0-9.-]{0,62}[a-z0-9])?$/.test(manifest.name) || !manifest.description?.trim() || !manifest.author?.name?.trim() || !/^\d+\.\d+\.\d+$/.test(manifest.version)) throw new Error('Canonical plugin manifest metadata is invalid.');
if (typeof ui.shortDescription !== 'string' || ui.shortDescription.length > 30 || !Array.isArray(ui.capabilities) || !ui.capabilities.every((v: unknown) => typeof v === 'string' && v.trim())) throw new Error('Plugin interface metadata is invalid.');
for (const key of ['displayName','shortDescription','longDescription','developerName','category','logo','composerIcon']) if (typeof ui[key] !== 'string' || !ui[key].trim()) throw new Error(`Missing plugin interface field: ${key}`);
for (const key of ['logo','composerIcon']) {
  const asset = resolve(plugin, ui[key]);
  const assetRelative = relative(plugin, asset);
  if (!assetRelative || assetRelative.startsWith('..') || !readFileSync(asset).byteLength) throw new Error(`Missing or invalid plugin icon: ${ui[key]}`);
}
if (!Array.isArray(ui.defaultPrompt) || ui.defaultPrompt.length < 1 || ui.defaultPrompt.length > 3 || !ui.defaultPrompt.every((v: unknown) => typeof v === 'string' && v.trim())) throw new Error('Plugin defaultPrompt must contain one to three strings.');

const skillFiles = readdirSync(join(plugin, 'skills/instructions/references')).filter(n => n.endsWith('.md'));
if (skillFiles.length !== 19) throw new Error(`Expected 19 knowledge references; found ${skillFiles.length}.`);
const skillPath = join(plugin, 'skills/instructions/SKILL.md');
const skill = readFileSync(skillPath, 'utf8');
const frontmatter = skill.match(/^---\r?\n([\s\S]*?)\r?\n---/);
if (!frontmatter) throw new Error('Skill frontmatter is missing.');
const skillMeta = parse(frontmatter[1]);
if (skillMeta.name !== 'instructions' || typeof skillMeta.description !== 'string' || !skillMeta.description.trim()) throw new Error('Skill frontmatter is invalid.');
const knowledgeIndex = JSON.parse(readFileSync(join(plugin, 'skills/instructions/lookup/knowledge-index.json'), 'utf8'));
if (!Array.isArray(knowledgeIndex.files) || knowledgeIndex.files.length !== 19) throw new Error('Skill lookup index must preserve all 19 references.');
for (const entry of knowledgeIndex.files) {
  if (typeof entry.path !== 'string' || !entry.path.startsWith('references/') || !readFileSync(join(plugin, 'skills/instructions', entry.path), 'utf8')) throw new Error(`Invalid or missing indexed reference: ${entry.path}`);
}
for (const match of skill.matchAll(/`((?:lookup|references)\/[a-z0-9-]+\.(?:md|json))`/g)) {
  if (!readFileSync(join(plugin, 'skills/instructions', match[1]), 'utf8')) throw new Error(`Empty or missing skill reference: ${match[1]}`);
}

const serverUrl = process.env.MCP_SERVER_URL;
const authType = process.env.MCP_AUTH_TYPE;
if (!serverUrl || !authType) throw new Error('Release packaging requires verified MCP_SERVER_URL and MCP_AUTH_TYPE values; unresolved connection templates are not packaged.');
const endpoint = new URL(serverUrl);
if (endpoint.protocol !== 'https:' || endpoint.username || endpoint.password || endpoint.hash || !endpoint.pathname.endsWith('/mcp')) throw new Error('MCP_SERVER_URL must be a verified HTTPS /mcp URL without credentials or fragment.');
const allowedHosts = (process.env.MCP_ALLOWED_HOSTS ?? '').split(',').map(host => host.trim().toLowerCase()).filter(Boolean);
if (!allowedHosts.includes(endpoint.host.toLowerCase()) && !allowedHosts.includes(endpoint.hostname.toLowerCase())) throw new Error('MCP_ALLOWED_HOSTS must include the verified MCP endpoint host configured in the service.');
if (!['none', 'oauth', 'mixed', 'api_key'].includes(authType)) throw new Error('MCP_AUTH_TYPE must be a verified supported auth type.');
const authConfig = process.env.MCP_AUTH_CONFIG ? JSON.parse(process.env.MCP_AUTH_CONFIG) : undefined;
if (authType !== 'none' && !authConfig) throw new Error('MCP_AUTH_CONFIG is required for configured authentication; never package credentials.');
const containsSecretField = (value: unknown): boolean => Array.isArray(value) ? value.some(containsSecretField) : typeof value === 'object' && value !== null ? Object.entries(value).some(([key, child]) => /secret|token|api.?key|credential/i.test(key) || containsSecretField(child)) : false;
if (authConfig && (typeof authConfig !== 'object' || Array.isArray(authConfig) || containsSecretField(authConfig))) throw new Error('MCP_AUTH_CONFIG must be an object without credentials or secret material.');
const auth = authType === 'none' ? { type: authType } : { ...authConfig, type: authType };
const mcp = { $schema: 'https://agent-plugins.org/schemas/1.0.0/mcp.schema.json', mcpServers: { 'landing-page-generator': { type: 'streamable-http', url: endpoint.toString(), extensions: { 'com.openai': { auth } } } } };

const walk = (dir: string): string[] => readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)]);
const archive: Record<string, Uint8Array> = {};
for (const path of walk(plugin)) {
  if (path.endsWith('mcp.json.template')) continue;
  const name = relative(plugin, path).replaceAll('\\', '/');
  if (name.startsWith('.') && !name.startsWith('.codex-plugin/')) continue;
  const bytes = new Uint8Array(readFileSync(path));
  archive[name] = bytes;
}
archive['mcp.json'] = strToU8(JSON.stringify(mcp, null, 2) + '\n');
const compatibility = join(plugin, '.codex-plugin/plugin.json');
try {
  const compat = JSON.parse(readFileSync(compatibility, 'utf8'));
  const legacyUi = compat.interface;
  const presentationMatches = ['displayName','shortDescription','longDescription','developerName','category','logo','composerIcon'].every(key => legacyUi?.[key] === ui[key]);
  if (compat.name !== manifest.name || compat.version !== manifest.version || !presentationMatches || JSON.stringify(legacyUi?.defaultPrompt) !== JSON.stringify(ui.defaultPrompt)) throw new Error('Compatibility manifest identity, version, or presentation differs from portable manifest.');
} catch (error) {
  if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
}
const outDir = join(root, 'dist');
mkdirSync(outDir, { recursive: true });
const target = join(outDir, `landing-page-generator-plugin-${manifest.version}.zip`);
writeFileSync(target, zipSync(archive, { level: 6, mtime: new Date('2000-01-01T00:00:00Z') }));
console.log(`Created plugin-root ZIP: ${target}`);
