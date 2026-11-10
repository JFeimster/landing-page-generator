import test from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { createApp } from '../../services/src/app.js';
test('HTTP API validates JSON, rejects private URLs and applies rate limiting',async t=>{
 const server=createApp({limit:5,windowMs:60000}).listen(0,'127.0.0.1');await once(server,'listening');t.after(()=>server.close());
 const base='http://127.0.0.1:'+(server.address() as any).port;
 const send=(path:string,body:string)=>fetch(base+path,{method:'POST',headers:{'Content-Type':'application/json'},body});
 assert.equal((await fetch(base+'/health')).status,200);
 let r=await send('/audit-html',JSON.stringify({html:'<h1>Offer</h1>'}));assert.equal(r.status,200);assert.equal((await r.json()).status,'ok');
 r=await send('/audit-html',JSON.stringify({html:42}));assert.equal(r.status,400);
 r=await send('/audit-html','{');assert.equal(r.status,400);
 r=await send('/analyze-url',JSON.stringify({url:'http://127.0.0.1'}));assert.equal(r.status,400);
 r=await send('/audit-html',JSON.stringify({html:'x'.repeat(600000)}));assert.equal(r.status,413);
 r=await send('/audit-html',JSON.stringify({html:'x'}));assert.equal(r.status,429);assert.ok(r.headers.get('Retry-After'));
});
