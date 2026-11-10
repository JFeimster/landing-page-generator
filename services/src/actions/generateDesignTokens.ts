import { schemas } from '../schemas.js';
import { colorContrast } from '../lib/colorContrast.js';
const palettes = {
  'conversion-clean': { background: '#faf9f5', text: '#202a27', accent: '#176147', radius: '8px', heading: 'Georgia, serif' },
  'editorial-premium': { background: '#f6f1e7', text: '#30291f', accent: '#79502b', radius: '0px', heading: 'Georgia, serif' },
  'industrial-bold': { background: '#fff9ed', text: '#171717', accent: '#c6451c', radius: '0px', heading: "'Arial Narrow', sans-serif" },
  'product-bento': { background: '#f4f8f7', text: '#17352e', accent: '#146652', radius: '16px', heading: "'Trebuchet MS', sans-serif" },
  'mission-control': { background: '#15232a', text: '#f2f6f7', accent: '#68d9bf', radius: '4px', heading: "'Trebuchet MS', sans-serif" },
  'playful-launch': { background: '#fff6e1', text: '#302615', accent: '#b04724', radius: '24px', heading: "Georgia, serif" },
};
export function generateDesignTokens(input: unknown) {
  const { brand_notes, accent, style = 'conversion-clean' } = schemas.generateDesignTokens.parse(input);
  const p = { ...palettes[style], ...(accent ? { accent } : {}) };
  const on_accent = colorContrast(p.accent, '#ffffff') >= colorContrast(p.accent, '#000000') ? '#ffffff' : '#000000';
  return { brand_notes, style, colors: { background: p.background, text: p.text, accent: p.accent, on_accent }, typography: { heading_font: p.heading, body_font: "'Trebuchet MS', sans-serif" }, spacing: ['4px','8px','16px','24px','48px','80px'], radius: p.radius, contrast: { text: colorContrast(p.background, p.text), button: colorContrast(p.accent, on_accent) }, note: 'Validate actual rendered states, images and user-customized colors before publishing.' };
}
