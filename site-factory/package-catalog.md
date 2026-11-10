# Shared Package Catalog

These packages are proposed, not installed. Each should expose a documented public interface, version, tests, and independent ownership.

| Package | Responsibility | Boundary |
| --- | --- | --- |
| ui | Accessible controls, typography and focus | No business copy or provider credentials |
| blocks | Hero, pricing, FAQ, forms and CTA composition | Accept content and callback props |
| themes | Tokens and component variants | Enforce semantic colors and reduced motion |
| content | Typed project copy and asset metadata | Separate editorial data from code |
| seo | Metadata, canonical, sitemap and structured data | Only emit verified public data |
| analytics | Typed event contract and consent adapter | No personal data by default |
| auth | Session and authorization adapter | Server-only secrets and provider-independent policy |
| database | Schemas, migrations and repositories | Explicit tenant boundaries |
| payments | Checkout and webhook adapter | Provider-managed payment data |
| email | Transactional templates and delivery adapter | Explicit sender and consent |
| api-client | Typed transport, errors and retries | No privileged keys in browsers |

Create a package only when at least two actual consumers need it. Maintain versioned public contracts and integration tests; do not embed provider-specific behavior in UI.
