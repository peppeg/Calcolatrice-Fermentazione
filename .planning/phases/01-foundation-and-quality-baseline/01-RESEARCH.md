# Phase 1: Foundation and Quality Baseline - Research

**Researched:** 2026-03-11
**Domain:** Next.js 16 bootstrap, repository discipline, and automated quality gates
**Confidence:** HIGH

<user_constraints>
## User Constraints

### Required outcomes
- ENG-01 requires clear npm commands for lint, typecheck, unit test, integration test, e2e test, and build.
- ENG-02 requires a GitHub-ready CI pipeline that runs the main quality checks repeatably.
- The repo is already non-empty and contains `.planning/` artifacts plus `base.md`.
- Research must explicitly address the safest bootstrap strategy for Next.js in this situation.
- There is no `CLAUDE.md` and there are no local skill directories to preserve or regenerate.

### Phase boundary
- This phase creates the engineering baseline only.
- It should not absorb calculator logic, empirical-model implementation, or premium UI composition work from later phases.
</user_constraints>

<research_summary>
## Summary

The stack choice is already mostly settled by the project brief and prior stack research: Next.js 16 App Router, TypeScript, Tailwind, ESLint, Vitest, Playwright, npm, and GitHub Actions. The planning problem for Phase 1 is therefore not tool selection but **safe bootstrap and enforceable quality discipline**.

**Primary recommendation:** scaffold a minimal Next.js app in a **temporary sibling directory** with `create-next-app --empty`, then transplant only the generated app/config files into the real repo root. This is the safest approach because the current `create-next-app` implementation still resolves the target path, creates it if needed, and aborts if `isFolderEmpty(root, appName)` fails. In this repository, the root is intentionally non-empty because `.planning/` and `base.md` already exist and must remain untouched. A temp-directory scaffold avoids generator friction, nested Git metadata, and accidental interaction with planning artifacts.

**Planning implication:** Phase 1 should end with a minimal placeholder homepage, strict npm script contract, real unit/integration/E2E harnesses, and one GitHub Actions workflow split into a fast `quality` job and a heavier `e2e` job.
</research_summary>

<standard_stack>
## Standard Stack

### Core baseline
| Area | Decision | Why this is the planning default |
|------|----------|----------------------------------|
| Framework | Next.js 16 App Router | Current stable major; official default direction |
| Language | TypeScript 5.x strict mode | Best fit for later domain logic and shared types |
| Runtime | Node 24.x | Current Active LTS; simplest single-runtime baseline |
| Package manager | npm | Explicit project constraint; deterministic `package-lock.json` |
| Styling baseline | Tailwind CSS 4.x | Matches stack research and current Next ecosystem |
| Linting | ESLint flat config with `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript` | Official Next.js 16 path |
| Formatting | Prettier 3 + `prettier-plugin-tailwindcss` | Keeps Tailwind-heavy JSX readable without review noise |
| Unit/integration tests | Vitest + React Testing Library + jsdom | Officially supported modern path |
| E2E | Playwright | Best fit for CI-backed browser smoke |
| CI | GitHub Actions | Matches ENG-02 and repo-readiness goal |

### What should be initialized in Phase 1
- App Router app skeleton in the repo root
- Tailwind baseline and global CSS entrypoint
- ESLint flat config
- Prettier config
- Vitest config and setup file
- Playwright config with a stable local server strategy
- `.github/workflows/ci.yml`
- `.gitignore`, `.gitattributes`, and committed lockfile

### What can wait until later phases
- broad shadcn/ui component installation
- motion usage beyond maybe a placeholder dependency decision
- calculator domain folders beyond empty placeholders if planning wants them
- design-token refinement beyond what Tailwind/global CSS need to compile cleanly
</standard_stack>

<architecture_patterns>
## Architecture Patterns

### Pattern 1: Temp scaffold, then transplant
**Use this pattern for this repo.**

Reasoning:
- official CLI options now include `--empty`, `--skip-install`, and `--disable-git`
- the current `create-next-app` source still checks `isFolderEmpty(root, appName)` before continuing
- the repo root already contains protected planning artifacts

Recommended command:

```bash
npx create-next-app@latest fermentazione-bootstrap --use-npm --ts --eslint --tailwind --app --import-alias "@/*" --empty --disable-git --skip-install --yes
```

Transplant rule:
- generate in a temporary sibling directory, not the real repo root
- copy only app/config files into the real repo root
- preserve `.git/`, `.planning/`, and `base.md` untouched
- install dependencies once from the real repo root so the committed lockfile belongs to the actual project

### Pattern 2: Script contract first
All quality tools should be entered through npm scripts. CI must call those scripts rather than raw tool invocations, except for browser installation.

Required script names for planning:
- `lint`
- `typecheck`
- `test`
- `test:unit`
- `test:integration`
- `test:e2e`
- `build`
- `validate:quick`
- `validate:full`

### Pattern 3: Minimal proof app
Phase 1 should ship one intentionally small home route that proves:
- the app boots
- typechecking and linting are wired
- component/integration testing can mount the UI
- Playwright can open the app in CI

This page is a harness target, not a first version of the calculator.

### Pattern 4: CI split by cost
Use two jobs in one workflow:
- `quality`: lint, typecheck, unit, integration, build
- `e2e`: Playwright smoke after `quality` passes

This matches the user's strict-baseline requirement without paying browser-install cost before basic checks pass.
</architecture_patterns>

<dont_hand_roll>
## Don't Hand-Roll

| Problem | Do not build | Use instead | Why |
|---------|--------------|-------------|-----|
| App bootstrap | manual file-by-file recreation of the official scaffold as the primary path | `create-next-app --empty` in a temp directory | safer and lower churn than reinventing the baseline |
| Lint execution | `next lint` or custom wrapper scripts | explicit ESLint CLI via npm scripts | `next lint` is removed in Next.js 16 |
| Browser smoke | manual browser checklist | Playwright | repeatable and CI-friendly |
| Test orchestration | ad hoc shell glue | npm scripts + GitHub Actions jobs | one stable contract for dev and CI |
| Accessibility smoke | custom DOM heuristics | `@axe-core/playwright` if included | cheap, known tooling |

Key planning rule: Phase 1 should compose standard tooling, not invent infrastructure.
</dont_hand_roll>

<common_pitfalls>
## Common Pitfalls

### Pitfall 1: Running `create-next-app` directly in the existing repo root
**Why it happens:** people assume a mostly empty repo is functionally empty.
**Why it is wrong here:** `.planning/` and `base.md` are already authoritative project inputs; the current CLI still performs a folder-empty guard before continuing.
**Avoidance:** scaffold in a temp sibling directory and transplant.

### Pitfall 2: Treating `next build` as a complete quality gate
**Why it happens:** that used to be a common assumption.
**Why it is wrong here:** Next.js 16 removed `next lint`, and `next build` no longer runs linting.
**Avoidance:** lint must be an explicit script and an explicit CI step.

### Pitfall 3: Making Phase 1 tests pretend product logic already exists
**Why it happens:** teams want to show lots of test files early.
**Why it is wrong here:** fake domain tests create churn and couple the baseline to unimplemented behavior.
**Avoidance:** test the harness in this phase: placeholder page render, one small pure helper, one E2E smoke.

### Pitfall 4: Over-automating local hooks
**Why it happens:** strictness is mistaken for running everything on every commit.
**Why it is wrong here:** the user asked for moderate local automation, not friction-heavy iteration.
**Avoidance:** if hooks are added, keep them narrow. CI remains the hard gate.

### Pitfall 5: Forgetting Windows-to-Linux repo hygiene
**Why it happens:** the active machine is Windows, but CI will run on Linux.
**Why it matters:** line-ending churn and script portability issues show up immediately in config-heavy phases.
**Avoidance:** add `.gitattributes` early and normalize to LF.
</common_pitfalls>

## Validation Architecture

### Required commands

Quick validation command:

```bash
npm run validate:quick
```

Full validation command:

```bash
npm run validate:full
```

Expanded quick path:

```bash
npm run lint
npm run typecheck
npm run test:unit
```

Expanded full path:

```bash
npm run lint
npm run typecheck
npm run test:unit
npm run test:integration
npm run build
npm run test:e2e
```

CI setup/install path:

```bash
npm ci
npx playwright install --with-deps
```

### Sampling guidance

Always run after meaningful config or code changes in this phase:
- `npm run lint`
- `npm run typecheck`
- `npm run test:unit`

Run `npm run test:integration` whenever:
- the placeholder page or shared test setup changes
- path aliases or React testing setup changes
- the app shell used by the smoke integration test changes

Run `npm run build` whenever:
- Next config changes
- Tailwind/PostCSS config changes
- package metadata changes
- routing or root layout changes

Run `npm run test:e2e` whenever:
- Playwright is first wired
- Playwright config or `webServer` behavior changes
- the placeholder page markup used by the smoke test changes
- the phase is being closed out

### Full-gate rule

Before Phase 1 can be considered complete, one full pass must be green across:
- lint
- typecheck
- unit tests
- integration tests
- production build
- E2E smoke
- CI workflow parity with the local script contract
</validation_architecture>

<code_examples>
## Code Examples

### Recommended npm script surface

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "npm run test:unit && npm run test:integration",
    "test:unit": "vitest --run --project unit",
    "test:integration": "vitest --run --project integration",
    "test:e2e": "playwright test",
    "validate:quick": "npm run lint && npm run typecheck && npm run test:unit",
    "validate:full": "npm run lint && npm run typecheck && npm run test:unit && npm run test:integration && npm run build && npm run test:e2e"
  }
}
```

### Recommended Playwright posture

```ts
import { defineConfig } from '@playwright/test'

export default defineConfig({
  use: {
    baseURL: 'http://127.0.0.1:3000',
  },
  webServer: {
    command: 'npm run build && npm run start -- --hostname 127.0.0.1 --port 3000',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !process.env.CI,
  },
})
```

### Recommended CI skeleton

```yaml
jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: actions/setup-node@v6
        with:
          node-version: 24
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm run test:unit
      - run: npm run test:integration
      - run: npm run build

  e2e:
    needs: quality
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: actions/setup-node@v6
        with:
          node-version: 24
          cache: npm
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run test:e2e
```
</code_examples>

<planning_inputs>
## What Planning Needs To Decide Explicitly

### Must-fix decisions
1. Whether the phase includes only script/CI/test harness setup or also a minimal shadcn initialization file set.
2. Whether lightweight pre-commit automation is included now or deferred.
3. Whether Phase 1 adds only one browser smoke in Chromium or also prepares broader browser coverage for later.

### Decisions that should default now
- bootstrap via temp scaffold + transplant
- Node 24 as the single required runtime for this phase
- explicit ESLint CLI, not `next lint`
- Vitest for unit/integration and Playwright for E2E
- one workflow with `quality` and `e2e` jobs
- no agent-specific repo files (`CLAUDE.md`, local skills) introduced in this phase
</planning_inputs>

<sources>
## Sources

### Primary official sources
- Next.js installation docs: <https://nextjs.org/docs/app/getting-started/installation>
- `create-next-app` CLI docs: <https://nextjs.org/docs/app/api-reference/cli/create-next-app>
- Current `create-next-app` source: <https://raw.githubusercontent.com/vercel/next.js/canary/packages/create-next-app/create-app.ts>
- Next.js 16 release notes: <https://nextjs.org/blog/next-16>
- Next.js ESLint docs: <https://nextjs.org/docs/app/api-reference/config/eslint>
- Next.js Vitest guide: <https://nextjs.org/docs/app/guides/testing/vitest>
- Next.js Playwright guide: <https://nextjs.org/docs/app/guides/testing/playwright>
- Playwright accessibility guide: <https://playwright.dev/docs/next/accessibility-testing>
- Node.js release status: <https://nodejs.org/en/about/previous-releases>
- GitHub `actions/setup-node`: <https://github.com/actions/setup-node>
- GitHub `actions/checkout`: <https://github.com/actions/checkout>

### Local project sources
- `C:/Users/peppeg/MyFilez/Fermentazione/.planning/phases/01-foundation-and-quality-baseline/01-CONTEXT.md`
- `C:/Users/peppeg/MyFilez/Fermentazione/.planning/REQUIREMENTS.md`
- `C:/Users/peppeg/MyFilez/Fermentazione/.planning/STATE.md`
- `C:/Users/peppeg/MyFilez/Fermentazione/.planning/research/STACK.md`
- `C:/Users/peppeg/MyFilez/Fermentazione/base.md`
</sources>

<metadata>
## Metadata

**Research scope:** bootstrap safety, repo discipline, npm script contract, test harness selection, CI job split, validation loop

**Confidence breakdown:**
- bootstrap strategy: HIGH
- script and CI contract: HIGH
- local automation details: MEDIUM
- shadcn initialization timing in this phase: MEDIUM

**Ready for planning:** yes
</metadata>

---
*Phase: 01-foundation-and-quality-baseline*
*Research completed: 2026-03-11*
*Ready for planning: yes*
