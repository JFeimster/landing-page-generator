# Getting started

This repository is the source for the existing Landing Page Generator plugin and its optional utility service.

## Use the plugin source

Review `plugin/landing-page-generator/` for the portable manifest, skill, references, and icon. See [plugin installation](plugin-installation.md) and [release process](plugin-release-process.md). No new plugin needs to be created.

## Run the service locally

```powershell
npm --prefix services ci
npm --prefix services run build
npm --prefix services run dev
```

The service binds to `127.0.0.1:3000` by default. `GET /health` reports service liveness, and the MCP endpoint is `/mcp`. Existing operation paths are listed in [actions/README.md](../actions/README.md). Local availability does not establish a production URL.

## Validate

```powershell
npm --prefix services test
npm --prefix services run validate
```

Read [testing](testing.md) for scope and limitations. API output is deterministic utility feedback, not a conversion prediction or factual verification.
