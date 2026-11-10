import { parseDocument, DomUtils } from 'htmlparser2';
export function htmlParser(html: string) {
  const doc = parseDocument(html, { withStartIndices: true });
  const elements = DomUtils.findAll(node => 'name' in node, doc.children);
  const tags = (name: string) => elements.filter(node => node.name === name);
  const content = (node: Parameters<typeof DomUtils.textContent>[0]): string => {
    if (Array.isArray(node)) return node.map(content).join(' ');
    if ('name' in node && ['script', 'style', 'template', 'noscript'].includes(node.name)) return '';
    if ('children' in node) return node.children.map(content).join(' ');
    return DomUtils.textContent(node);
  };
  const text = content(doc).replace(/\s+/g, ' ').trim();
  const meta = (name: string) => tags('meta').find(n => n.attribs.name?.toLowerCase() === name || n.attribs.property?.toLowerCase() === name)?.attribs.content ?? '';
  return { doc, elements, tags, text, meta, content };
}
export type ParsedHtml = ReturnType<typeof htmlParser>;
