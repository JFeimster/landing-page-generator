import { schemas } from '../schemas.js';
import { claimDetection } from '../lib/claimDetection.js';
export function scoreCopy(input: unknown) {
  const { copy } = schemas.scoreCopy.parse(input);
  const words = copy.split(/\s+/).length;
  const sentences = Math.max(1, copy.split(/[.!?]+/).filter(s => s.trim()).length);
  const criteria = [
    { id: 'readability', score: words / sentences <= 25 ? 20 : 10, reason: 'Average sentence length; not a comprehension test.' },
    { id: 'structure', score: /(^|\n)#{1,3} |(^|\n)[-*] /m.test(copy) ? 20 : 5, reason: 'Headings or bullet structure help scanning.' },
    { id: 'cta', score: /\b(get|book|join|request|contact|start|buy|explore)\b/i.test(copy) ? 20 : 0, reason: 'Action verb presence; destination requires manual review.' },
    { id: 'objections', score: /faq|questions|what if|how (does|do|long)|who is/i.test(copy) ? 20 : 0, reason: 'Signals of objection handling.' },
    { id: 'claim-review', score: claimDetection(copy).length ? 0 : 20, reason: 'Unsupported-signal absence is not proof of truth.' },
  ];
  return { score: criteria.reduce((sum,c) => sum + c.score,0), max_score: 100, word_count: words, criteria, limitations: ['Deterministic writing signals, not a predicted conversion rate. Urgency is not required for a good score.'] };
}
