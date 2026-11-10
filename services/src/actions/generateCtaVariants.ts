import { schemas } from '../schemas.js';
import { ctaPatterns } from '../data/ctaPatterns.js';
export function generateCtaVariants(input: unknown) {
  const { offer, audience, tone = 'friendly', goal = 'learn' } = schemas.generateCtaVariants.parse(input);
  const support = tone === 'premium' ? 'Review the details at your pace.' : tone === 'technical' ? 'Review scope and requirements before proceeding.' : tone === 'bold' ? 'Take the next step when you are ready.' : 'See what happens next before you decide.';
  return { offer, audience, goal, tone, variants: ctaPatterns[goal].map(label => ({ label, support })), implementation_note: 'Connect each label to the matching real destination; no deadline, trial or availability is implied.' };
}
