import { schemas } from '../schemas.js';
import { zipBuilder } from '../lib/zipBuilder.js';
import { auditHtml } from './auditHtml.js';
export function packageLandingPage(input: unknown) {
  const { html, copy, project_name = 'landing-page' } = schemas.packageLandingPage.parse(input);
  const audit = auditHtml({ html });
  const files: Record<string,string> = {
    'index.html': html,
    'README.md': '# ' + project_name + '\n\nReview audit-report.json and resolve content and integration fields before deployment.\nHTML is preserved as supplied. Packaging does not sanitize scripts or certify safety.\n',
    'audit-report.json': JSON.stringify(audit, null, 2) + '\n',
  };
  if (copy) files['copy.md'] = copy;
  const bytes = zipBuilder(files);
  return { filename: project_name + '.zip', mime_type: 'application/zip', encoding: 'base64', archive_base64: bytes.toString('base64'), size_bytes: bytes.length, files: Object.keys(files), audit };
}
