# Public URL Analysis

**Current status: placeholder** for `POST /analyze-url` and `POST /compare-competitors`. Routes echo input; no extraction or comparison is delivered.

Proposed input: public HTTP(S) URL(s), optional focus and size limit. Output: observed title, headings, CTA text, metadata, source URL, timestamp, omissions and separately labeled inferences. Dependencies: safe HTTP client, DNS validation, HTML parser and bounded execution.

Validation: reject credentials and non-public addresses including redirects and DNS rebinding; constrain schemes, ports, redirects, content type, size and time. Never request login-gated pages. Test inaccessible pages, private addresses, redirects, malformed HTML and missing metadata. Do not claim the full site or hidden terms were inspected.
