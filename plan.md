1. Make sure precommit tests pass (done).
2. Note that the errors about missing node action 24 are only warnings and shouldn't cause exit code 1.
3. The build failure from `src/pages/sheet/000.astro` due to `Could not resolve "../layouts/Layout.astro" from "src/pages/sheet/000.astro"` was fixed by correcting the relative path.
4. Also fixed the Vite "is not exported" warnings by changing `import { Type }` to `import type { Type }` for type-only imports across multiple components.
5. All checks, tests, and build step now complete successfully.
