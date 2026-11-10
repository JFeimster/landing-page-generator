import test from 'node:test';
import assert from 'node:assert/strict';
import { mapInputToSections } from '../../services/src/actions/mapInputToSections.js';
test('keeps ambiguous notes separate and maps only supplied structured facts',()=>{
 const r=mapInputToSections({raw_notes:'Maybe coaches or agencies',fields:{offer:'Page review',cta:'Request details'}});
 assert.equal(r.raw_notes,'Maybe coaches or agencies');
 assert.deepEqual(r.sections.find(s=>s.id==='hero')!.missing,['audience']);
 assert.deepEqual(r.sections.find(s=>s.id==='proof')!.missing,['proof']);
});
