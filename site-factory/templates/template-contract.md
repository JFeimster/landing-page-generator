# Template Contract

Each future template ships a versioned manifest conforming to `../schemas/template-manifest.schema.json`, a README, setup guide, configuration examples, accessible empty/error/loading states, tests and a release checklist. A manifest states project types, runtime, required and optional capabilities, entrypoint, version and implementation status.

A template must build from a clean checkout with documented prerequisites, expose configurable data and providers, validate inputs, keep secrets server-side, and document deployment and rollback. Add only requested capabilities; ensure placeholders cannot be mistaken for real proof or integrations. Every generated project should record template and catalog versions and remain editable without the generator.
