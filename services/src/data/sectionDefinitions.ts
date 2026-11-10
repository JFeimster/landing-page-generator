export const sectionDefinitions = [
  { id: 'hero', needs: ['offer', 'audience', 'cta'] },
  { id: 'problem', needs: ['problem'] },
  { id: 'solution', needs: ['mechanism'] },
  { id: 'features', needs: ['features'] },
  { id: 'proof', needs: ['proof'] },
  { id: 'offer', needs: ['offer', 'price'] },
  { id: 'faq', needs: ['audience'] },
  { id: 'cta', needs: ['cta'] },
] as const;
