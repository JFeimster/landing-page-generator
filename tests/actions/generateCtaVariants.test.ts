import test from 'node:test';
import assert from 'node:assert/strict';
import { generateCtaVariants } from '../../services/src/actions/generateCtaVariants.js';
test('CTA goals have distinct actions and no fabricated urgency',()=>{
 const r=generateCtaVariants({offer:'Service',audience:'Teams',goal:'waitlist'});
 assert.ok(r.variants.some(v=>/waitlist/.test(v.label)));
 assert.ok(!JSON.stringify(r.variants).match(/free trial|only|expires/i));
 assert.throws(()=>generateCtaVariants({offer:'Service',audience:'Teams',goal:'invalid'}));
});
