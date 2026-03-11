# Stack Recommendation

Date: 2026-03-11  
Scope: v1 baseline for **Calcolatrice Lievitazione**  
Decision style: prescriptive, biased toward maintainability and premium UI quality over novelty

## Executive Summary

This project should use a **modern but conservative 2026 Next.js stack**:

- **Next.js 16 App Router** with **React 19.2** and **TypeScript 5.9**
- **Node 24 Active LTS** locally and in primary CI, with optional compatibility checks on Node 22 Maintenance LTS
- **Tailwind CSS 4.1 + shadcn/ui + Radix primitives** for the UI system
- **Motion for React** (`motion/react`, the current Framer Motion package) for restrained micro-animations only
- **Vitest 4 + React Testing Library + jsdom** for unit/integration tests
- **Playwright** for E2E and one accessibility smoke with `@axe-core/playwright`
- **ESLint flat config + Prettier** for maintainability
- **GitHub Actions** with explicit lint/typecheck/test/build jobs

This is the right stack for the brief because it gives:

- a current, officially supported Next.js baseline
- a high-quality open-code component system instead of a boxed-in UI library
- strong testing without adding unnecessary backend or state-management complexity
- a GitHub-ready setup that scales if this calculator becomes the first tool in a broader suite

## Final Recommendation Table

| Area | Recommendation | Confidence | Why |
|---|---|---:|---|
| Runtime | **Node 24 LTS** for development and main CI; optionally add **Node 22** compatibility matrix | High | Node 24 is the current Active LTS and Node should stay on LTS lines for production apps |
| Package manager | **npm** with committed `package-lock.json` and `packageManager` field | High | Explicit brief requirement; deterministic installs matter for CI |
| Framework | **Next.js 16** with **App Router** | High | Current stable major, default direction in official docs, direct brief fit |
| React | **React 19.2** via Next 16 | High | Current Next 16 baseline; modern React APIs available where useful |
| Language | **TypeScript 5.9** with strict mode | High | Current stable TS baseline; best fit for reusable domain logic |
| Rendering model | **Mostly static page shell + client calculator island** | High | The app is standalone and all logic is client-side; this keeps complexity low |
| UI system | **Tailwind CSS 4.1 + shadcn/ui (`new-york`) + Radix primitives** | High | Best combination of premium UI flexibility, accessibility, and maintainability |
| Icons | **lucide-react** | High | Explicit brief requirement; consistent, tree-shakeable icon set |
| Typography | **Geist Sans + Geist Mono** | Medium | Clean premium baseline that matches product/tool aesthetics without visual noise |
| Motion | **`motion` package imported from `motion/react`** | High | Current Motion/Framer path; use only for subtle result/warning/panel transitions |
| State | **Local component state with `useReducer` + pure domain functions** | High | Small deterministic tool; global state is unnecessary |
| Validation | **Hand-written pure validation/parsing utilities in `/lib/calc`** | High | Smaller, clearer, and more honest than adding schema/form frameworks for 3 inputs |
| Styling utilities | **`clsx` + `tailwind-merge` + `class-variance-authority`** | High | Standard shadcn-compatible utility trio for clean variant handling |
| Unit/integration tests | **Vitest 4 + React Testing Library + jsdom** | High | Official Next.js guidance, fast feedback loop, good fit for component logic |
| E2E tests | **Playwright** | High | Official Next.js guidance, multi-browser support, strong CI ergonomics |
| Accessibility smoke | **`@axe-core/playwright`** in E2E | Medium | Cheap automated coverage for obvious a11y regressions on the main flow |
| Linting | **ESLint 9 flat config** with `eslint-config-next/core-web-vitals` + `eslint-config-next/typescript` | High | Lowest-risk path in Next 16; directly aligned with framework guidance |
| Formatting | **Prettier 3 + `prettier-plugin-tailwindcss` + `eslint-config-prettier`** | High | Keeps Tailwind-heavy JSX readable and avoids ESLint/Prettier rule conflicts |
| CI | **GitHub Actions** with explicit `lint`, `typecheck`, `test`, `build`, artifact upload on failure | High | Next 16 no longer runs lint during build; CI must enforce quality explicitly |

## Version Targets

Use **current stable majors as of 2026-03-11**, then pin exact resolved versions in `package-lock.json`.

### Core

- `next`: **16.x**
- `react`: **19.2.x**
- `react-dom`: **19.2.x**
- `typescript`: **5.9.x**
- `node`: **24.x LTS**

### UI

- `tailwindcss`: **4.1.x**
- `@tailwindcss/postcss`: matching current stable
- `lucide-react`: latest stable
- `motion`: latest stable
- `geist`: latest stable
- shadcn/ui CLI/components: latest stable compatible with Tailwind v4 / React 19

### Quality

- `eslint`: **9.x**
- `prettier`: **3.x**
- `vitest`: **4.x**
- `@playwright/test`: latest stable

## Prescriptive Architecture

### 1. App structure

Use the App Router, but keep the app simple:

- `app/layout.tsx`: fonts, metadata, global shell
- `app/page.tsx`: marketing shell + calculator composition
- `components/calculator/*`: presentation and composition
- `lib/calc/*`: pure business logic
- `lib/constants/*`: copy, limits, presets
- `lib/types/*`: shared domain types
- `tests/unit`, `tests/integration`, `tests/e2e`

### 2. Rendering strategy

Recommended:

- server-render the page chrome, copy, formula, and static explanatory sections
- isolate the interactive calculator into a small **client component boundary**
- keep all calculation logic in pure functions, imported by the client UI

Do **not** add:

- route handlers
- server actions
- database calls
- external APIs

Rationale:

- the brief explicitly says no backend and all logic client-side
- this keeps the MVP fast, honest, and easy to test
- future suite expansion still remains possible because the project keeps Next.js conventions

### 3. Domain modeling

Use explicit TypeScript types for:

- raw user input
- normalized calculator input
- validation result
- calculation result
- experimental modifier state

Keep these rules:

- parsing and unit conversion happen before calculation
- validation is pure and centralized
- the base model remains isolated from experimental modifiers
- experimental modifiers can exist in state and UI without affecting the base formula in v1

## UI Stack

### Required choices

- **Tailwind CSS 4.1**
- **shadcn/ui** with the **`new-york`** style
- **Radix primitives** through shadcn components
- **OKLCH/CSS variable tokens** in `app/globals.css` using Tailwind v4 CSS-first configuration
- **Geist Sans** for UI copy and headings
- **Geist Mono** for formula fragments, result numerics, and compact technical labels

### Why this is the right UI stack

- Tailwind v4 reduces config overhead and makes token-driven styling cleaner than older Tailwind setups
- shadcn/ui is open code, so the project owns its component layer and can keep a premium custom look
- Radix gives reliable accessibility and interaction behavior for complex primitives
- this combination is much better for a premium calculator than a generic dashboard library

### Design-system rules

- define color, radius, shadow, spacing, and type tokens once in CSS
- use shadcn primitives as a base, then compose product-specific calculator components on top
- keep the result card visually distinct from the form
- use container composition and spacing rhythm, not utility sprawl, as the primary layout tool
- use `cva` only for true variant-heavy components like buttons, badges, alerts

### Animation rules

Use Motion only for:

- initial reveal of the result card
- warning/error transitions
- accordion/collapsible panel entry/exit
- small numeric/result emphasis transitions

Do not use Motion for:

- hover effects that CSS transitions handle well
- decorative looping animation
- parallax, bouncing, or novelty effects

## State and Forms

### Recommended

- use **local state** only
- model calculator state with `useReducer`
- derive computed output from parsed/validated state
- keep presets and reset as reducer actions

### Do not use

- Redux
- Zustand
- Jotai
- XState
- React Hook Form
- Formik

Why:

- the app has a tiny, deterministic state surface
- live calculation is easier to reason about with reducer actions and pure helpers
- additional form/state libraries would increase bundle size and conceptual overhead without solving a real problem

## Testing Stack

### Test pyramid

#### Unit

Use **Vitest 4** for:

- formula correctness
- scaling logic
- unit conversion
- validation rules
- rounding/formatting
- modifier-state behavior

#### Integration / component

Use **Vitest + React Testing Library + jsdom** for:

- default render state
- live result updates
- preset application
- reset behavior
- warning display
- validation error handling
- visible separation between base model and experimental modifiers

#### End-to-end

Use **Playwright** for:

- homepage load
- primary interaction flow
- preset and reset smoke
- no-crash main path
- at least Chromium in CI, optionally Firefox/WebKit in nightly or extended CI

#### Accessibility smoke

Add **`@axe-core/playwright`** to the main homepage/user-flow E2E test.

This should not replace manual review, but it is worth running in CI because this product is form-heavy and trust-sensitive.

### Coverage policy

Recommended initial rule:

- very high confidence on `/lib/calc`
- good practical coverage on interaction-critical UI
- avoid vanity global percentages that produce brittle tests

A sensible starting target:

- `/lib/calc`: **90%+**
- overall project: **80%+** once the first test suite is stable

Confidence: Medium  
Reason: the exact thresholds are a project policy choice, but this split fits the brief well.

## Linting, Formatting, and Type Safety

### Use

- `eslint.config.mjs`
- `eslint-config-next/core-web-vitals`
- `eslint-config-next/typescript`
- `eslint-config-prettier`
- `prettier`
- `prettier-plugin-tailwindcss`
- strict TypeScript settings

### Recommended TS compiler posture

- `"strict": true`
- `"noUncheckedIndexedAccess": true`
- `"exactOptionalPropertyTypes": true`
- `"noImplicitOverride": true` where applicable
- path alias `@/*`

Confidence: High

### React Compiler

Recommendation: **enable `reactCompiler: true` in `next.config.ts`**.

Why:

- Next 16 supports it natively
- it reduces the need for defensive `useMemo` / `useCallback`
- it fits a UI-heavy app where developers can otherwise accumulate unnecessary memoization clutter

Caveat:

- build times can increase somewhat
- use normal React code first; do not force compiler-hostile patterns

Confidence: Medium-High  
Reason: source support is strong, but enabling it is still a project-level choice rather than a mandatory default.

## GitHub CI Recommendation

### Job layout

Use two jobs:

#### 1. `quality`

Run on `ubuntu-latest` with a Node matrix of:

- `24`
- `22`

Steps:

1. `actions/checkout@v6`
2. `actions/setup-node@v6`
3. `npm ci`
4. `npm run lint`
5. `npm run typecheck`
6. `npm run test:unit`
7. `npm run test:integration`
8. `npm run build`

#### 2. `e2e`

Run on `ubuntu-latest` with Node `24`.

Steps:

1. `actions/checkout@v6`
2. `actions/setup-node@v6`
3. `npm ci`
4. `npx playwright install --with-deps`
5. `npm run test:e2e`
6. upload Playwright HTML report, traces, and screenshots on failure

### CI rules

- use `npm ci`, never `npm install`
- fail fast on lint/type/type safety issues
- keep Playwright artifacts only on failure
- run E2E against the production build, not the dev server, unless local ergonomics require otherwise

Confidence: High

## Recommended Package Set

### Runtime dependencies

```txt
next
react
react-dom
lucide-react
motion
geist
clsx
tailwind-merge
class-variance-authority
```

Add shadcn/Radix component packages only as components are actually used.

### Dev dependencies

```txt
typescript
@types/node
@types/react
@types/react-dom
tailwindcss
@tailwindcss/postcss
eslint
eslint-config-next
eslint-config-prettier
prettier
prettier-plugin-tailwindcss
vitest
@vitejs/plugin-react
jsdom
vite-tsconfig-paths
@testing-library/react
@testing-library/dom
@testing-library/user-event
@playwright/test
@axe-core/playwright
```

### Conditional / only if needed

- `tw-animate-css`
  - use if generated shadcn components expect it
- `sonner`
  - use only if the UI later needs transient toast feedback

## What Not To Use

### Framework and routing

- **Do not use Pages Router**
  - App Router is the current Next.js path and matches the brief
- **Do not force `output: "export"` on day one**
  - the app is static-friendly already; locking into export mode early reduces future flexibility for the planned suite direction

### UI libraries

- **Do not use MUI, Chakra, Mantine, Ant Design, or similar full component libraries**
  - they push the app toward a generic product/admin look and fight the brief's premium custom UI goal
- **Do not use `tailwindcss-animate`**
  - shadcn has deprecated it in favor of `tw-animate-css`
- **Do not use shadcn `toast`**
  - shadcn explicitly deprecated it in favor of `sonner`

### State/forms

- **Do not use Redux/Zustand/Jotai**
  - needless abstraction for a small local calculator
- **Do not use React Hook Form/Formik**
  - this is not a submit-heavy enterprise form; manual typed state is clearer

### Testing

- **Do not use Jest**
  - Vitest is the more natural modern fit for this Next.js/Vite-powered testing setup
- **Do not use Cypress**
  - Playwright is a stronger cross-browser and CI choice for this project
- **Do not add Storybook in v1**
  - valuable for large design systems, but not the best complexity tradeoff for a focused single-tool MVP

### Product scope

- **Do not add backend, DB, auth, analytics SDK sprawl, or feature flags**
  - none of these improve the v1 core value
- **Do not add URL persistence, saved recipes, or sync features in the baseline stack**
  - useful later, but not part of the MVP trust/clarity loop

## Confidence Notes

### Overall confidence: High

Why overall confidence is high:

- the core framework, testing, and CI choices are directly supported by current official docs
- the UI stack is explicitly constrained by the project brief and validated by current shadcn/Tailwind guidance
- the main inference-heavy choices are limited to **what to intentionally leave out**, and those exclusions fit the MVP scope very well

### Lower-confidence items

- **Typography choice**: Medium
  - Geist is a clean default, but final art direction could justify a secondary accent face later
- **React Compiler enabled by default**: Medium-High
  - technically sound and source-backed, but still a project preference call
- **Coverage thresholds**: Medium
  - good starting targets, but should be tuned once the suite exists

## Primary Sources

Primary/current sources checked on 2026-03-11:

- Next.js 16 release notes: [https://nextjs.org/blog/next-16](https://nextjs.org/blog/next-16)
- Next.js App Router installation and defaults: [https://nextjs.org/docs/app/getting-started/installation](https://nextjs.org/docs/app/getting-started/installation)
- Next.js React Compiler config: [https://nextjs.org/docs/app/api-reference/config/next-config-js/reactCompiler](https://nextjs.org/docs/app/api-reference/config/next-config-js/reactCompiler)
- Next.js ESLint guidance: [https://nextjs.org/docs/app/api-reference/config/eslint](https://nextjs.org/docs/app/api-reference/config/eslint)
- Next.js testing with Vitest: [https://nextjs.org/docs/app/guides/testing/vitest](https://nextjs.org/docs/app/guides/testing/vitest)
- Next.js testing with Playwright: [https://nextjs.org/docs/app/guides/testing/playwright](https://nextjs.org/docs/app/guides/testing/playwright)
- React 19 stable: [https://react.dev/blog/2024/12/05/react-19](https://react.dev/blog/2024/12/05/react-19)
- Tailwind CSS v4 release: [https://tailwindcss.com/blog/tailwindcss-v4](https://tailwindcss.com/blog/tailwindcss-v4)
- shadcn/ui Tailwind v4 / React 19 notes: [https://ui.shadcn.com/docs/tailwind-v4](https://ui.shadcn.com/docs/tailwind-v4)
- Radix primitives overview: [https://www.radix-ui.com/primitives/docs/overview/introduction](https://www.radix-ui.com/primitives/docs/overview/introduction)
- Motion for React docs: [https://motion.dev/docs/react](https://motion.dev/docs/react)
- Lucide overview: [https://lucide.dev/](https://lucide.dev/)
- TypeScript 5.9 announcement: [https://devblogs.microsoft.com/typescript/announcing-typescript-5-9/](https://devblogs.microsoft.com/typescript/announcing-typescript-5-9/)
- Playwright docs: [https://playwright.dev/docs/intro](https://playwright.dev/docs/intro)
- Playwright accessibility testing: [https://playwright.dev/docs/next/accessibility-testing](https://playwright.dev/docs/next/accessibility-testing)
- Node.js release policy/status: [https://nodejs.org/en/about/previous-releases](https://nodejs.org/en/about/previous-releases)
- GitHub `setup-node` action: [https://github.com/actions/setup-node](https://github.com/actions/setup-node)
