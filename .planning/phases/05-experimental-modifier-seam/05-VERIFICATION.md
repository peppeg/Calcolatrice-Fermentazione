---
phase: 05-experimental-modifier-seam
status: passed
verified: 2026-03-12
requirements: [EXP-01, EXP-02]
score: 2/2
---

# Phase 5 Verification

## Goal

Add the advanced section and future-facing modifier architecture without contaminating the active MVP math.

## Verdict

**Passed**

The phase goal is satisfied. The calculator now includes a closed-by-default advanced section for experimental modifiers, exposes the full future-factor surface through typed UI affordances, and preserves the exact same active v1 grams output even when placeholder modifier values are present.

## Must-Have Checks

### 1. The calculator still has one active model and keeps experimental controls clearly separate
- **Status:** Passed
- **Evidence:** `components/calculator/interactive-calculator.tsx`, `components/calculator/experimental-modifiers-panel.tsx`, `components/calculator/calculator-result-panel.tsx`
- **Why it passes:** The advanced area lives inside a secondary accordion, the explanatory copy states that the placeholders do not change the estimate, and the result surface still frames one active model only.

### 2. The advanced section is closed by default and visually secondary to the main workflow
- **Status:** Passed
- **Evidence:** `components/calculator/experimental-modifiers-panel.tsx`, `tests/integration/home-page.test.tsx`, `tests/e2e/home.spec.ts`
- **Why it passes:** The advanced surface renders as a dedicated accordion with `aria-expanded="false"` on initial load, and both integration and browser coverage prove the closed-by-default behavior.

### 3. All seven future modifier categories are represented through typed affordances
- **Status:** Passed
- **Evidence:** `lib/calc/modifiers.ts`, `lib/calc/types.ts`, `components/calculator/experimental-modifiers-panel.tsx`, `tests/integration/home-page.test.tsx`
- **Why it passes:** The registry exposes hydration, salt, sugar, fat, flour strength, fermentation stage, and cold retard with typed control metadata, and the UI renders all seven categories when the accordion is opened.

### 4. Placeholder modifier interaction does not alter active grams output
- **Status:** Passed
- **Evidence:** `components/calculator/interactive-calculator.tsx`, `lib/calc/calculate-fresh-yeast.ts`, `tests/unit/calc/calculate-fresh-yeast.test.ts`, `tests/integration/home-page.test.tsx`, `tests/e2e/home.spec.ts`
- **Why it passes:** Modifier values now flow through the existing calculation contract, but unit, integration, and browser tests all prove that fresh and dry outputs stay unchanged when placeholder values are populated.

### 5. Reset clears hidden advanced state as well as the visible core form
- **Status:** Passed
- **Evidence:** `components/calculator/interactive-calculator.tsx`, `tests/integration/home-page.test.tsx`
- **Why it passes:** Reset now restores the draft, flour unit, accordion open state, and experimental placeholder values, preventing hidden stale advanced state from surviving a reset.

## Requirement Traceability

### EXP-01
- **Status:** Passed
- **Requirement:** Utente puo aprire una sezione separata dedicata ai correttivi sperimentali, chiusa di default.
- **Evidence:** `components/calculator/experimental-modifiers-panel.tsx`, `tests/integration/home-page.test.tsx`, `tests/e2e/home.spec.ts`

### EXP-02
- **Status:** Passed
- **Requirement:** Utente puo vedere i fattori futuri previsti dal prodotto senza che questi modifichino il calcolo attivo della MVP.
- **Evidence:** `lib/calc/modifiers.ts`, `components/calculator/interactive-calculator.tsx`, `tests/unit/calc/calculate-fresh-yeast.test.ts`, `tests/integration/home-page.test.tsx`, `tests/e2e/home.spec.ts`

## Validation Evidence

- `npm.cmd run typecheck` passed on 2026-03-12.
- `npm.cmd run test:unit` passed on 2026-03-12.
- `npm.cmd run test:integration` passed on 2026-03-12.
- `npx.cmd playwright test tests/e2e/home.spec.ts` passed on 2026-03-12.

## Gaps

None.

## Human Verification

No blocking human verification required for phase closure. Aesthetic review can still refine the secondary visual weight of the advanced accordion later, but the implemented behavior already satisfies the locked phase scope and trust requirements.