import { schemas } from '../schemas.js';
import { htmlParser } from '../lib/htmlParser.js';
import { seoChecks } from '../lib/seoChecks.js';
import { accessibilityChecks } from '../lib/accessibilityChecks.js';
import { conversionChecks } from '../lib/conversionChecks.js';
export function auditHtml(input: unknown) {
  const { html } = schemas.auditHtml.parse(input);
  const page = htmlParser(html);
  const findings = [...seoChecks(page), ...accessibilityChecks(page), ...conversionChecks(page)];
  const unresolved = [...new Set(html.match(/\[(?:Insert|Add|Enter|Choose|Approved|Real|No guarantee|FORM_|CANONICAL_|SOCIAL_)[^\]\r\n]*\]/gi) ?? [])];
  if (unresolved.length) findings.push({ code: 'unresolved-content', severity: 'warning', message: 'Resolve labeled content and configuration fields before launch.' });
  return { findings, unresolved, passed: findings.length === 0, limitations: ['Static checks only, not rendered contrast, full accessibility conformance, HTML validation or a security review.'] };
}
