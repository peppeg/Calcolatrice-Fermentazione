---
phase: 05-experimental-modifier-seam
plan: 01
subsystem: ui
tags: [nextjs, react, advanced-ui, no-op-seam, vitest, playwright]
requires:
  - phase: 02-domain-calculation-engine
    provides: typed modifier seam, normalized input contract, no-op domain behavior
  - phase: 04-trust-centered-premium-presentation
    provides: premium calculator shell, result trust context, secondary explanatory surfaces
provides:
  - closed-by-default advanced accordion for experimental modifiers
  - typed future-factor registry aligned with the existing domain seam
  - no-op placeholder modifier wiring through the active calculator flow
  - unit, integration, and browser regression coverage for the inactive experimental seam
affects: []
tech-stack:
  added: []
  patterns: [typed-modifier-registry, secondary-advanced-accordion, no-op-placeholder-state, trust-preserving-regressions]
key-files:
  created:
    - components/calculator/experimental-modifiers-panel.tsx
  modified:
    - components/calculator/interactive-calculator.tsx
    - lib/calc/modifiers.ts
    - lib/calc/types.ts
    - tests/unit/calc/calculate-fresh-yeast.test.ts
    - tests/integration/home-page.test.tsx
    - tests/e2e/home.spec.ts
key-decisions:
  - Keep all seven future modifier categories visible, but clearly separate them from the active v1 model.
  - Let users compile placeholder modifier values while preserving the exact same grams output.
  - Keep advanced state inside the calculator boundary so reset can clear both visible and hidden state reliably.
  - Reuse the existing result trust surface to state when modifier values are present but inactive.
patterns-established:
  - "Future modeling scope can be explored through typed placeholder controls without contaminating active math."
  - "Reset semantics must include advanced hidden state, not only the visible core form."
requirements-completed: [EXP-01, EXP-02]
duration: 45min
completed: 2026-03-12
---

# Phase 5 Plan 01: Experimental Modifier Seam Summary

**Advanced experimental accordion, typed future-factor registry, no-op modifier wiring, and regression coverage**

## Performance

- **Duration:** 45 min
- **Started:** 2026-03-12T07:05:00Z
- **Completed:** 2026-03-12T07:50:00Z
- **Tasks:** 3
- **Files modified:** 6
- **Files created:** 1

## Accomplishments
- Added a sober advanced accordion inside the calculator flow, closed by default and clearly secondary to the active estimator.
- Exposed all seven future modifier categories through typed affordances aligned with the existing calc seam.
- Wired placeholder modifier state through `calculateFreshYeast` without changing grams output, warnings, or the active v1 model.
- Extended unit, integration, and browser coverage so modifier presence is now explicitly protected as a no-op seam.

## Task Commits

Atomic task commits were intentionally skipped for this execution because the repository already contained open copy/UI changes in overlapping files. The phase was completed in the working tree without reverting or splitting those existing edits.

## Files Created/Modified
- `components/calculator/experimental-modifiers-panel.tsx` - Hosts the advanced accordion and the future-factor controls.
- `components/calculator/interactive-calculator.tsx` - Owns accordion state, placeholder modifier state, result honesty, and reset coverage for hidden advanced state.
- `lib/calc/modifiers.ts` - Centralizes modifier metadata, labels, and no-op state helpers for both UI and domain reuse.
- `lib/calc/types.ts` - Extends the typed modifier contract with control metadata support.
- `tests/unit/calc/calculate-fresh-yeast.test.ts` - Proves populated modifier state still leaves the active math untouched.
- `tests/integration/home-page.test.tsx` - Verifies advanced-section behavior, result stability, and reset semantics.
- `tests/e2e/home.spec.ts` - Browser smoke for the advanced accordion plus accessibility after interaction.

## Decisions Made
- Kept the advanced seam inside the calculator boundary instead of adding a separate page block or modal workflow.
- Modeled the future factors with differentiated affordances rather than a flat text list: numeric inputs, selects, and a toggle.
- Used the existing `appliedModifiers` summary path to keep the result panel honest when placeholder values are present.
- Preserved the active model framing so the new controls read as future scope, not hidden active heuristics.

## Deviations from Plan

### Auto-fixed Issues

None.

---

**Total deviations:** 0
**Impact on plan:** None.

## Issues Encountered
- Vitest still requires execution outside the sandbox on this Windows setup because `esbuild` fails with `spawn EPERM` inside the restricted environment.
- The repository already contained open UI/copy edits in some overlapping files, so phase closure was handled without introducing a forced commit boundary.

## User Setup Required

None.

## Next Phase Readiness
- The v1 milestone now includes the full future-facing modifier seam without weakening the honesty of the active estimator.
- Any later validated advanced modeling can now hook into a visible, typed, and regression-protected surface instead of starting from scratch.
- The milestone is ready for milestone audit/closure rather than further feature expansion inside v1.

---
*Phase: 05-experimental-modifier-seam*
*Completed: 2026-03-12*