# GPT-to-plugin migration

This repository preserves historical GPT configuration, including `gpt/`, `gpts/`, `gpt-config.example.json`, and older setup notes. Treat those files as migration history rather than active setup directions.

The existing Landing Page Generator plugin is canonical. Its root manifest preserves its migrated GPT identifier and presentation. The packaged skill replaces GPT-only interaction assumptions with plugin workflows while retaining evidence rules, responsive implementation guidance, and quality checks. The 19 references remain packaged and load selectively.

The prior Action utilities are now reachable through the existing HTTP compatibility endpoints and a shared registry-backed MCP adapter. The implementations were not rewritten. MCP is the primary tool interface once connected to a verified endpoint; OpenAPI remains a compatibility contract. There is no verified remote deployment URL or auth configuration yet, and the plugin therefore has no active `mcp.json`.

The old GPT archive command remains available as `npm --prefix services run package:gpt:legacy` for historical exports. The plugin release command is `npm --prefix services run package:plugin` and has stricter connection validation.

Do not upload Knowledge files or manually add Actions to a GPT as the primary installation process. Update the existing Landing Page Generator through Plugin Creator using a validated package only after its remote MCP connection is configured.
