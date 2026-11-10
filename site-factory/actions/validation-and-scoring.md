# Validation and Scoring

**Current status: placeholder** for `/audit-html`, `/score-copy`, and `/validate-proof`. Their POST handlers echo requests.

Proposed input: HTML or copy and optional verified-evidence list. Proposed output: machine-readable findings with location, severity, rationale, suggested remediation, and explicit limitations. Dependencies: parser, claim patterns, accessibility and SEO checks; see `services/src/lib/` and `data/unsupported-claim-patterns.json`, whose existence is not proof of an integrated route.

Validation: test missing alt text, broken heading hierarchy, placeholders, unsupported statistics and false positives. Results are heuristic, not a guarantee of legal compliance or conversion performance. Bound inputs and render no untrusted HTML in the service.
