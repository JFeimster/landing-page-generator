# Roadmap

The repository is currently a landing-page GPT and Action service foundation. This roadmap extends it into a composable site factory without turning every launch into a heavyweight SaaS starter.

## Now: strengthen the landing-page core

- Replace placeholder action tests with fixture-based tests for proof validation, HTML auditing, CTA generation, FAQ generation, and offer-stack building.
- Replace the scaffold validation workflow with checks for the required knowledge files, JSON data files, OpenAPI schema validity, and service compilation.
- Add implementation-ready documentation to the currently terse setup, deployment, testing, and troubleshooting guides.
- Establish a versioned template contract for page templates and reusable HTML components.
- Add visual regression or browser-based smoke checks for the bundled templates.

## Next: introduce the site factory

- Create a shared design-token package based on `data/design-token-schema.json`.
- Extract reusable conversion blocks: hero, proof, feature grid, comparison, pricing, FAQ, lead form, and final CTA.
- Add a `static-site` template for sites that do not need authentication, persistence, or request-time logic.
- Add a `funnel` template for multi-step lead capture, applications, quizzes, and thank-you pages.
- Build three reference examples: a B2B SaaS waitlist, a local-service lead generator, and a creator/course funnel.
- Add design packs for conversion clean, editorial premium, industrial bold, product bento, mission control, and playful launch.

## Later: full-stack application capabilities

- Add a full-stack Next.js template with optional authentication, database, billing, analytics, and email modules.
- Add a directory template with data model, filtering, search, category pages, and submission workflow.
- Add a dashboard template with role-aware navigation, tables, empty states, settings, and activity views.
- Add an API/OAuth template only when a real integration use case requires it; include token storage, scopes, rate limits, webhook verification, and API documentation.
- Add an embed-widget template with script and iframe delivery modes, configuration attributes, events, theming, and accessibility requirements.

## Generator milestone

Introduce a project generator after at least two templates are proven in production. It should ask for the project type, persistence, authentication, billing, API, embed, deployment target, and design pack, then generate only the capabilities the project needs.

## Non-goals

- A single universal starter that bundles every capability.
- Fake social proof, generated customer assets, or unsupported conversion claims.
- Adding OAuth, payments, databases, or dashboards to static landing pages by default.

