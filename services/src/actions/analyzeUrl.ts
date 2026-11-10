import { schemas } from '../schemas.js';
import { fetchPublicPage } from '../lib/fetchPublicPage.js';
import { htmlParser } from '../lib/htmlParser.js';
export async function analyzeUrl(input: unknown, fetcher = fetchPublicPage) {
  const { url } = schemas.analyzeUrl.parse(input);
  const fetched = await fetcher(url);
  const page = htmlParser(fetched.html);
  return {
    source: { url: fetched.url, fetched_at: fetched.fetched_at },
    observed: {
      title: page.tags('title').map(n => page.content(n).trim()).filter(Boolean)[0] ?? '',
      description: page.meta('description'),
      headings: page.elements.filter(n => /^h[1-3]$/.test(n.name)).slice(0,30).map(n => ({ level: n.name, text: page.content(n).trim() })),
      ctas: [...page.tags('a'), ...page.tags('button')].map(n => page.content(n).trim()).filter(s => /\b(get|start|book|buy|join|contact|request|try|demo|subscribe)\b/i.test(s)).slice(0,20),
      text_excerpt: page.text.slice(0,6000),
    },
    limitations: ['Static HTML only; JavaScript is not executed.', 'Observed claims are not verified proof.', 'Pricing, audience and hidden terms may be unavailable.'],
  };
}
