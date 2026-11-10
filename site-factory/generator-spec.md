# Generator Specification

Status: proposed. Example commands elsewhere are illustrative; no `factory:new` command exists.

## Inputs and selection

Read a project brief validated by `schemas/project-brief.schema.json`. Resolve project type, template, style, layout, motion and capability IDs against catalogs. Reject unknown IDs and incompatible combinations. Ask for missing audience, goal, destination and runtime; show optional integrations and their setup requirements.

## Generation contract

1. Validate the schema, catalog references and runtime compatibility; surface all errors together.
2. Preview target directory, template version and selected modules. Refuse nonempty destinations unless an explicit future overwrite policy is implemented.
3. Copy the chosen template, apply typed content, and write a manifest containing selected IDs and version.
4. Generate `.env.example` names and setup instructions, never values or secrets.
5. Run the template's lint, build, tests and accessibility checks; return exact failures and unresolved placeholders.
6. Print reproducible commands and deployment requirements. No automatic deployment is implied.

Generation should be deterministic for the same template version and brief. Missing proof, pricing, assets and integrations stay labeled. Record decisions, do not silently add authentication, billing or databases.
