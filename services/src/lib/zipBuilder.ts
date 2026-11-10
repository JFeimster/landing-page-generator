import { zipSync, strToU8 } from 'fflate';
export function zipBuilder(files: Record<string, string>): Buffer {
  const archive: Record<string, [Uint8Array, { mtime: Date }]> = {};
  for (const [name, content] of Object.entries(files)) {
    if (!/^[a-zA-Z0-9_./-]+$/.test(name) || name.startsWith('/') || name.split('/').some(p => p === '..' || p === '.' || !p)) throw new Error('Unsafe archive path.');
    archive[name] = [strToU8(content), { mtime: new Date('2000-01-01T00:00:00Z') }];
  }
  return Buffer.from(zipSync(archive, { level: 6 }));
}
