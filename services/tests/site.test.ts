import test from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../src/app.js';

test('public companion website renders the expected navigable HTML pages', async () => {
  const server = createApp().listen(0, '127.0.0.1');
  await new Promise<void>(resolve => server.once('listening', resolve));
  const address = server.address();
  assert.ok(address && typeof address !== 'string');
  const url = `http://127.0.0.1:${address.port}`;
  try {
    for (const [path, expected] of [
      ['/', 'Better pages.'],
      ['/tools', 'Run utility'],
      ['/factory', 'Build the factory, not a mockup.'],
    ]) {
      const response = await fetch(url + path);
      assert.equal(response.status, 200, path);
      assert.match(response.headers.get('content-type') ?? '', /text\/html/, path);
      const html = await response.text();
      assert.match(html, new RegExp(expected.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), path);
      assert.match(html, /href="\/tools"/, path);
    }
    const health = await fetch(url + '/health');
    assert.equal(health.status, 200);
    assert.deepEqual(await health.json(), { ok: true });
    const post = await fetch(url + '/score-copy', {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ copy: 'Book a discovery call to improve your landing page.' }),
    });
    assert.equal(post.status, 200);
    assert.equal((await post.json()).status, 'ok');
    const invalid = await fetch(url + '/this-route-does-not-exist');
    assert.equal(invalid.status, 404);
  } finally {
    await new Promise<void>((resolve, reject) => server.close(err => err ? reject(err) : resolve()));
  }
});
