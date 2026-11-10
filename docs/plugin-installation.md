# Plugin installation

Use the existing Landing Page Generator plugin package in `plugin/landing-page-generator/`. Preserve its identity and connections when updating the existing plugin through Plugin Creator. This repository does not create a replacement plugin.

For a local skill review, open `skills/instructions/SKILL.md` and its referenced files within the package. The package ZIP must have `plugin.json` at its root. Follow [the release process](plugin-release-process.md) to validate and package it.

The repository currently has no verified MCP production URL, so the package does not declare an active remote MCP server. Local MCP service code is available for development at `/mcp`; do not configure a fabricated production endpoint. Once a real deployment URL and authentication requirements are verified, add portable `mcp.json` and run the release gate.

The existing icon and three default prompts remain in the manifest. For existing account connections and audience settings, use the existing plugin's update flow; do not create a duplicate.
