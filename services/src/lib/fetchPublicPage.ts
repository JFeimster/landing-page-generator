import { lookup } from 'node:dns/promises';
import { request as httpRequest } from 'node:http';
import { request as httpsRequest } from 'node:https';
import { isIP } from 'node:net';
import ipaddr from 'ipaddr.js';
import { ActionError } from './responseHelpers.js';

type Address = { address: string; family: number };
export type Resolver = (hostname: string) => Promise<Address[]>;
export function isPublicAddress(value: string): boolean {
  try { return ipaddr.process(value).range() === 'unicast'; } catch { return false; }
}
export async function resolvePublicUrl(raw: string, resolver: Resolver = host => lookup(host, { all: true })): Promise<{ url: URL; address: Address }> {
  let url: URL;
  try { url = new URL(raw); } catch { throw new ActionError('INVALID_URL', 'Use an absolute public HTTP or HTTPS URL.'); }
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || (url.port && url.port !== (url.protocol === 'https:' ? '443' : '80'))) throw new ActionError('BLOCKED_URL', 'Only public HTTP(S) URLs on standard ports without credentials are allowed.');
  const hostname = url.hostname.replace(/^\[|\]$/g, '');
  const addresses = isIP(hostname) ? [{ address: hostname, family: isIP(hostname) }] : await resolver(hostname);
  if (!addresses.length || addresses.some(a => !isPublicAddress(a.address))) throw new ActionError('BLOCKED_URL', 'The URL must resolve exclusively to public addresses.');
  url.hash = '';
  return { url, address: addresses[0] };
}
export type PageResponse = { status: number; headers: Record<string, string | undefined>; body: string };
export type Transport = (url: URL, address: Address, signal: AbortSignal) => Promise<PageResponse>;
const maxBytes = 1024 * 1024;
export const requestPage: Transport = (url, address, signal) => new Promise((resolve, reject) => {
  // Connect only to the validated address while preserving Host and TLS SNI.
  const request = (url.protocol === 'https:' ? httpsRequest : httpRequest)(url, {
    agent: false, signal,
    lookup: (_hostname, options, callback) => {
      if (options.all) callback(null, [address]);
      else callback(null, address.address, address.family);
    },
    headers: { 'User-Agent': 'LandingPageGenerator/1.0', Accept: 'text/html', 'Accept-Encoding': 'identity' },
  }, response => {
    const headers = Object.fromEntries(Object.entries(response.headers).map(([key, value]) => [key, Array.isArray(value) ? value.join(', ') : value]));
    const status = response.statusCode ?? 502;
    if ([301, 302, 303, 307, 308].includes(status)) {
      response.destroy();
      resolve({ status, headers, body: '' });
      return;
    }
    if (status < 200 || status >= 300) { response.destroy(); reject(new ActionError('UPSTREAM_STATUS', 'The public page did not return a successful response.', 502)); return; }
    if (!/^text\/html\b/i.test(headers['content-type'] ?? '') || (headers['content-encoding'] && headers['content-encoding'] !== 'identity')) {
      response.destroy(); reject(new ActionError('UNSUPPORTED_CONTENT', 'Only uncompressed HTML responses are supported.', 422)); return;
    }
    if (Number(headers['content-length']) > maxBytes) { response.destroy(); reject(new ActionError('PAGE_TOO_LARGE', 'The public page exceeds the 1 MB limit.', 422)); return; }
    const chunks: Buffer[] = [];
    let bytes = 0;
    response.on('data', (chunk: Buffer) => {
      bytes += chunk.length;
      if (bytes > maxBytes) { response.destroy(); reject(new ActionError('PAGE_TOO_LARGE', 'The public page exceeds the 1 MB limit.', 422)); }
      else chunks.push(chunk);
    });
    response.on('end', () => resolve({ status, headers, body: Buffer.concat(chunks).toString('utf8') }));
    response.on('error', reject);
    response.on('aborted', () => reject(new ActionError('UPSTREAM_ABORTED', 'The public page response was interrupted.', 502)));
  });
  request.on('error', reject);
  request.end();
});
export async function fetchPublicPage(raw: string, deps: { resolver?: Resolver; transport?: Transport; timeoutMs?: number } = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), deps.timeoutMs ?? 8000);
  let rejectDeadline: (error: Error) => void = () => {};
  const deadline = new Promise<never>((_resolve, reject) => { rejectDeadline = reject; });
  const onAbort = () => rejectDeadline(new ActionError('FETCH_TIMEOUT', 'The page could not be fetched within the time limit.', 504));
  controller.signal.addEventListener('abort', onAbort, { once: true });
  try {
    let current = raw;
    for (let redirect = 0; redirect <= 3; redirect++) {
      const { url, address } = await Promise.race([resolvePublicUrl(current, deps.resolver), deadline]);
      const response = await Promise.race([(deps.transport ?? requestPage)(url, address, controller.signal), deadline]);
      if ([301, 302, 303, 307, 308].includes(response.status)) {
        if (!response.headers.location || redirect === 3) throw new ActionError('REDIRECT_LIMIT', 'Too many redirects or missing redirect destination.', 422);
        current = new URL(response.headers.location, url).href;
        continue;
      }
      return { url: url.href, html: response.body, fetched_at: new Date().toISOString() };
    }
    throw new ActionError('REDIRECT_LIMIT', 'Redirect limit reached.', 422);
  } catch (error) {
    if (error instanceof ActionError) throw error;
    if (controller.signal.aborted) throw new ActionError('FETCH_TIMEOUT', 'The page fetch timed out.', 504);
    throw new ActionError('FETCH_FAILED', 'The public page could not be fetched.', 502);
  } finally {
    clearTimeout(timeout);
    controller.signal.removeEventListener('abort', onAbort);
  }
}
