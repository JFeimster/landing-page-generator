import type { ParsedHtml } from './htmlParser.js';
import type { Finding } from '../types.js';
export function accessibilityChecks(page: ParsedHtml): Finding[] {
  const findings: Finding[] = [];
  if (!page.tags('html')[0]?.attribs.lang) findings.push({ code: 'lang', severity: 'warning', message: 'Set the document language.' });
  if (page.tags('h1').length !== 1) findings.push({ code: 'h1', severity: 'warning', message: 'Use one descriptive primary heading.' });
  for (const node of page.tags('img')) if (!('alt' in node.attribs)) findings.push({ code: 'image-alt', severity: 'error', message: 'Image has no alt attribute.', location: String(node.startIndex) });
  const labels = page.tags('label');
  const ids = new Map(page.elements.filter(n => n.attribs.id).map(n => [n.attribs.id, n]));
  for (const node of page.elements.filter(n => ['input', 'select', 'textarea'].includes(n.name))) {
    if (['hidden', 'submit', 'button', 'reset', 'image'].includes(node.attribs.type ?? '')) continue;
    let parent = node.parent;
    let wrapped = false;
    while (parent) { if ('name' in parent && parent.name === 'label') wrapped = true; parent = parent.parent; }
    const labelled = node.attribs['aria-labelledby']?.split(/\s+/).every(id => ids.has(id) && page.content(ids.get(id)!).trim());
    if (!node.attribs['aria-label'] && !labelled && !wrapped && !labels.some(l => l.attribs.for === node.attribs.id && node.attribs.id)) findings.push({ code: 'form-label', severity: 'error', message: 'Form control needs a label.', location: String(node.startIndex) });
  }
  return findings;
}
