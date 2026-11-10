# Factory Roadmap

1. **Baseline and evidence.** Inventory routes and contracts, implement meaningful action tests, validate existing templates. Acceptance: CI executes real tests and identifies placeholders. Depends on current service.
2. **Extract shared foundations.** Define token and content contracts; extract accessible UI and conversion blocks from existing HTML. Acceptance: two existing pages render with shared blocks, keyboard and mobile checks pass. Depends on baseline.
3. **Static and funnel starters.** Build independent templates and SaaS waitlist, local-service and creator examples. Acceptance: clean install, build, deploy preview, form adapter and documented events work. Depends on shared foundations.
4. **Design packs.** Implement the six initial packs and snapshots at mobile/desktop sizes; check contrast, reduced motion and selection compatibility. Depends on tokens and blocks.
5. **Application starters.** Add Next.js, directory and dashboard templates with optional auth and persistence. Acceptance: authorization, migration and empty-state tests pass. Depends on real use cases and server deployment.
6. **API, OAuth and embeds.** Add only for a concrete product; review threat model, callbacks, token storage, limits and host isolation. Acceptance: integration and failure tests run against test services.
7. **Generator.** After at least two templates are proven in production, implement [generator-spec.md](generator-spec.md). Acceptance: schema validation, deterministic output, safe destinations and reproducible CI.
