import { schemas } from '../schemas.js';
import { objectionMap } from '../data/objectionMap.js';
export function generateFaqs(input: unknown) {
  const { product_notes, objections = ['price', 'time', 'support', 'refund'], facts = {} } = schemas.generateFaqs.parse(input);
  return { product_notes, faqs: objections.map(objection => {
    const match = objectionMap.find(item => item.pattern.test(objection));
    return { objection, question: match?.question ?? 'What should I know about ' + objection.replace(/[?]+$/, '') + '?', answer: match ? facts[match.fact] ?? match.missing : '[Insert an approved answer addressing this objection]', needs_input: match ? !facts[match.fact] : true };
  }), limitations: ['Rule-based drafting; answers use supplied facts or explicit missing-information labels.'] };
}
