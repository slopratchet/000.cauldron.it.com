# Project Updates - Last 24 Hours

This document outlines the changes introduced to the repository within the last 24 hours.

---

## [970aa2f] - Merge pull request #236: Increase Clerk hydration timeout

**Date**: 2026-06-28
**Author**: glopratchet

### Summary

Increased the Clerk hydration timeout to ensure reliable authentication on slower or older devices.

### Key Changes

- **Authentication Hydration**: Implemented a longer wait loop (up to 10 seconds) for the `$clerkStore` to hydrate. This prevents "PROTOCOL_ERROR" and other initialization issues on devices like the iPhone 7.

---

## [0ea68a6] - Fix incomplete registration and CI formatting issues

**Date**: 2026-06-28
**Author**: google-labs-jules[bot]

### Summary

Resolved "MISSING_REQUIREMENTS" errors during sign-up by adding required name fields and fixed Prettier formatting issues to ensure CI compliance.

### Key Changes

- **Sign-up Flow Enhancement**:
  - Added `firstName` (NOMEN_PRIMARY) and `lastName` (NOMEN_SECONDARY) input fields to `src/pages/sign-up.astro`.
  - Updated the registration logic to correctly pass these parameters to the Clerk SDK.
  - Positioned `GENETIC_ID (EMAIL)` above the name fields for better UX flow.
- **Diagnostics**: Enhanced error reporting to explicitly log missing or unverified fields when registration is incomplete.
- **Testing**: Updated End-to-End (E2E) tests in `src/e2e.test.ts` to include interactions with the new name fields.
- **CI/Compliance**: Fixed code formatting across multiple files to satisfy Prettier checks in the CI pipeline.

### Files Modified

- `.aiexclude`
- `.cursorrules`
- `.github/ISSUE_TEMPLATE/task_for_agent.md`
- `.github/instructions/default.instructions.md`
- `.github/workflows/ci.yml`
- `.github/workflows/deploy-cf.yml`
- `.gitignore`
- `.husky/commit-msg`
- `.husky/post-merge`
- `.husky/pre-commit`
- `.husky/pre-push`
- `.prettierignore`
- `.prettierrc`
- `AGENTS.md`
- `README.md`
- `astro.config.mjs`
- `commitlint.config.js`
- `eslint.config.mjs`
- `package-lock.json`
- `package.json`
- `src/e2e.test.ts`
- `src/middleware.ts`
- `src/pages/index.astro`
- `src/pages/log-in.astro`
- `src/pages/sign-up.astro`
- `src/test/SignupProtocol.test.ts`
- `src/test/clerk-mock.ts`
- `tsconfig.json`
- `vitest.config.ts`
- `worker-configuration.d.ts`
- `wrangler.jsonc`
- _(and numerous component and data files)_
