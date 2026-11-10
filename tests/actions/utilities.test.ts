import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { analyzeUrl } from '../../services/src/actions/analyzeUrl.js';
import { compareCompetitors } from '../../services/src/actions/compareCompetitors.js';
import { generateDesignTokens } from '../../services/src/actions/generateDesignTokens.js';
import { generateImageBriefs } from '../../services/src/actions/generateImageBriefs.js';
import { packageLandingPage } from '../../services/src/actions/packageLandingPage.js';
import { zipBuilder } from '../../services/src/lib/zipBuilder.js';
import { colorContrast } from '../../services/src/lib/colorContrast.js';
const { unzipSync,strFromU8 }=createRequire(new URL('../../services/package.json',import.meta.url))('fflate');
test('extracts actual static HTML and reports competitor failures separately',async()=>{
 const fetcher=async()=>({url:'https://example.com',html:'<title>Tools &amp; ideas</title><h1>Plan a launch</h1><a>Book a demo</a><script>hidden script</script>',fetched_at:'2026-11-10T00:00:00Z'});
 const r=await analyzeUrl({url:'https://example.com'},fetcher);
 assert.equal(r.observed.title,'Tools & ideas');assert.equal(r.observed.ctas[0],'Book a demo');assert.ok(!r.observed.text_excerpt.includes('hidden script'));
 const c=await compareCompetitors({urls:['https://example.com']},async()=>{throw new Error('unavailable')});
 assert.equal(c.competitors[0].status,'unavailable');
});
test('chooses readable foreground across light and dark accents',()=>{
 assert.equal(colorContrast('#ffffff','#000000'),21);
 for(const accent of ['#ffffff','#000000','#777777','#ff00ff']) {
  const r=generateDesignTokens({brand_notes:'Demo',accent});
  assert.ok(r.contrast.button>=4.5);assert.ok(r.contrast.text>=4.5);
 }
 assert.throws(()=>generateDesignTokens({brand_notes:'Demo',accent:'invalid'}));
});
test('image briefs retain approval requirements',()=>{
 const r=generateImageBriefs({landing_page_notes:'Service',asset_types:['founder','logo']});
 assert.equal(r.briefs.length,2);assert.match(r.briefs[1].approval,/permission/);
});
test('ZIP exports actual supplied HTML and rejects traversal',()=>{
 const html='<h1>My supplied page</h1>';
 const r=packageLandingPage({html,copy:'Draft',project_name:'demo'});
 const entries=unzipSync(Buffer.from(r.archive_base64,'base64'));
 assert.equal(strFromU8(entries['index.html']),html);
 assert.ok(entries['audit-report.json']);assert.equal(strFromU8(entries['copy.md']),'Draft');
 assert.throws(()=>zipBuilder({'../escape.txt':'bad'}),/Unsafe/);
 assert.throws(()=>packageLandingPage({html,project_name:'../bad'}));
});
