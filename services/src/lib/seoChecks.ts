import type { ParsedHtml } from './htmlParser.js';
import type { Finding } from '../types.js';
export function seoChecks(page: ParsedHtml): Finding[] {
  const checks: [string, boolean, string][] = [
    ['title', !!page.tags('title').some(n => page.content(n).trim()), 'Add a descriptive title.'],
    ['description', !!page.meta('description'), 'Add a meta description.'],
    ['viewport', !!page.meta('viewport'), 'Add responsive viewport metadata.'],
    ['canonical', page.tags('link').some(n => n.attribs.rel === 'canonical' && /^https?:\/\//.test(n.attribs.href ?? '')), 'Set a real canonical URL before publishing.'],
    ['open-graph', !!page.meta('og:title') && !!page.meta('og:description') && !!page.meta('og:image'), 'Complete Open Graph metadata.'],
  ];
  return checks.filter(([, pass]) => !pass).map(([code, , message]) => ({ code, severity: 'warning', message }));
}
