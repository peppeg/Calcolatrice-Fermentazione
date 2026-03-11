---
phase: 04-trust-centered-premium-presentation
plan: 01
subsystem: ui
tags: [nextjs, react, editorial-ui, accessibility, vitest, playwright]
requires:
  - phase: 03-interactive-calculator-flow
    provides: live calculator boundary, result states, presets, reset, integration smoke
  - phase: 03.1-empirical-model-realignment
    provides: stabilized ambient-use model and trustworthy warning behavior
provides:
  - premium editorial homepage shell around the calculator
  - dedicated model transparency block with formula, limits, and disclaimer
  - richer result trust context for active scenario and experimental status
  - integration and browser accessibility coverage for the trust-centered presentation
affects: [phase-5-experimental-seam]
tech-stack:
  added: []
  patterns: [server-shell-premium-composition, dedicated-transparency-block, trust-context-result-panel, accessibility-backed-ui-polish]
key-files:
  created:
    - components/calculator/model-transparency-panel.tsx
  modified:
    - app/page.tsx
    - components/calculator/interactive-calculator.tsx
    - components/calculator/calculator-result-panel.tsx
    - tests/integration/home-page.test.tsx
    - tests/e2e/home.spec.ts
key-decisions:
  - Keep the calculator as the product center and mount model transparency below the tool rather than burying it in the result card.
  - Expose the active formula and empirical limits directly on the page, but keep them visually secondary to the workflow.
  - Add explicit scenario and experimental-status context to the success result instead of pretending the raw gram value is self-explanatory.
  - Favor restrained surfaces and subtle transitions over heavier dashboard chrome or motion.
patterns-established:
  - "Trust presentation lives in dedicated UI surfaces while the calc engine remains untouched."
  - "Phase-closing browser smoke must include accessibility validation for premium UI work."
requirements-completed: [TRAN-01, TRAN-02, TRAN-03, UX-01, UX-02, UX-03]
duration: 95min
completed: 2026-03-11
---

# Phase 4 Plan 01: Trust-Centered Premium Presentation Summary

**Premium editorial shell, explicit model transparency, richer result context, and accessibility-backed regression coverage**

## Performance

- **Duration:** 95 min
- **Started:** 2026-03-11T18:59:00Z
- **Completed:** 2026-03-11T20:34:00Z
- **Tasks:** 3
- **Files modified:** 6

## Accomplishments
- Refined the homepage into a more editorial, premium composition while keeping the live calculator as the clear center of the product.
- Added a dedicated transparency block that makes the formula, reliability window, and disclaimer visible without turning the experience into pseudo-science.
- Expanded the result surface so users can read the active scenario and experimental-modifier status instead of trusting only a bare numeric output.
- Locked the new presentation with integration and Playwright coverage, including an axe-backed accessibility pass.

## Task Commits

Each task was committed atomically where practical:

1. **Tasks 1-2: Premium shell + transparency/result trust layer** - `1d8a7ac` (feat)
2. **Task 2 follow-up: accessibility and encoding hardening** - `c18d953` (fix)
3. **Task 3: regression coverage for the premium trust surface** - `cd81865` (test)

**Plan metadata:** recorded in the phase-closing docs commit for this execution.

## Files Created/Modified
- `components/calculator/model-transparency-panel.tsx` - Hosts the explicit formula, reliability window, and disclaimer block below the calculator.
- `app/page.tsx` - Reframes the homepage into a compact editorial shell with clearer premium hierarchy.
- `components/calculator/interactive-calculator.tsx` - Tightens tool presentation, improves preset accessibility, and feeds richer success-state context into the result panel.
- `components/calculator/calculator-result-panel.tsx` - Presents scenario context, model identity, and experimental-status information alongside the yeast outputs.
- `tests/integration/home-page.test.tsx` - Verifies hero, transparency block, result trust context, and core calculator behavior together.
- `tests/e2e/home.spec.ts` - Browser smoke for premium composition plus accessibility scan.

## Decisions Made
- Kept formula and limits in a dedicated secondary block instead of squeezing them into the result card.
- Exposed "Correttivi sperimentali inattivi nella v1" as explicit context rather than inventing inactive controls before Phase 5.
- Switched the selected preset styling to a higher-contrast active state after axe flagged the first version.
- Replaced fragile literal special characters with Unicode escapes in the edited UI/test files to keep the repository stable under the current Windows tooling path.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Normalized edited UI files to encoding-safe strings**
- **Found during:** build and browser verification
- **Issue:** initial PowerShell writes introduced encoding instability that broke Next.js parsing and produced replacement characters in browser output.
- **Fix:** rewrote the affected strings using explicit Unicode escapes and rewrote the files in clean UTF-8.
- **Files modified:** `app/page.tsx`, `components/calculator/interactive-calculator.tsx`, `components/calculator/model-transparency-panel.tsx`, `tests/integration/home-page.test.tsx`, `tests/e2e/home.spec.ts`
- **Verification:** `npm.cmd run validate:quick`, `npm.cmd run test:e2e`
- **Committed in:** `c18d953`, `cd81865`

**2. [Rule 3 - Blocking] Accessibility issues found by Playwright axe scan**
- **Found during:** e2e verification
- **Issue:** the first active preset styling had insufficient contrast, and the initial smoke flow was too eager against hydration timing.
- **Fix:** raised preset contrast, removed the unnecessary nested landmark, and stabilized the browser smoke around a preset-driven interaction.
- **Files modified:** `components/calculator/interactive-calculator.tsx`, `tests/e2e/home.spec.ts`
- **Verification:** `npm.cmd run test:e2e`
- **Committed in:** `c18d953`, `cd81865`

---

**Total deviations:** 2 auto-fixed (2 blocking)
**Impact on plan:** No scope creep; both fixes were required to satisfy the planned accessibility and browser verification path.

## Issues Encountered
- Vitest/esbuild spawning remains unreliable inside the sandbox on this Windows setup, so the blocking verification commands were rerun outside the sandbox.
- PowerShell default write behavior was not safe for these JSX/text files without explicit UTF-8 handling.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Phase 5 can add the experimental modifier seam on top of a page that already communicates what is active and what is not.
- The calculator now has explicit trust surfaces, so future advanced controls can remain clearly separated from the active model.
- The premium shell is stable enough that Phase 5 can focus on architecture and disclosure rather than aesthetic rescue work.

---
*Phase: 04-trust-centered-premium-presentation*
*Completed: 2026-03-11*
