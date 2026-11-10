import type { ParsedHtml } from './htmlParser.js';
import type { Finding } from '../types.js';
export function conversionChecks(page: ParsedHtml): Finding[] {
  const findings: Finding[] = [];
  const ids = new Set(page.elements.map(n => n.attribs.id).filter(Boolean));
  for (const link of page.tags('a')) {
    const href = link.attribs.href ?? '';
    if (href.startsWith('#') && !ids.has(href.slice(1))) findings.push({ code: 'broken-anchor', severity: 'error', message: 'Anchor target is missing: ' + href });
    if (!href || /^javascript:/i.test(href)) findings.push({ code: 'invalid-link', severity: 'error', message: 'Link needs a usable destination.' });
  }
  if (!page.tags('a').length && !page.tags('button').length) findings.push({ code: 'cta', severity: 'warning', message: 'No interactive next step was found.' });
  for (const form of page.tags('form')) if (!/^https?:\/\//.test(form.attribs.action ?? '') && !form.attribs.action?.startsWith('/')) findings.push({ code: 'form-destination', severity: 'warning', message: 'Configure and test a submission destination.' });
  return findings;
}
