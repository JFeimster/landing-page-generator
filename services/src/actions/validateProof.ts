import { schemas } from '../schemas.js';
import { claimDetection } from '../lib/claimDetection.js';
export function validateProof(input: unknown) {
  const { copy, evidence = [] } = schemas.validateProof.parse(input);
  const findings = claimDetection(copy).map(f => ({
    ...f,
    evidence: evidence.filter(e => e.claim.trim() === f.context),
    status: evidence.some(e => e.claim.trim() === f.context) ? 'user-supplied-unverified' : 'needs-evidence',
  }));
  return { findings, requires_review: findings.length > 0, limitations: ['Heuristic flagging cannot detect all fabricated claims or verify submitted evidence.', 'Evidence associations require the exact claim line; a source label is not independent verification.'] };
}
