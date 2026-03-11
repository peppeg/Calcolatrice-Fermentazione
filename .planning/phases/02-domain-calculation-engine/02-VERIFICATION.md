---
phase: 02-domain-calculation-engine
status: passed
verified: 2026-03-11
requirements: [SAFE-02, SAFE-03]
score: 2/2
---

# Phase 2 Verification

## Goal

Implement the empirical model, normalization, validation primitives, and trustworthy numerical behavior.

## Verdict

**Passed**

The phase goal is satisfied. The repository now contains a pure, reusable domain calculation package that normalizes flour units, validates numeric input, emits sober non-blocking empirical warnings, applies a deterministic practical rounding rule, and is protected by strong numeric unit tests.

## Must-Have Checks

### 1. Pure domain engine exists and is reusable
- **Status:** Passed
- **Evidence:** `lib/calc/index.ts`, `lib/calc/calculate-fresh-yeast.ts`, `lib/calc/model.ts`, `lib/calc/types.ts`
- **Why it passes:** The calculation logic lives under `lib/calc`, exports a stable public API, and stays free of React, browser, and formatting concerns.

### 2. Canonical normalization, validation, and warning pipeline exists
- **Status:** Passed
- **Evidence:** `lib/calc/normalize.ts`, `lib/calc/validation.ts`, `lib/calc/messages.ts`
- **Why it passes:** The engine normalizes flour units to grams, validates each numeric field specifically, suppresses warnings on invalid results, and emits a single compact empirical warning when temperature or time leave the reference interval.

### 3. Practical rounding is deterministic and testable
- **Status:** Passed
- **Evidence:** `lib/calc/rounding.ts`, `tests/unit/calc/rounding.test.ts`
- **Why it passes:** The rounding rule is fixed at `>= 1 -> 2 decimals` and `< 1 -> 3 decimals`, and the boundary behavior is covered by unit tests.

### 4. Domain behavior is locked by reliable unit coverage
- **Status:** Passed
- **Evidence:** `tests/unit/calc/model.test.ts`, `tests/unit/calc/validation.test.ts`, `tests/unit/calc/calculate-fresh-yeast.test.ts`
- **Why it passes:** Tests cover the empirical formula, flour scaling, normalization, validation failures, warning boundaries, modifier no-op behavior, and a small monotonicity sweep.

## Requirement Traceability

### SAFE-02
- **Status:** Passed
- **Requirement:** Utente riceve un warning non bloccante quando usa il modello fuori dall'intervallo empirico di riferimento.
- **Evidence:** `lib/calc/validation.ts`, `tests/unit/calc/validation.test.ts`, `tests/unit/calc/calculate-fresh-yeast.test.ts`

### SAFE-03
- **Status:** Passed
- **Requirement:** Utente vede valori arrotondati in modo pratico per uso reale, senza falsa precisione.
- **Evidence:** `lib/calc/rounding.ts`, `tests/unit/calc/rounding.test.ts`, `tests/unit/calc/calculate-fresh-yeast.test.ts`

## Validation Evidence

- `npm run test:unit` passed on 2026-03-11.
- `npm run validate:quick` passed on 2026-03-11.
- `npm run typecheck` passed on 2026-03-11.
- `npm run lint` passed on 2026-03-11 via `validate:quick`.
- `npm run build` passed on 2026-03-11 via `validate:quick`.

## Gaps

None.

## Human Verification

None required for this phase.
