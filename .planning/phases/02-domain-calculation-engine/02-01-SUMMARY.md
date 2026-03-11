---
phase: 02-domain-calculation-engine
plan: 01
subsystem: domain
tags: [calc, math, validation, warnings, rounding, vitest]
requires:
  - phase: 01-foundation-and-quality-baseline
    provides: Next.js baseline, Vitest contract, and CI-ready quality tooling
provides:
  - Pure `lib/calc` domain package for the empirical yeast model
  - Structured validation and warning contract for future UI phases
  - Fixed practical rounding rule for MVP outputs
  - Strong unit coverage for the calculation engine
affects: [interactive-calculator-flow, testing, ui]
tech-stack:
  added: []
  patterns: [normalized-input pipeline, errors-dominate-warnings, output-only rounding]
key-files:
  created: [lib/calc/calculate-fresh-yeast.ts, lib/calc/model.ts, lib/calc/validation.ts, tests/unit/calc/calculate-fresh-yeast.test.ts]
  modified: [lib/calc/index.ts]
key-decisions:
  - "Kept the calc engine pure and framework-free under `lib/calc` so Phase 3 can consume it without domain logic leaking into React components."
  - "Fixed the practical rounding rule to `>= 1 -> 2 decimals` and `< 1 -> 3 decimals` so SAFE-03 is deterministic and testable."
  - "Suppressed warnings whenever validation errors exist to avoid contradictory UI states in later phases."
patterns-established:
  - "Calculation pipeline: normalize -> validate -> short-circuit invalid -> raw math -> warnings -> terminal rounding"
  - "Domain contract: structured issues and warnings, inactive modifier seam, and a stable discriminated result"
requirements-completed: [SAFE-02, SAFE-03]
duration: 4 min
completed: 2026-03-11
---

# Phase 2 Plan 01: Domain Calculation Engine Summary

**Pure empirical calculation engine with canonical input normalization, sober warning behavior, fixed practical rounding, and strong numeric unit coverage**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-11T09:23:57+01:00
- **Completed:** 2026-03-11T09:27:44+01:00
- **Tasks:** 3
- **Files modified:** 15

## Accomplishments
- Established a reusable `lib/calc` package with strict types, normalization helpers, messages, and an inactive modifier seam.
- Implemented the raw empirical formula, flour scaling, field-specific validation, compact empirical warning reasons, and terminal practical rounding.
- Added strong unit coverage for normalization, model math, validation, warnings, rounding, and the full orchestrator contract.

## Task Commits

Each task was committed atomically:

1. **Task 1: Establish the calc-domain contract and canonical input layer** - `24abccb` (feat)
2. **Task 2: Implement the pure empirical calculation pipeline** - `a9204e4` (feat)
3. **Task 3: Lock the domain behavior with strong numeric tests** - `cbf2b64` (test)

## Files Created/Modified
- `lib/calc/types.ts` - Defines the domain input, normalized input, issue, warning, modifier, and result contracts.
- `lib/calc/normalize.ts` - Converts flour input into canonical grams and supplies default modifier state.
- `lib/calc/model.ts` - Implements the raw empirical grams-per-kilogram formula and flour scaling helper.
- `lib/calc/validation.ts` - Produces field-specific validation issues and the non-blocking empirical warning.
- `lib/calc/rounding.ts` - Applies the fixed practical rounding rule used by final outputs.
- `lib/calc/calculate-fresh-yeast.ts` - Orchestrates normalize, validate, calculate, warn, and round.
- `tests/unit/calc/*.test.ts` - Locks the numeric and behavioral contract of the domain package.

## Decisions Made
- Kept the entire calc engine under `lib/calc` and free of React, formatting, and UI-side heuristics.
- Fixed the MVP rounding rule at `>= 1` gram to 2 decimals and `< 1` gram to 3 decimals.
- Used field-specific validation messages and a single sober empirical warning with a compact reason.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
- Local validation still required sandbox escalation for Vitest and build worker processes in this environment, but the code and tests passed once executed outside the sandbox.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Phase 3 can now focus on the live calculator flow and consume `lib/calc` directly instead of inventing math inside UI components.
- The result contract, warning model, and validation behavior are stable enough to support form rendering and live updates.

---
*Phase: 02-domain-calculation-engine*
*Completed: 2026-03-11*
