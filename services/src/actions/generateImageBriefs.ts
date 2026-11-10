import { schemas } from '../schemas.js';
import { assetTypes } from '../data/assetTypes.js';
export function generateImageBriefs(input: unknown) {
  const { landing_page_notes, asset_types = ['hero', 'process', 'social'] } = schemas.generateImageBriefs.parse(input);
  return { context: landing_page_notes, briefs: asset_types.map(id => ({ id, ...assetTypes[id], filename: id + '.' + assetTypes[id].format, placeholder: '[Insert approved ' + id + ' asset]', alt_guidance: 'Describe meaningful content once supplied; use empty alt only for decoration.' })) };
}
