# Testing and validation

Run from the repository root:

```powershell
npm --prefix services ci
npm --prefix services run build
npm --prefix services test
npm --prefix services run validate
```

The action test runner uses Node's test runner. MCP tests cover discovery of all 12 tools, invocation through the in-memory MCP transport, and invalid-input errors. Existing fixture tests exercise established HTTP actions. Validation checks JSON catalogs and generated OpenAPI contracts against runtime Zod schemas.

These are local checks. They do not test a deployed MCP endpoint, hosting-level rate limits, or an installed plugin update. Do not report checks that were not run as passed.
