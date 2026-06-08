# Action Service

Optional TypeScript/Node service for no-authentication GPT Actions.

## Local development

```bash
npm install
npm run dev
```

## Security notes

Even with no authentication, use:

- Rate limiting
- Input size limits
- URL allow/block rules
- HTML sanitization
- Error handling
- No private-page crawling
- No storage of submitted user content unless documented
