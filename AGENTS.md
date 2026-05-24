# AI Agent Onboarding & Constraints Guide

Welcome to the codebase. As an artificial intelligence agent assisting with development, you operate within an Astro + Cloudflare environment. The following rules govern your behavior to ensure code quality and architectural consistency, replacing previous iterations of legacy workflows.

---

## 1. Absolute Directory Restrictions

You are strictly authorized to operate within `src/` and `public/`, and modify root configuration files (`astro.config.mjs`, `wrangler.jsonc`, etc.) as needed. Treating other locations as read-only prevents unintended pollution of the repository structure.

---

## 2. Astro Islands Architecture

When creating UI features:

- Default to server-rendered HTML. Astro components (`.astro`) build to zero-JS static HTML by default.
- Only hydrate components when they require client-side interactivity using Astro client directives (`client:load`, `client:idle`, `client:visible`, etc.).
- Prefer standard HTML, CSS, and vanilla JS over heavy framework integrations unless specifically instructed.
- Use the standard `src/pages` structure for routing and `src/components` for shared snippets.

---

## 3. Cloudflare Integration

This application leverages the `@astrojs/cloudflare` adapter.

- Server-side rendering (SSR) and API routes in `src/pages` have full access to Cloudflare bindings.
- Environment variables and bindings (KV, D1, R2) are accessible on incoming request contexts via `Astro.locals.runtime.env`.
- Ensure you respect the Cloudflare Worker/Pages environment constraints when introducing Node.js-specific modules—prefer standard Web APIs (e.g., `fetch`, `Request`, `Response`).

---

## 4. Testing Protocols & Commands

> [!NOTE]
> Testing is exclusively handled by **Vitest** for both Unit and E2E suites.

You must programmatically verify your work before establishing your task as complete:

- **Unit Tests:** Written using standard `vitest` patterns (`describe`, `it`, `expect`). Run `npm run test:unit`.
- **E2E Tests:** E2E tests are located in `src/e2e.test.ts` and leverage Puppeteer orchestrated via Vitest. Run `npm run test:e2e` to trigger `start-server-and-test` against the local dev environment.
- Do not assume UI changes are safe. Run the test scripts.

---

## 5. Code Quality Workflows

This repository enforces formatting and modular linting rules.

- **Verification:** Run `npm run check:all` to run Prettier and ESLint.
- **Fixing:** Run `npm run fix:all` if necessary to automatically fix detectable linting errors.
- Never commit code that breaks Prettier or ESLint checks. Commit stages managed by Husky & `lint-staged` will prevent malformed commits globally.

---

## 6. Code Generation Philosophy

- **Simplicity Over Complexity:** Do not over-engineer solutions. Make robust use of standard Astro page and layout configurations rather than building complex "singleton" or bespoke dispatcher logic.
- **No Rogue Scripts:** Do not write Python, Bash, or ad-hoc Node scripts to orchestrate application code generation or deployment hacks. Hand-author your `.astro` and `.ts` architectures.
