---
phase: 03-interactive-calculator-flow
plan: 01
subsystem: ui
tags: [nextjs, react, calculator, forms, vitest, playwright]
requires:
  - phase: 02-domain-calculation-engine
    provides: pure calc engine with validation, warnings, and rounded outputs
provides:
  - live calculator UI mounted from the homepage
  - string-based draft parsing seam for incomplete and malformed input
  - dual-surface validation feedback with a stable result panel
  - integration and e2e smoke coverage for presets, reset, and warnings
affects: [phase-4-presentation, phase-5-experimental-seam]
tech-stack:
  added: []
  patterns: [server-shell-plus-client-boundary, string-draft-form-state, mounted-result-panel, dual-surface-validation-feedback]
key-files:
  created:
    - components/calculator/interactive-calculator.tsx
    - components/calculator/calculator-result-panel.tsx
    - lib/calc/calculator-draft.ts
  modified:
    - app/page.tsx
    - lib/calc/messages.ts
    - tests/integration/home-page.test.tsx
    - tests/e2e/home.spec.ts
key-decisions:
  - Keep `app/page.tsx` server-rendered and mount a focused client calculator boundary.
  - Model editable values as strings so blank, malformed, zero, and negative states stay distinguishable.
  - Keep the result region mounted across guidance, invalid, success, and warning states.
  - Show validation feedback both near fields and in the result-area summary, naming affected fields explicitly.
patterns-established:
  - "Client calculator state stays in UI-only draft helpers while domain truth remains in `calculateFreshYeast`."
  - "Interactive homepage flows are verified with unit + integration + Playwright smoke before phase closure."
requirements-completed: [CALC-01, CALC-02, CALC-03, CALC-04, CALC-05, SAFE-01]
duration: 55min
completed: 2026-03-11
---

# Phase 3 Plan 01: Interactive Calculator Flow Summary

**Live calculator flow with string draft-state, mounted result orchestration, presets/reset, and browser-backed regression coverage**

## Performance

- **Duration:** 55 min
- **Started:** 2026-03-11T09:36:31Z
- **Completed:** 2026-03-11T10:31:31Z
- **Tasks:** 3
- **Files modified:** 8

## Accomplishments
- Replaced the placeholder homepage with a real interactive calculator mounted from a server-rendered shell.
- Added a UI-only draft parsing seam that cleanly separates missing and malformed input from domain validation.
- Locked the user flow with integration coverage and a Playwright smoke that exercises live updates, presets, reset, and accessibility.

## Task Commits

Each task was committed atomically:

1. **Task 1: Create the calculator draft-state and parsing seam** - `22c629b` (feat)
2. **Task 2: Replace the placeholder shell with the live calculator, stable result panel, presets, and reset** - `affab5c` (feat)
3. **Task 3: Replace placeholder test coverage with calculator interaction and accessibility checks** - `622eacb` (test)

**Plan metadata:** recorded in the phase-closing docs commit for this execution.

## Files Created/Modified
- `components/calculator/interactive-calculator.tsx` - Owns draft state, preset/reset actions, and live result derivation.
- `components/calculator/calculator-result-panel.tsx` - Keeps the result area mounted across guidance, invalid, success, and warning states.
- `lib/calc/calculator-draft.ts` - Parses string drafts into missing, malformed, or domain-ready calculator input.
- `app/page.tsx` - Mounts the new calculator inside the homepage shell.
- `tests/integration/home-page.test.tsx` - Covers live updates, invalid states, warnings, presets, and reset.
- `tests/e2e/home.spec.ts` - Browser smoke plus axe verification for the calculator experience.
- `lib/calc/messages.ts` - Normalized encoding so the client build can consume domain copy safely.

## Decisions Made
- Kept all numeric truth in `calculateFreshYeast` and limited UI validation to presence and parseability.
- Treated initial load as a guidance state rather than a prefilled success state, to keep the tool honest and explicit.
- Used text inputs with decimal input mode so malformed values can be represented and corrected cleanly.
- Presets only touch temperature and time; reset restores a fully blank initial draft and clears preset selection.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Normalized `lib/calc/messages.ts` encoding for client builds**
- **Found during:** Task 3 (Playwright smoke verification)
- **Issue:** Next.js/Turbopack refused to parse the file because it contained invalid UTF-8 bytes when imported by the client calculator.
- **Fix:** Rewrote the file in clean UTF-8 without changing the domain copy contract.
- **Files modified:** `lib/calc/messages.ts`
- **Verification:** `npm.cmd run typecheck`, `npm.cmd run validate:quick`, and `npm.cmd run test:e2e`
- **Committed in:** `dd1ac54`

**2. [Rule 3 - Blocking] Normalized `.planning/config.json` encoding for GSD tooling**
- **Found during:** Phase orchestration before execution and verification loops
- **Issue:** `gsd-tools` failed to parse config because the file contained a BOM.
- **Fix:** Rewrote the file in clean UTF-8 so workflow commands could run reliably.
- **Files modified:** `.planning/config.json`
- **Verification:** `node "$HOME/.codex/get-shit-done/bin/gsd-tools.cjs" config-get workflow.nyquist_validation`
- **Committed in:** `37e440d`

---

**Total deviations:** 2 auto-fixed (2 blocking)
**Impact on plan:** Both fixes were required to complete the planned verification path. No scope creep.

## Issues Encountered
- Vitest and Playwright could not spawn reliably inside the sandbox on Windows, so unit, integration, quick validation, smoke e2e, and full e2e verification were rerun successfully outside the sandbox.
- The first distributed executor agent stalled after Task 1, so execution was resumed in the main context without losing completed work.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Phase 4 can focus on premium presentation, formula transparency, and editorial trust copy without rebuilding the calculator flow.
- The calculator already exposes the stable mounted result states and warning surfaces that later presentation work can refine.
- Experimental modifier controls are still absent, which keeps the Phase 5 seam clean.

---
*Phase: 03-interactive-calculator-flow*
*Completed: 2026-03-11*