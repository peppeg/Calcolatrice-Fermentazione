# Phase 5: Experimental Modifier Seam - Research

**Date:** 2026-03-12
**Phase:** 5
**Status:** Complete

## What This Phase Actually Needs To Solve

Phase 5 is not a modeling phase. The active estimator is already calibrated, the current result surface already communicates that experimental modifiers are inactive, and the domain layer already contains a typed no-op seam for future factors. The planning problem is narrower and more product-sensitive: expose that future surface in the UI without diluting trust, changing the active math, or making the advanced area feel like a half-enabled hidden mode.

The implementation has to solve three things at once:
- add a closed-by-default advanced area that feels secondary, not like a second calculator;
- let users see and interact with all seven future factor categories;
- prove, in code and tests, that those interactions do not change the current v1 result.

## Current Baseline And Constraints

### What already exists and should be preserved
- `lib/calc/types.ts` already defines `ExperimentalModifierState` plus the seven modifier keys.
- `lib/calc/modifiers.ts` already creates the inactive default state and summarizes active placeholder values without altering numeric output.
- `calculateFreshYeast` already includes the modifier seam in its contract and has unit coverage proving the current no-op behavior.
- `InteractiveCalculator` already owns local UI state, presets, reset, and result-state derivation, so it is the correct host for any advanced-section state.
- The Phase 4 page hierarchy and trust tone are now fixed and should not be destabilized.

### What should not change in this phase
- The base formula, short-time correction, warning semantics, and rounding behavior must remain untouched.
- Phase 5 should not activate validated correction logic for hydration, salt, sugar, fat, flour strength, fermentation stage, or fridge behavior.
- The advanced section should not become a new route, drawer workflow, or pseudo-expert mode.
- The product should remain one standalone calculator rather than drifting into suite navigation or a multi-step wizard.

## Planning Implications

### 1. Reuse the existing domain seam instead of inventing a second future-proof layer
The cleanest plan is to keep the current modifier contract and extend it just enough for UI consumption. A small exported registry or metadata structure that stays aligned with the existing modifier keys is more useful than creating new empty architecture. That keeps the seven categories in one durable place and avoids UI/domain drift.

### 2. Treat the advanced section as calculator-local state, not page-shell state
`InteractiveCalculator` already owns reset, presets, and the draft/result lifecycle. The experimental accordion open/closed state and placeholder modifier values should stay inside that boundary or in a child component mounted from it. That preserves the server page shell, keeps reset logic simple, and avoids scattering state across unrelated layers.

### 3. Compilable but inactive controls are the right middle ground
The user's decisions lock the phase toward real controls that can be filled, but that still means the UX must constantly tell the truth:
- these values are not applied to the current estimate;
- they exist to show planned scope;
- the result shown above is still driven only by temperature, time, and flour.

The safest implementation is to make that status visible both inside the accordion and in the result context that already exists.

### 4. The seven factors need differentiated affordances, not one generic text list
To make the future scope understandable without promising active math, the controls should fit the shape of each factor:
- hydration, salt, sugar, fat -> numeric placeholder inputs;
- flour strength -> select or constrained textual choice;
- fermentation stage -> select;
- cold retard -> boolean or discrete toggle style.

This improves future readiness and makes the product feel intentional without activating any coefficient logic.

### 5. Reset semantics and no-op guarantees are core trust behaviors in this phase
Because the section is closed by default and secondary, the main user trust risk is hidden state. The plan must explicitly cover:
- reset restoring the accordion state and modifier placeholder state;
- base result staying identical before and after modifier interaction;
- result/status copy remaining honest when placeholder values are present.

## Recommended Implementation Shape

### Registry / metadata layer
Create or extend a typed modifier registry that provides:
- key;
- user-facing label;
- control kind;
- optional helper copy or placeholder;
- any lightweight options for select-style fields.

This registry should stay aligned with the domain seam and remain explicitly non-numeric in effect.

### Calculator composition
Keep `InteractiveCalculator` as the owner of:
- accordion open/closed state;
- modifier draft state;
- reset behavior;
- handoff into `calculateFreshYeast` using the existing `modifiers` contract.

A dedicated child component for the advanced area is still recommended so the main calculator file does not become a monolith.

### Result/trust composition
The result panel already renders the modifier status. Phase 5 should preserve that and, if necessary, sharpen the wording when placeholder values are present so users understand the modifiers are present but not applied.

## Risks To Plan Around

### Risk: Experimental controls look active because they behave like normal form inputs
Mitigation: keep the accordion visually secondary, add clear inactive copy near the controls, and preserve result-panel messaging that explicitly says the values are not applied in v1.

### Risk: Reset misses hidden advanced state
Mitigation: keep accordion and modifier state inside the calculator boundary and add integration coverage that opens the section, edits values, resets, and confirms full restoration.

### Risk: UI metadata drifts from the domain seam
Mitigation: use one typed registry keyed by `ExperimentalModifierKey` instead of duplicating seven ad hoc labels and field types across multiple components.

### Risk: Phase 5 accidentally activates pseudo-math
Mitigation: leave `calculateFreshYeast` orchestration intact, preserve the current unit no-op guarantees, and add at least one regression that compares base results against populated modifier input.

## Test Planning Implications

### Automated coverage should prove
- the advanced section is rendered closed by default;
- all seven modifier categories are present when opened;
- entering placeholder values does not change the base estimate;
- modifier placeholder activity is reflected as inactive status rather than active correction;
- reset restores advanced state and placeholder values;
- browser accessibility and interaction still hold after adding the accordion.

### Best test ownership by surface
- `tests/unit/calc/calculate-fresh-yeast.test.ts` should continue owning no-op numeric guarantees for modifier presence.
- `tests/integration/home-page.test.tsx` should own accordion behavior, placeholder interaction, result stability, and reset semantics.
- `tests/e2e/home.spec.ts` should stay lightweight but prove the advanced section can be opened, explored, and still leaves the calculator flow accessible.

## Validation Architecture

### Required automated feedback loops
- Fast loop: `npm run test:integration`
- Domain seam safety: `npm run test:unit`
- Structural safety: `npm run typecheck`
- Browser and accessibility smoke: `npm run test:e2e`

### Recommended execution shape
One plan in one wave is still the right size. The work spans one interaction boundary and one already-existing domain seam. Splitting this phase into multiple plans would create coordination overhead without real parallel execution value.

## Planning Recommendation

Plan Phase 5 as one execute plan with three tasks:
1. Define the experimental modifier registry and advanced-section presentation surface.
2. Wire modifier draft state, accordion behavior, reset semantics, and no-op calculator integration.
3. Extend unit, integration, and e2e coverage so the inactive-seam guarantee is protected.

That is enough to satisfy `EXP-01` and `EXP-02` while keeping the v1 honest and ready to close.

---
*Research completed: 2026-03-12*
*Phase: 05-experimental-modifier-seam*