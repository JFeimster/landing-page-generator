# Site Factory Blueprint

## Goal

Evolve Landing Page Generator from a single-purpose GPT into a reusable launch system for marketing pages, funnels, static sites, full-stack apps, directories, dashboards, APIs, OAuth integrations, and embeds.

The factory should make simple launches fast while keeping advanced capabilities optional. A static marketing site should not inherit the operational cost of authentication, databases, billing, or OAuth.

## Architecture

Use a monorepo when the project grows beyond the current template collection. Keep deployable applications separate from reusable packages.

```text
apps/
  static-site/
  next-app/
  directory/
  dashboard/
  api-service/
  oauth-service/
  embed-widget/
packages/
  ui/
  blocks/
  themes/
  content/
  auth/
  database/
  api-client/
  analytics/
  email/
  seo/
  payments/
templates/
  landing-page/
  funnel/
  directory/
  dashboard/
  saas/
  oauth-api/
  embedded-tool/
examples/
  b2b-saas-waitlist/
  local-service-lead-gen/
  creator-course-funnel/
  niche-directory/
  client-portal/
  embedded-calculator/
```

## Template Selection

| Template | Choose it for | Must include | Do not include by default |
| --- | --- | --- | --- |
| Static site | Landing pages, portfolios, waitlists, documentation | SEO, analytics, forms, content, deployment config | Auth, database, server-only features |
| Funnel | Lead magnets, quizzes, applications, campaigns | Multi-step form, tracking, thank-you page, CTA variants | Full dashboard |
| Next app | SaaS MVPs and client portals | App shell, feature folders, protected routes when required | Payments or OAuth until needed |
| Directory | Listings, marketplaces, resource hubs | Data model, filters, search, category pages, submissions | Complex marketplace operations |
| Dashboard | Internal tools and member areas | Navigation, tables, empty states, settings, roles | Marketing-page design assumptions |
| API and OAuth | Integrations and developer products | Scopes, callbacks, tokens, rate limits, webhook verification, API docs | UI features unrelated to integrations |
| Embed | Calculators, mini-tools, capture forms | Iframe or script loader, theming, events, accessibility | Full product shell |

## Shared Packages

- `ui`: accessible primitive components and tokens.
- `blocks`: conversion sections such as hero, proof, features, pricing, FAQ, CTA, and forms.
- `themes`: visual design packs, typography, colors, surfaces, borders, and motion rules.
- `content`: typed content structures, MDX or JSON content, and metadata.
- `seo`: metadata, social images, sitemap, robots, and JSON-LD utilities.
- `analytics`: event naming, provider adapters, consent handling, and funnel measurement.
- `auth`, `database`, `payments`, `email`, and `api-client`: optional modules that are added only when the product requires them.

## Design Packs

Treat visual identity as a package of decisions rather than a single CSS file. Every pack should define color, typography, spacing, radius, elevation, backgrounds, interaction states, motion limits, and component variants.

Start with these packs:

| Pack | Best fit | Direction |
| --- | --- | --- |
| Conversion clean | Services, lead generation, straightforward offers | Clear hierarchy, high contrast, restrained visuals |
| Editorial premium | High-ticket services, consulting, luxury brands | Large type, whitespace, refined palette, art-directed assets |
| Industrial bold | Agencies, AI tools, challenger brands | Dense grid, heavy borders, utility labels, assertive contrast |
| Product bento | SaaS and product launches | Modular cards, screenshots, structured feature storytelling |
| Mission control | Dashboards and operational apps | Dense data surfaces, status cues, keyboard-first interaction |
| Playful launch | Consumer products, courses, experiments | Bright blocks, expressive type, purposeful 3D or illustration |

Avoid a generic gradient-and-glass default. Use one visual direction per project and let typography, composition, and imagery carry the identity.

## Reusable High-Impact Blocks

- Product-demo hero with a real screenshot or a labeled placeholder.
- Before-and-after comparison.
- Scroll-based process timeline with reduced-motion support.
- Interactive calculator or scorecard.
- Sticky CTA rail and mobile CTA bar.
- Pricing toggle and comparison table.
- Animated diagram that clarifies a real process.
- Command palette and quick actions for dashboards.
- Embeddable form or mini-tool with host-page events.

Motion must reinforce hierarchy or demonstrate behavior. It must not delay content, hide controls, or disregard reduced-motion preferences.

## Embed Delivery

Support two modes:

- Iframe embeds for isolation and interactive tools.
- Script embeds for compact CTAs, badges, inline forms, and notifications.

Each embed should have a versioned URL, a small loader, `data-*` configuration attributes, theme controls, accessibility requirements, resize handling, error state, and documented events such as `onOpen`, `onSubmit`, and `onComplete`.

## Generator Contract

Add a project generator only after templates are stable. It should collect:

1. Project type.
2. Audience and conversion goal.
3. Need for authentication, persistence, billing, an API, OAuth, or an embed.
4. Deployment target.
5. Design pack and content source.

It should generate the smallest viable project rather than a universal boilerplate.

Example commands:

```powershell
pnpm factory:new landing-page --style editorial-premium
pnpm factory:new funnel --style industrial-bold
pnpm factory:new directory --name best-agencies
pnpm factory:new saas --auth --database
pnpm factory:new embed --name roi-calculator
```

## Recommended Sequence

1. Harden the current landing-page templates, examples, knowledge base, and Action service checks.
2. Extract tokens and conversion blocks from the existing HTML templates.
3. Ship the static-site and funnel templates with three real examples.
4. Add design packs and visual regression checks.
5. Add the full-stack app, directory, and dashboard templates as independent products.
6. Add API/OAuth and embed templates only when a launch needs them.
7. Build the project generator around the validated templates.
