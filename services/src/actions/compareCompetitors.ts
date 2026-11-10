import { schemas } from '../schemas.js';
import { analyzeUrl } from './analyzeUrl.js';
export async function compareCompetitors(input: unknown, analyzer = analyzeUrl) {
  const { urls } = schemas.compareCompetitors.parse(input);
  const results = [];
  // Bound concurrency and preserve input order.
  for (const url of urls) {
    try { results.push({ url, status: 'ok', analysis: await analyzer({ url }) }); }
    catch { results.push({ url, status: 'unavailable', error: 'Unable to inspect this public page.' }); }
  }
  return { competitors: results, limitations: ['Comparison reports observations only; it does not establish competitive superiority.'] };
}
