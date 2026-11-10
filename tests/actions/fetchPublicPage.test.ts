import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { once } from 'node:events';
import { resolvePublicUrl, fetchPublicPage, requestPage, isPublicAddress } from '../../services/src/lib/fetchPublicPage.js';
test('rejects local, mapped, obfuscated and reserved IPs and credential URLs',async()=>{
 for(const url of ['http://127.0.0.1','http://2130706433','http://0x7f000001','http://[::1]','http://[::ffff:127.0.0.1]','http://10.0.0.1','http://169.254.169.254','http://user:pass@example.com','ftp://example.com','http://example.com:3000']) await assert.rejects(resolvePublicUrl(url));
 assert.equal(isPublicAddress('8.8.8.8'),true);
 await assert.rejects(resolvePublicUrl('https://example.com',async()=>[{address:'8.8.8.8',family:4},{address:'127.0.0.1',family:4}]));
});
test('revalidates redirects before contacting another host',async()=>{
 let calls=0;
 await assert.rejects(fetchPublicPage('https://example.com',{resolver:async()=>[{address:'8.8.8.8',family:4}],transport:async()=>{calls++;return {status:302,headers:{location:'http://127.0.0.1'},body:''}}}), /public addresses/);
 assert.equal(calls,1);
});
test('bounds DNS duration and redirect loops',async()=>{
 await assert.rejects(fetchPublicPage('https://example.com',{timeoutMs:10,resolver:()=>new Promise(()=>{})}),/time limit/);
 let calls=0;
 await assert.rejects(fetchPublicPage('https://example.com',{resolver:async()=>[{address:'8.8.8.8',family:4}],transport:async()=>{calls++;return {status:302,headers:{location:'/again'},body:''}}}),/redirects/);
 assert.equal(calls,4);
});
test('transport pins DNS and limits content type and body size',async t=>{
 const server=createServer((req,res)=>{
  if(req.url==='/binary'){res.setHeader('Content-Type','application/octet-stream');res.end('data');return;}
  res.setHeader('Content-Type','text/html');
  res.end(req.url==='/large'?'x'.repeat(1048577):'<h1>Public response</h1>');
 });
 server.listen(0,'127.0.0.1');await once(server,'listening');t.after(()=>server.close());
 const port=(server.address() as any).port;
 const target=(path:string)=>new URL('http://example.com:'+port+path);
 const address={address:'127.0.0.1',family:4};
 const r=await requestPage(target('/'),address,AbortSignal.timeout(2000));
 assert.match(r.body,/Public response/);
 await assert.rejects(requestPage(target('/binary'),address,AbortSignal.timeout(2000)),/HTML/);
 await assert.rejects(requestPage(target('/large'),address,AbortSignal.timeout(2000)),/1 MB/);
});
