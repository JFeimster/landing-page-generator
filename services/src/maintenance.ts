import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, relative, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { stringify, parse } from 'yaml';
import { Ajv } from 'ajv';
import { Ajv2020 } from 'ajv/dist/2020.js';
import { createRequire } from 'node:module';
const addFormats = createRequire(import.meta.url)('ajv-formats') as (ajv: Ajv | Ajv2020) => void;
import { actions } from './registry.js';
import { buildOpenApi } from './openapi.js';
import { zipBuilder } from './lib/zipBuilder.js';
export const root = resolve(fileURLToPath(new URL('../../', import.meta.url)));
export function filesUnder(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? filesUnder(join(directory,entry.name)) : [join(directory,entry.name)]);
}
export function generateSchemas() {
  const server = process.env.ACTION_SERVER_URL ?? 'https://example.com';
  writeFileSync(join(root,'actions/landing-page-generator-actions.openapi.yaml'), stringify(buildOpenApi(server)));
  for (const action of actions) writeFileSync(join(root,'actions/schemas',action.schemaFile+'.openapi.yaml'), stringify(buildOpenApi(server,action.id)));
  console.log('Generated combined and 12 per-action contracts.');
}
export function validateOpenApi() {
  const ajv = new Ajv2020({ strict: false, allErrors: true });
  addFormats(ajv);
  for (const path of [join(root,'actions/landing-page-generator-actions.openapi.yaml'), ...filesUnder(join(root,'actions/schemas'))]) {
    const document = parse(readFileSync(path,'utf8'));
    if (document.openapi !== '3.1.0' || !Object.keys(document.paths ?? {}).length) throw new Error('Empty or unsupported contract: '+path);
    const expected = buildOpenApi(document.servers[0].url, path.includes('schemas') ? actions.find(a => path.endsWith(a.schemaFile+'.openapi.yaml'))!.id : undefined);
    if (JSON.stringify(document) !== JSON.stringify(expected)) throw new Error('Contract differs from source; run npm run schemas: '+path);
    for (const item of Object.values(document.paths) as any[]) {
      ajv.compile(item.post.requestBody.content['application/json'].schema);
      for (const response of Object.values(item.post.responses) as any[]) ajv.compile(response.content['application/json'].schema);
    }
  }
  console.log('All 13 Action contracts match runtime request schemas and compile as JSON Schema.');
}
export function validateJsonData() {
  const dirs = ['data','tests/fixtures','site-factory','plugin/landing-page-generator'];
  for (const dir of dirs) for (const path of filesUnder(join(root,dir)).filter(p => p.endsWith('.json'))) JSON.parse(readFileSync(path,'utf8'));
  const ajv = new Ajv({ strict: false, allErrors: true }); addFormats(ajv);
  const sf = join(root,'site-factory');
  const schemas = Object.fromEntries(filesUnder(join(sf,'schemas')).map(path => [path.split(/[\\/]/).pop()!, JSON.parse(readFileSync(path,'utf8'))]));
  for (const [name,schema] of Object.entries(schemas)) {
    const validate = ajv.compile(schema);
    for (const example of schema.examples ?? []) if (!validate(example)) throw new Error(name+': '+JSON.stringify(validate.errors));
  }
  const validate = ajv.compile<any>(schemas['project-brief.schema.json']);
  const catalogs = Object.fromEntries(filesUnder(join(sf,'catalogs')).map(path => [path.split(/[\\/]/).pop()!.replace('.json',''), JSON.parse(readFileSync(path,'utf8')).items]));
  const has = (catalog: string,id: string) => catalogs[catalog].some((item: any) => item.id === id);
  const check = (condition: boolean, message: string) => { if (!condition) throw new Error(message); };
  for (const [name,items] of Object.entries(catalogs) as [string,any[]][]) check(new Set(items.map(i=>i.id)).size===items.length, 'Duplicate catalog ID: '+name);
  for (const style of catalogs['design-styles']) for (const [key,cat] of [['layout','layout-systems'],['motion','motion-profiles'],['component','component-library']]) check(has(cat,style[key]),'Invalid style reference: '+style.id);
  for (const item of catalogs['industries']) for (const id of item.objections) check(has('objections',id),'Invalid objection '+id);
  for (const capability of catalogs['capabilities']) for (const id of capability.requires) check(has('capabilities',id),'Invalid dependency '+id);
  for (const path of filesUnder(join(sf,'examples')).filter(p=>p.endsWith('.json'))) {
    const brief = JSON.parse(readFileSync(path,'utf8'));
    if (!validate(brief)) throw new Error(path+': '+JSON.stringify(validate.errors));
    const type = catalogs['project-types'].find((t: any)=>t.id===brief.project_type);
    check(type.templates.includes(brief.template),'Incompatible template: '+path);
    for (const id of brief.capabilities) for (const dep of catalogs.capabilities.find((c: any)=>c.id===id).requires) check(brief.capabilities.includes(dep),'Missing dependency: '+dep);
  }
  for (const type of catalogs['project-types']) for (const id of type.templates) check(existsSync(join(sf,'templates',id+'.md')),'Missing template specification: '+id);
  const validateAction = ajv.compile<any>(schemas['action-manifest.schema.json']);
  for (const action of catalogs['action-capabilities']) {
    if (!validateAction(action)) throw new Error('Invalid action manifest: '+JSON.stringify(validateAction.errors));
    check(existsSync(join(sf,action.guide)),'Missing action guide.');
  }
  check(filesUnder(join(root,'knowledge')).filter(p=>p.endsWith('.md')).length===19,'Expected 19 knowledge files.');
  console.log('JSON data, factory examples, schemas, catalog IDs and references pass.');
}
export function packageRelease() {
  const files: Record<string,string> = {};
  for (const dir of ['gpt','knowledge','data','actions','docs','site-factory']) {
    for (const path of filesUnder(join(root,dir))) files[relative(root,path).replaceAll('\\','/')] = readFileSync(path,'utf8');
  }
  files['README.md'] = readFileSync(join(root,'README.md'),'utf8');
  mkdirSync(join(root,'dist'),{recursive:true});
  const target=join(root,'dist/landing-page-generator.zip');
  writeFileSync(target,zipBuilder(files));
  console.log('Created '+target);
}
