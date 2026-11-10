# Repository and Notion Integration Map

Source: [Notion Landing Page Generator](https://myfunding.notion.site/landing-page-generator), retrieved for this task. Its historical prompt and proposed backlog are ideas, not implementation evidence.

| Area | Existing evidence | Status and next step |
| --- | --- | --- |
| GPT | `gpt/instructions.md`, `gpt-config.example.json` | Instructions exist; configuration is an example, not proof of a deployed GPT. |
| Knowledge | 19 Markdown files in `knowledge/` | Existing guidance; use the proof, workflow, HTML, copy and QA references instead of copying 29 proposed files. |
| Structured data | 11 JSON files in `data/` | Industry entries are empty arrays; objections contain three strategies. This library supplies planning catalogs without replacing those sources. |
| Templates | six top-level HTML files and 13 component files in `templates/` | Existing examples require verification before production use. |
| Examples | SaaS, agency, coaching, local-service and ecommerce folders | Each includes intake, copy, HTML and audit report; reports are examples, not verified results. |
| Actions | combined OpenAPI file and 12 per-action schemas in `actions/` | Contracts exist; inspect validity and server URL before use. |
| Service | `services/src/routes.ts` and matching files in `services/src/actions/` | Health endpoint returns OK; all 12 POST routes return placeholder echoes. No endpoint should be represented as functional. |
| Tests and CI | `tests/actions/`, fixtures, `.github/workflows/` | Action tests and npm test are placeholders; CI builds the service. The unrelated funding-readiness contract test exists separately. |
| Plugin | `plugin/landing-page-generator/` manifest, skill, reference index and 19 references | Packaged instructions exist; installed/deployed state is not established. |

## Reconciliation

The Notion original and `gpt/instructions.md` use these exact phrases:
1. Intake: "Type 'continue' to generate your complete landing page with code."
2. Copy: "Here's your complete landing page copy with all sections. Type 'continue' for the beautiful HTML code."
3. HTML: "Here's your complete landing page: comprehensive copy with psychological triggers AND beautiful, minimal HTML code with proper visual placeholders. The design is clean but engaging, fully responsive, and conversion-optimized. All image placeholders include specific size and style requirements for easy implementation."

`knowledge/landing-page-generator-mega-prompt.md` instead uses different closing phrases and a third continuation. The plugin skill allows immediate output when requested and does not require exact transitions. The Notion original asks for customer activity, trust badges and countdowns, whereas the plugin requires verified proof and real constraints. Its promise to extract everything from a URL also exceeds what browsing may reveal. Preserve all existing instructions; resolve precedence explicitly before a future GPT release. Never fabricate evidence or show a timer without supplied genuine deadline and behavior.

## Notion recommendations and gaps

The Notion playbooks map largely to existing `knowledge/` copy, offer, proof, FAQ, image, SEO and QA files. The 29-file proposal is not duplicated. Genuine gaps include experimentation, explicit action status, reusable template contracts, structured factory selection and non-landing-page architecture. Proposed utilities such as screenshot rendering and link checking have no corresponding service route.
