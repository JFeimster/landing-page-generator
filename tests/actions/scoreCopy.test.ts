import test from 'node:test';
import assert from 'node:assert/strict';
import { scoreCopy } from '../../services/src/actions/scoreCopy.js';
test('returns bounded explainable score without requiring fake urgency',()=>{
 const r=scoreCopy({copy:'# Review your page\nClear feedback for your offer.\n## Questions\nHow does it work?\nRequest details.'});
 assert.equal(r.score,100);assert.equal(r.max_score,100);assert.equal(r.criteria.length,5);
 const risky=scoreCopy({copy:'Guaranteed results. Buy now.'});assert.ok(risky.score<100);
});
