import test from 'node:test';
import assert from 'node:assert/strict';
import { generateFaqs } from '../../services/src/actions/generateFaqs.js';
test('uses supplied facts and labels missing answers',()=>{
 const r=generateFaqs({product_notes:'Service',objections:['cost','refund','special fit'],facts:{price:'[Approved pricing]'}});
 assert.equal(r.faqs[0].answer,'[Approved pricing]');assert.equal(r.faqs[0].needs_input,false);
 assert.equal(r.faqs[1].needs_input,true);assert.match(r.faqs[2].answer,/Insert/);
});
