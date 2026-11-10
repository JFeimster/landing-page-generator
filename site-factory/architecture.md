# Architecture

The current repository is a landing-page GPT, HTML examples, and placeholder Action service. The following is a proposed evolution, not an existing workspace.

```text
apps/<deployable>       templates/<starter>    examples/<reference>
packages/{ui,blocks,themes,content,seo,analytics,auth,database,payments,email,api-client}
catalogs/<selection>    schemas/<contracts>    generators/<scaffolder>
```

A project brief selects a project type, one template, style, layout, motion profile and explicit capabilities. The generator validates IDs and dependencies, copies a compatible template, enables selected adapters, emits a setup manifest and runs checks. Packages own reusable implementation; applications own business rules and deployment configuration. Examples exercise public package interfaces.

A monorepo enables shared upgrades and checks, but introduces dependency coordination, shared-release risk and larger CI scope. Start with the present repository; introduce workspace tooling after two maintained templates prove a shared boundary. Isolate deployment targets, environment variables, data and secrets per project.

Static output serves prebuilt assets; dynamic OAuth callbacks, server sessions, private APIs and request-time writes require a server or separately hosted backend. A static frontend may call a configured external backend, but that integration must be real and independently deployed. For embed isolation use an iframe; script embeds share the host page's execution environment.
