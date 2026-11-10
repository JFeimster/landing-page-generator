import { schemas } from '../schemas.js';
import { sectionDefinitions } from '../data/sectionDefinitions.js';
export function mapInputToSections(input: unknown) {
  const { raw_notes, fields = {} } = schemas.mapInputToSections.parse(input);
  const values = fields as Record<string, string | string[]>;
  return { raw_notes, sections: sectionDefinitions.map(section => ({ id: section.id, inputs: Object.fromEntries(section.needs.map(key => [key, values[key] ?? '[Insert approved ' + key + ']'])), missing: section.needs.filter(key => !values[key] || Array.isArray(values[key]) && !values[key].length) })), limitations: ['Raw notes are retained for human review; structured fields are not inferred as facts.'] };
}
