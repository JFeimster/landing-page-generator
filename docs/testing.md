# Testing

## Current verification

The service TypeScript build is the current executable check:

```powershell
npm --prefix services run build
```

The repository includes fixture files and test placeholders under `/tests`, but they are not yet connected to a test runner. Do not treat `npm --prefix services test` as meaningful coverage until the placeholder script and test files are replaced.

## Manual GPT verification

For each release, run at least one example from `/examples` through the configured GPT and verify:

- The intake asks only for missing information.
- The copy phase stops and waits for `continue`.
- Missing proof, pricing, guarantees, and urgency remain explicit placeholders.
- HTML includes semantic structure, metadata, responsive behavior, and accessible controls.
- The output does not fabricate testimonials, logos, metrics, awards, or customer outcomes.

## Action verification

For the no-auth Action service:

1. Install dependencies with `npm --prefix services install`.
2. Compile with `npm --prefix services run build`.
3. Start locally with `npm --prefix services run dev`.
4. Exercise each endpoint using valid and invalid payloads from `/tests/payloads` and `/tests/fixtures`.
5. Confirm errors are structured, user inputs are sanitized, and unsupported claims are rejected or clearly flagged.

## Recommended automated coverage

Prioritize these tests when a runner is added:

- `validateProof`: permitted proof, placeholders, fabricated names, unsupported metrics, and regulated claims.
- `auditHtml`: headings, metadata, image alt text, CTA targets, contrast, and broken placeholders.
- `mapInputToSections`: minimal, complete, and conflicting intake payloads.
- `buildOfferStack`: pricing, bonus, guarantee, and missing-information behavior.
- `generateFaqs` and `generateCtaVariants`: objection coverage, tone adaptation, and safe claim wording.
- OpenAPI validation for every schema in `/actions/schemas`.

## Release gate

Before publishing a release:

- Run the service build.
- Validate every OpenAPI schema.
- Confirm all 19 knowledge files exist and are nonempty.
- Review generated content for proof and guarantee safety.
- Test at least one static HTML export on desktop and mobile.

