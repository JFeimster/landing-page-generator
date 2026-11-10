# Generation and Export

The POST routes `/build-offer-stack`, `/generate-faqs`, `/generate-cta-variants`, `/generate-design-tokens`, `/generate-image-briefs`, `/map-input-to-sections`, and `/package-landing-page` are **placeholder** echoes. Their intended contracts are proposals.

Inputs: structured brief, approved facts, optional style and target format. Outputs: labeled offer sections, FAQs, CTA variants, token suggestions, image briefs, page map or a package with an asset manifest. Dependencies: selected catalogs, schemas, token rules and an archive writer; provider integrations are configurable.

Tests must cover missing proof and prices, malformed input, unsupported formats, archive path traversal, oversized files, safe filenames and deterministic output. Generated placeholders are not completed customer proof, a working form integration or a deployed website.
