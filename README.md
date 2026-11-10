# Landing Page Generator

Landing Page Generator is a custom GPT project for creating high-converting landing page copy, responsive HTML, visual placeholder briefs, conversion QA, and optional no-authentication GPT Actions.

## What this repo includes

- GPT instructions and setup files
- Knowledge files for landing page strategy, copywriting, design, HTML, and conversion optimization
- OpenAPI schemas for GPT Actions
- Optional TypeScript service scaffold for no-auth Actions
- HTML templates and reusable components
- Example landing pages
- Documentation for setup, testing, deployment, and maintenance
- A site-factory blueprint for evolving the project into reusable static sites, apps, embeds, APIs, and OAuth-enabled products

## Core GPT workflow

1. Gather intake details or analyze a website URL.
2. Generate complete landing page copy.
3. Generate production-ready responsive HTML.
4. Validate proof, claims, SEO, accessibility, and conversion elements.
5. Package or deploy the final landing page.

## Quick start

1. Upload files from `/knowledge` and `/data` to the GPT Knowledge area.
2. Paste `/gpt/instructions.md` into the GPT instructions field.
3. Add Actions from `/actions/landing-page-generator-actions.openapi.yaml`.
4. Set Action authentication to `None`.
5. Test the GPT using the examples in `/examples`.

## Repository structure

See `/docs/getting-started.md` and `/docs/gpt-setup.md` for setup details.

## Product expansion

The current repository is the landing-page foundation of a broader launch system. See `/docs/site-factory-blueprint.md` for the recommended template architecture, reusable packages, design packs, generator design, and phased implementation plan. See `/docs/roadmap.md` for the prioritized backlog.
