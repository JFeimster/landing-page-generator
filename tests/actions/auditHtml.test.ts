import test from 'node:test';
import assert from 'node:assert/strict';
import { auditHtml } from '../../services/src/actions/auditHtml.js';
test('detects absent metadata, missing alt, unlabeled fields and broken anchors',()=>{
 const result=auditHtml({html:'<h1>Offer</h1><img src="photo.png"><input><a href="#missing">Start</a>'});
 for(const code of ['title','viewport','image-alt','form-label','broken-anchor']) assert.ok(result.findings.some(f=>f.code===code),code);
});
test('recognizes nested and explicit labels and ignores script text',()=>{
 const result=auditHtml({html:'<h1>Offer</h1><label>Name <input></label><label for="email">Email</label><input id="email"><script>var x="<img>";</script>'});
 assert.ok(!result.findings.some(f=>f.code==='form-label'||f.code==='image-alt'));
});
