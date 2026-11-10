import test from 'node:test';
import assert from 'node:assert/strict';
import { buildOfferStack } from '../../services/src/actions/buildOfferStack.js';
test('does not invent prices, bonuses or guarantees',()=>{
 const r=buildOfferStack({offer_notes:'Website review'});
 assert.match(r.price,/Insert approved/);assert.equal(r.guarantee,null);assert.deepEqual(r.bonuses,[]);
});
test('preserves supplied commercial terms',()=>{
 const r=buildOfferStack({offer_notes:'Review',price:'[Approved fee]',guarantee:'[Approved policy]',deliverables:['Written report']});
 assert.equal(r.price,'[Approved fee]');assert.equal(r.guarantee,'[Approved policy]');assert.deepEqual(r.missing,[]);
});
