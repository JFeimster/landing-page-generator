import { schemas } from './schemas.js';
import { analyzeUrl } from './actions/analyzeUrl.js';
import { auditHtml } from './actions/auditHtml.js';
import { scoreCopy } from './actions/scoreCopy.js';
import { validateProof } from './actions/validateProof.js';
import { buildOfferStack } from './actions/buildOfferStack.js';
import { generateFaqs } from './actions/generateFaqs.js';
import { generateCtaVariants } from './actions/generateCtaVariants.js';
import { generateDesignTokens } from './actions/generateDesignTokens.js';
import { generateImageBriefs } from './actions/generateImageBriefs.js';
import { mapInputToSections } from './actions/mapInputToSections.js';
import { packageLandingPage } from './actions/packageLandingPage.js';
import { compareCompetitors } from './actions/compareCompetitors.js';

export const actions = [
  { id: 'analyzeUrl', path: '/analyze-url', schemaFile: 'url-analyzer', summary: 'Extract observed positioning signals from public static HTML.', input: schemas.analyzeUrl, run: analyzeUrl },
  { id: 'auditHtml', path: '/audit-html', schemaFile: 'html-auditor', summary: 'Check HTML structure, metadata, labels and CTA destinations.', input: schemas.auditHtml, run: auditHtml },
  { id: 'scoreCopy', path: '/score-copy', schemaFile: 'copy-scorecard', summary: 'Score deterministic writing signals, not predicted conversions.', input: schemas.scoreCopy, run: scoreCopy },
  { id: 'validateProof', path: '/validate-proof', schemaFile: 'proof-validator', summary: 'Flag claims needing evidence; cannot establish truth.', input: schemas.validateProof, run: validateProof },
  { id: 'buildOfferStack', path: '/build-offer-stack', schemaFile: 'offer-stack-builder', summary: 'Organize supplied offer details without inventing prices or terms.', input: schemas.buildOfferStack, run: buildOfferStack },
  { id: 'generateFaqs', path: '/generate-faqs', schemaFile: 'faq-generator', summary: 'Draft FAQ questions with supplied answers or missing-information labels.', input: schemas.generateFaqs, run: generateFaqs },
  { id: 'generateCtaVariants', path: '/generate-cta-variants', schemaFile: 'cta-generator', summary: 'Generate action labels for the selected goal and tone.', input: schemas.generateCtaVariants, run: generateCtaVariants },
  { id: 'generateDesignTokens', path: '/generate-design-tokens', schemaFile: 'design-token-generator', summary: 'Select a palette and calculate solid-color contrast.', input: schemas.generateDesignTokens, run: generateDesignTokens },
  { id: 'generateImageBriefs', path: '/generate-image-briefs', schemaFile: 'image-brief-generator', summary: 'Build specific asset handoff briefs.', input: schemas.generateImageBriefs, run: generateImageBriefs },
  { id: 'mapInputToSections', path: '/map-input-to-sections', schemaFile: 'section-mapper', summary: 'Map approved structured fields to page sections.', input: schemas.mapInputToSections, run: mapInputToSections },
  { id: 'packageLandingPage', path: '/package-landing-page', schemaFile: 'export-packager', summary: 'Return a base64 ZIP with HTML, optional copy and audit report.', input: schemas.packageLandingPage, run: packageLandingPage },
  { id: 'compareCompetitors', path: '/compare-competitors', schemaFile: 'competitor-comparison', summary: 'Compare observations from up to three public URLs.', input: schemas.compareCompetitors, run: compareCompetitors },
] as const;
