import { z } from 'zod';
const text = z.string().trim().min(1).max(30000);
const short = z.string().trim().min(1).max(500);
const list = z.array(short).max(30);
const html = z.string().min(1).max(300000);
const url = z.string().url().max(2048);
export const schemas = {
  analyzeUrl: z.object({ url }).strict(),
  compareCompetitors: z.object({ urls: z.array(url).min(1).max(3) }).strict(),
  auditHtml: z.object({ html }).strict(),
  scoreCopy: z.object({ copy: text }).strict(),
  validateProof: z.object({ copy: text, evidence: z.array(z.object({ claim: short, source: short }).strict()).max(30).optional() }).strict(),
  buildOfferStack: z.object({ offer_notes: text, deliverables: list.optional(), bonuses: list.optional(), price: short.optional(), guarantee: short.optional(), payment_options: list.optional() }).strict(),
  generateFaqs: z.object({ product_notes: text, objections: list.optional(), facts: z.object({ price: short.optional(), timeline: short.optional(), support: short.optional(), refund_policy: short.optional() }).strict().optional() }).strict(),
  generateCtaVariants: z.object({ offer: short, audience: short, tone: z.enum(['friendly', 'premium', 'bold', 'technical', 'calm']).optional(), goal: z.enum(['learn', 'book', 'buy', 'waitlist']).optional() }).strict(),
  generateDesignTokens: z.object({ brand_notes: text, accent: z.string().regex(/^#[0-9a-f]{6}$/i).optional(), style: z.enum(['conversion-clean', 'editorial-premium', 'industrial-bold', 'product-bento', 'mission-control', 'playful-launch']).optional() }).strict(),
  generateImageBriefs: z.object({ landing_page_notes: text, asset_types: z.array(z.enum(['hero', 'screenshot', 'founder', 'logo', 'process', 'social'])).min(1).max(6).optional() }).strict(),
  mapInputToSections: z.object({ raw_notes: text, fields: z.object({ offer: short.optional(), audience: short.optional(), problem: short.optional(), mechanism: short.optional(), features: list.optional(), proof: list.optional(), price: short.optional(), cta: short.optional() }).strict().optional() }).strict(),
  packageLandingPage: z.object({ html, copy: text.optional(), project_name: z.string().regex(/^[a-z0-9][a-z0-9-]{0,49}$/).optional() }).strict(),
};
export type ActionName = keyof typeof schemas;
