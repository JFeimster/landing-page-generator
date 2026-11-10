import test from 'node:test';
import assert from 'node:assert/strict';
import { validateProof } from '../../services/src/actions/validateProof.js';
test('flags unsupported metrics and guarantees without alleging fabrication', () => {
  const result = validateProof({copy:'Trusted by 10,000 customers.\nGuaranteed results.'});
  assert.ok(result.findings.some(f=>f.code==='numeric-outcome'));
  assert.ok(result.findings.every(f=>f.status==='needs-evidence'));
});
test('labels supplied evidence as unverified and skips drafting placeholders', () => {
  const claim='Trusted by 10,000 customers.';
  const result=validateProof({copy:claim+'\n[Insert verified 90% result]',evidence:[{claim,source:'[Customer report]'}]});
  assert.equal(result.findings.length,2);
  assert.ok(result.findings.every(f=>f.status==='user-supplied-unverified'));
  assert.equal(validateProof({copy:'[Insert verified customer count]'}).requires_review,false);
});
test('rejects empty input',()=>assert.throws(()=>validateProof({copy:''})));
