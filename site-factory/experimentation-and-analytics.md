# Experimentation and Analytics

Define one decision per experiment: audience, eligibility, variant, success event, guardrail, runtime and owner. Example: "If the CTA names the next step, more eligible visitors may start the application." This is a hypothesis, not a promised result.

Use a consistent event contract: `page_view`, `cta_click`, `form_started`, `form_error`, `form_submitted`, `checkout_started`, and `conversion_completed`. Include non-sensitive project, page, placement and variant identifiers; exclude form content, tokens and personal details. Implement provider adapters only when configured and respect consent requirements.

Before a test, check traffic volume, reliable random assignment, attribution, event delivery and guardrails. Predefine a stopping rule and interpret uncertainty; small samples and concurrent changes may make conclusions inconclusive. Track backlog items with hypothesis, baseline, owner, implementation, outcome and next action. See `schemas/experiment.schema.json`.
