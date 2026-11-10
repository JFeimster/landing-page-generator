import { schemas } from '../schemas.js';
import { pricingPsychology } from '../data/pricingPsychology.js';
export function buildOfferStack(input: unknown) {
  const data = schemas.buildOfferStack.parse(input);
  return { core_offer: data.offer_notes, deliverables: data.deliverables ?? [], bonuses: data.bonuses ?? [], price: data.price ?? pricingPsychology.missingPrice, guarantee: data.guarantee ?? null, payment_options: data.payment_options ?? [], missing: [!data.price && 'price', !data.deliverables?.length && 'deliverables'].filter(Boolean), guidance: pricingPsychology.rules, provenance: 'Supplied content is preserved, not independently verified.' };
}
