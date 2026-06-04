1. **Create Actor Component `src/components/Actor001.tsx`:**
   - I will copy `src/components/Actor000.tsx` to `src/components/Actor001.tsx`.
   - I will rename the component `Actor000` to `Actor001`.
   - I will change the import from `./actorData` to `{ DEFAULT_SUBJECTS } from './sheet-001/data'`.
   - I will change the data source line from `const { ... } = characterData;` to `const { ... } = DEFAULT_SUBJECTS[0];`.
   - I will search for all hardcoded `localStorage` keys containing `charity_` (e.g. `charity_weapons_v3`) and replace them with `curtis_` to avoid state data collisions across characters (as advised in memory).

2. **Create Actor Page `src/pages/actor/001.astro`:**
   - I will copy `src/pages/actor/000.astro` to `src/pages/actor/001.astro`.
   - I will update the import and usage of `Actor000` to `Actor001`.
   - I will update the page title to `<title>Actor 001</title>`.

3. **Verify Functionality:**
   - I will verify the changes are built properly with `npm run build` or by checking `npm run dev` output.

4. **Complete Pre-Commit Steps:**
   - Complete pre commit steps to ensure proper testing, verification, review, and reflection are done.

5. **Submit Changes:**
   - I will submit the code with a clear commit message.
