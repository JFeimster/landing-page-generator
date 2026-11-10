const patterns = [
  { code: 'numeric-outcome', regex: /\b\d[\d,.]*\s*(?:%|x\b|customers\b|clients\b|users\b)|[$]\s*\d[\d,.]*/gi },
  { code: 'guarantee', regex: /\b(?:guaranteed?\s+(?:results|income|returns|success)|risk[- ]free|double your|triple your)\b/gi },
  { code: 'endorsement', regex: /\b(?:trusted by|as seen in|award[- ]winning|certified by)\b/gi },
  { code: 'superlative', regex: /\b(?:best in|fastest|number one|leading provider)\b/gi },
  { code: 'scarcity', regex: /\b(?:only \d+ left|limited[- ]time|ends tonight|selling out)\b/gi },
];
export function claimDetection(copy: string) {
  const masked = copy.replace(/\[[^\]\r\n]*\]/g, s => ' '.repeat(s.length));
  return patterns.flatMap(({ code, regex }) => [...masked.matchAll(regex)].map(match => {
    const start = match.index ?? 0;
    const left = copy.lastIndexOf('\n', start) + 1;
    const right = copy.indexOf('\n', start);
    return { code, match: match[0], offset: start, context: copy.slice(left, right < 0 ? copy.length : right).trim() };
  }));
}
