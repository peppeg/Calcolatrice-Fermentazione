---
phase: 01-foundation-and-quality-baseline
plan: 01
subsystem: infra
tags: [nextjs, testing, vitest, playwright, github-actions, ci]
requires: []
provides:
  - Root Next.js 16 App Router baseline at repository root
  - Npm validation contract for lint, typecheck, unit, integration, e2e, and build
  - Vitest and Playwright smoke harnesses for future feature work
  - GitHub Actions CI matching the local quality contract
affects: [domain, ui, testing, ci]
tech-stack:
  added: [Next.js 16, React 19, TypeScript 5, Tailwind CSS 4, Vitest, Playwright, GitHub Actions]
  patterns: [script-driven quality gate, smoke-first test pyramid, CI mirrors local npm contract]
key-files:
  created: [app/page.tsx, vitest.config.ts, playwright.config.ts, tests/e2e/home.spec.ts, .github/workflows/ci.yml]
  modified: [package.json, package-lock.json, app/layout.tsx, .gitignore, .gitattributes]
key-decisions:
  - "Used a root-level Next.js bootstrap transplanted from a temporary scaffold to preserve .planning and git history."
  - "Kept validation script-driven so local development and CI execute the same contract without hidden tooling paths."
  - "Used production-style Playwright webServer startup for a more CI-stable browser smoke baseline."
patterns-established:
  - "Quality contract: lint, typecheck, unit, integration, build, and e2e must stay available as explicit npm scripts."
  - "Testing baseline: pure metadata checks at unit level, component shell rendering at integration level, browser smoke plus accessibility at e2e level."
requirements-completed: [ENG-01, ENG-02]
duration: 13 min
completed: 2026-03-11
---

# Phase 1: Foundation and Quality Baseline Summary

**Root Next.js baseline with executable quality gates, browser smoke coverage, and GitHub-ready CI enforcement**

## Performance

- **Duration:** 13 min
- **Started:** 2026-03-11T06:52:59+01:00
- **Completed:** 2026-03-11T07:05:49+01:00
- **Tasks:** 3
- **Files modified:** 19

## Accomplishments
- Bootstrapped a clean Next.js 16 App Router baseline in the real repo root without disturbing planning artifacts.
- Established the full npm validation contract with smoke coverage for unit, integration, and browser paths.
- Added GitHub Actions jobs that enforce the same quality path used locally.

## Task Commits

Each task was committed atomically:

1. **Task 1: Bootstrap the root app safely and cleanly** - `e6ff2a4` (chore)
2. **Task 2: Wire the strict test and validation contract** - `3ce91a1` (test)
3. **Task 3: Add GitHub Actions enforcement and close the phase baseline** - `c60c5a1` (ci)

## Files Created/Modified
- `package.json` - Defines the engineering contract and validation entrypoints.
- `package-lock.json` - Locks the baseline runtime, test, and CI dependencies.
- `app/layout.tsx` - Provides the initial Italian metadata shell for the product.
- `app/page.tsx` - Supplies the placeholder baseline UI that all smoke tests target.
- `vitest.config.ts` - Configures the jsdom-based unit and integration runner.
- `playwright.config.ts` - Configures the Chromium smoke test with a local production-style web server.
- `tests/setup.ts` - Registers DOM assertions and cleanup behavior.
- `tests/unit/app-shell.test.ts` - Verifies baseline metadata identity.
- `tests/integration/home-page.test.tsx` - Verifies shell rendering and core copy.
- `tests/e2e/home.spec.ts` - Verifies page reachability and basic accessibility in a browser.
- `.github/workflows/ci.yml` - Enforces quality and e2e jobs in GitHub.

## Decisions Made
- Used the newest stable Next.js baseline and kept the first page intentionally non-product so later phases can build domain work cleanly.
- Chose Vitest plus Testing Library for fast local smoke coverage and Playwright for a single browser confidence pass.
- Made `validate:quick` and `validate:full` the primary quality entrypoints to keep developer workflow and CI aligned.

## Deviations from Plan

### Auto-fixed Issues

**1. [Blocking] Vitest directory filtering missed the intended smoke files**
- **Found during:** Task 2 (Wire the strict test and validation contract)
- **Issue:** The initial `--dir` plus narrow `include` combination produced "No test files found" even though the tests existed.
- **Fix:** Broadened `vitest.config.ts` includes and switched the npm scripts to pass explicit path arguments instead of relying on directory filtering.
- **Files modified:** `package.json`, `vitest.config.ts`
- **Verification:** `npm run test:unit`, `npm run test:integration`, and `npm run validate:quick` all passed.
- **Committed in:** `3ce91a1`

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Small execution-level correction only. No scope creep and no change to phase intent.

## Issues Encountered
- Vitest and Next build hit sandbox `spawn EPERM` constraints in this environment, so final verification had to run with elevated command execution. The project configuration itself passed once the sandbox restriction was removed.
- PowerShell in this environment does not support `&&`, so commit staging and execution were split into separate commands.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- The repository now supports disciplined feature work with repeatable local and CI validation.
- Phase 2 can focus entirely on domain math and warning behavior without revisiting tooling foundations.

---
*Phase: 01-foundation-and-quality-baseline*
*Completed: 2026-03-11*
