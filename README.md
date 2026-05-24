# Astro Site

> **"Own Your Own Mess."**  
> _Experience the intimacy of tuning your own RPG, managing campaigns, and exploring the forbidden archives of retro-fantasy lore._

Astro Canvas is a highly styled, premium retro-fantasy RPG companion app and Dungeon Master (DM) command center. The project is designed with a gritty, retro 1970s print-manual aesthetic (utilizing heavy lines, dark modes, HSL tailored palettes, and stipple gradients). Built with **Astro v6**, powered by **Cloudflare Pages SSR**, secured with **Clerk Authentication**, and styled using **Tailwind CSS v4**.

---

## 🔮 Project Purpose

Astro Canvas acts as both a player-facing manual ("The Tome: 1970 Edition") and a Dungeon Master command deck ("DM Command Center"). It enables DMs and players to:

- **Browse Spells & Bestiaries:** Explore the Grimoire of Spells (e.g., _Necrosis_, _Bone Shatter_) and look up monsters in the Bestiary of the Void.
- **Select & Track Character Classes:** Choose from high-difficulty classes such as the _Dread Knight_, _Flesh Weaver_, _Void Acolyte_, and _Iron Maiden_.
- **Monitor Campaign Metrics:** Track live DM system metrics (CI/CD status, system security, threat indicators, and secret DM logs) from the command terminal page.
- **Interact with the Sludge Logs:** A cycle-by-cycle archive of game-world chronicles and active warning signals.

---

## 🛠️ Technology Stack

| Technology               | Purpose / Role                                                                                             |
| :----------------------- | :--------------------------------------------------------------------------------------------------------- |
| **Astro v6**             | Islands Architecture, hybrid server-side rendering (SSR), and zero-JS components by default.               |
| **Cloudflare Pages**     | Serverless hosting & SSR execution using `@astrojs/cloudflare` with full worker environment compatibility. |
| **Clerk Authentication** | User authentication (`/login` and `/signup` routes) and access control.                                    |
| **Tailwind CSS v4**      | Modern, utility-first styling configured via Vite for responsive layouts and premium custom aesthetics.    |
| **Vitest & Puppeteer**   | Comprehensive test runner for unit tests and E2E browser tests.                                            |
| **Prettier & ESLint**    | Rigid code formatting and modular linting workflows.                                                       |

---

## 📂 Project Structure

```text
/
├── public/                  # Static assets (images, fonts, etc.)
├── src/
│   ├── assets/              # Component-bound media and icons
│   ├── components/          # Reusable UI widgets (Header, Footer, Hero, Chronicles, LifeLog)
│   ├── layouts/             # Base layouts (Layout.astro)
│   ├── middleware.ts        # Clerk auth verification & edge route protection
│   ├── pages/               # Routing directories
│   │   ├── api/             # SSR API endpoints (e.g. Moon phase status)
│   │   ├── guest/           # Unauthenticated player public routes
│   │   ├── market/          # Character/Relic marketplace index
│   │   ├── play/            # Character Sheets, Controller, and The Tome directory
│   │   ├── runner/          # DM Command Center and system consoles
│   │   ├── login.astro      # Clerk sign-in page
│   │   └── signup.astro     # Clerk registration page
│   ├── styles/              # Global styles & design system definitions
│   └── e2e.test.ts          # E2E Puppeteer suite
├── astro.config.mjs         # Astro integration configuration & edge compatibility plugin
├── wrangler.jsonc           # Cloudflare deployment settings
└── package.json             # Scripts & dependency declaration
```

---

## 🧞 Developer Command Reference

All commands must be executed from the root of the workspace.

### 1. Development & Local Server

Starts the Astro local development server with hot-module replacement:

```sh
npm run dev
```

### 2. Testing

Test execution is managed entirely by **Vitest**:

- Run Unit Tests:
  ```sh
  npm run test:unit
  ```
- Run End-to-End Tests (Launches Puppeteer against the dev server):
  ```sh
  npm run test:e2e
  ```

### 3. Code Quality & Format Checking

We enforce strict formatting and linting rules before any commit:

- Check lint and format compliance:
  ```sh
  npm run check:all
  ```
- Automatically fix lint and format issues:
  ```sh
  npm run fix:all
  ```

### 4. Build & Production Preview

Compiles the static assets and builds the server-side bundles:

```sh
# Build application
npm run build

# Preview build locally on Cloudflare Wrangler environment
npm run preview
```

### 5. Deployment

Deploys the production build to Cloudflare Pages:

```sh
npm run deploy
```

---

## 🤖 AI Agent Guidelines

For developers operating as AI agents, please consult the [AGENTS.md](file:///d:/work/002.astro-canvas/AGENTS.md) guide before modifying any system architecture. Treat files outside of `src/` and `public/` as read-only unless modifying config boundaries. Ensure all formatting and Vitest test suites compile cleanly prior to marking tasks complete.
