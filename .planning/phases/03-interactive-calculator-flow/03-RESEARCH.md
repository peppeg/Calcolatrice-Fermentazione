# Phase 3 Research: Interactive Calculator Flow

## Goal Fit

Phase 3 should turn the current placeholder homepage into a usable calculator flow around the existing `lib/calc` engine. The domain math, rounding, invalid-result contract, and empirical warnings already exist. The phase work is primarily UI state orchestration, validation presentation, and test coverage for live interaction.

Requirements that must be satisfied in this phase:
- `CALC-01`: clear inputs for temperature, time, flour quantity, flour unit
- `CALC-02`: live result updates with no submit
- `CALC-03`: show recipe yeast grams and normalized grams per 1 kg flour
- `CALC-04`: quick presets that update only temperature and time
- `CALC-05`: full reset to initial tool state
- `SAFE-01`: clear messages for empty, invalid, negative, and zero input, with clean result suspension

## Current Baseline

### What already exists
- `app/page.tsx` is still a static placeholder.
- `lib/calc/calculate-fresh-yeast.ts` already returns a discriminated `ok | invalid` result with rounded output, warnings, and field-specific domain errors.
- `lib/calc/types.ts` already defines the stable domain contract for warnings and validation issues.
- Existing unit tests already cover normalization, validation, rounding, model behavior, and calculator orchestration.
- Existing integration/e2e tests only cover the Phase 1 placeholder and will need to be replaced or rewritten for the calculator flow.

### What is still missing
- A client-side input state model that can represent blank fields and partially typed values.
- A result-area state machine for guidance, invalid, and valid-with-warning variants.
- Preset and reset orchestration.
- User-facing tests for live updates and suspended-result behavior.

## Recommended Architecture

### Keep the page shell server-rendered
Do not turn the whole homepage into a client component unless there is a strong reason. Keep `app/page.tsx` as the composition/root layout layer and render a dedicated client calculator component inside it. This keeps the interactive boundary small and leaves Phase 4 free to expand editorial/presentation content around the calculator without coupling everything to client state.

Recommended shape:
- `app/page.tsx`: page shell, heading, short framing copy, calculator mount point
- new client component such as `components/calculator/interactive-calculator.tsx`
- optional split components for `calculator-form`, `calculator-result-panel`, `calculator-presets`
- optional pure helper such as `lib/calc/ui-validation.ts` or `lib/calc/calculator-draft.ts` for draft parsing and UI-only validation

### Use string draft state, not numeric state
The most important implementation decision is to store editable field values as strings in the UI layer:
- `temperatureC: string`
- `timeHours: string`
- `flourValue: string`
- `flourUnit: 'g' | 'kg'`

Reason:
- Blank fields must be representable for `SAFE-01`.
- Controlled numeric inputs need to tolerate temporary states while the user types.
- The domain contract requires numbers, so parsing should happen in a derived step, not inside the input controls themselves.

### Derive calculation state on every render
The calculation is cheap and pure. Do not build submit-style orchestration or cache-heavy logic. Instead:
1. Read current draft state.
2. Run UI-level draft validation/parsing.
3. If parseable, call `calculateFreshYeast`.
4. Derive a single view model for the result area.

This directly satisfies `CALC-02` and keeps the logic easy to test.

## Standard Stack

- React local state via `useState` for editable draft values and selected preset metadata
- A dedicated client calculator component rendered from `app/page.tsx`
- Existing `lib/calc/calculateFreshYeast` as the only domain calculation entrypoint
- Existing `lib/calc` warning/error types as the domain-facing contract
- `@testing-library/react` integration tests for live behavior
- `@testing-library/user-event` should be added for realistic form interaction tests if the phase team wants stable typing coverage
- Existing Playwright + axe setup for one browser-level accessibility smoke path

## Architecture Patterns

### Pattern 1: Separate draft validation from domain validation
Phase 3 needs two validation concerns:
- UI draft validation for empty input and non-parsable input
- Domain validation for numeric-but-invalid input such as `0`, negatives, or `NaN`

Do not try to force blank state through `CalculatorInput`. That type is already numeric and belongs to the calculation layer.

### Pattern 2: Always keep the result region mounted
The phase context is explicit: the result area should not disappear. Implement the result panel as a stable region with mutually exclusive variants:
- `guidance`: missing input, tell the user which fields are still required
- `invalid`: parsed input exists but cannot be calculated, show field-specific errors and suspend numbers
- `success`: show `gramsForRecipe` and `gramsPerKg`
- `success-with-warning`: same as success plus empirical warning copy

### Pattern 3: Presets mutate only temperature and time
Presets should be modeled as data, not inline button logic. Each preset should contain:
- id
- label
- `temperatureC`
- `timeHours`

Applying a preset should:
- update only the temperature and time draft fields
- preserve flour value and flour unit
- keep live result recalculation automatic

### Pattern 4: Reset is a state reinitialization path, not a patchwork of setters
Create one `INITIAL_DRAFT` object and one reset handler that restores it. Reset should also clear:
- selected preset marker, if present
- inline validation state derived from prior edits
- any success/warning display, returning the result area to guidance mode

## Recommended Implementation Slices

### Slice 1: Draft state and validation/view-model helpers
Create the smallest possible pure helpers first.

Targets:
- draft type for string-based editable fields
- parser from draft state to either missing, unparseable, or `CalculatorInput`
- helper to compute missing fields for the guidance state
- helper to map UI parse issues into field-level messages

Planner note:
- This slice should be implemented as pure functions where possible so it can carry focused unit tests.

### Slice 2: Client calculator component with stable result panel
Build the interactive UI around the draft helpers and the existing domain function.

Targets:
- fieldset or grouped form layout for temperature, time, flour quantity, flour unit
- inline field errors
- stable result area with guidance / invalid / success variants
- success state showing both recipe grams and per-kg grams
- warning rendering only when domain result is `ok`

Planner note:
- The result panel should consume a derived view model instead of duplicating render branching across multiple places.

### Slice 3: Presets and reset flow
Add a small preset strip and a clear reset affordance.

Targets:
- preset data constants
- buttons that only update time and temperature
- reset control that restores initial state
- visual behavior that leaves result layout stable before and after reset

Planner note:
- Presets and reset are simple behaviorally, but they are common regression points. Keep them isolated enough to test directly.

### Slice 4: Replace baseline tests with calculator interaction coverage
Update the existing integration and e2e seam to reflect Phase 3 behavior instead of the placeholder shell.

Targets:
- new integration scenarios for live updates, missing state, invalid state, warnings, presets, and reset
- one e2e smoke path that covers typing into the calculator and confirms no accessibility regressions in the rendered experience

## Validation Architecture

Phase 3 should use three explicit validation layers.

### Layer 1: Draft presence and parseability
Owner: UI helper layer

Purpose:
- distinguish empty input from invalid numeric input
- support `SAFE-01` messaging for required fields before domain calculation starts

Expected outputs:
- `missingFields: ValidationField[]`
- `parseIssues` for values that cannot be turned into numbers
- `parsedInput` only when all required fields are present and parseable

This layer is required because the domain types cannot represent blank strings.

### Layer 2: Domain validity
Owner: `calculateFreshYeast`

Purpose:
- reject zero, negatives, or non-finite numeric values
- normalize flour units
- return suspended result state through `status: 'invalid'`

Expected outputs:
- `CalculationResult`
- no warnings when invalid

This preserves the existing rule that errors dominate warnings.

### Layer 3: Result presentation policy
Owner: result view-model builder / component

Purpose:
- choose the visible panel variant
- merge field-level and summary-level messaging
- keep stale numbers off screen when input is incomplete or invalid

Expected policy:
- if missing fields exist, show `guidance`
- else if parse issues exist, show `invalid`
- else if domain result is `invalid`, show `invalid`
- else show numeric results, with warnings if present

## Requirement-by-Requirement Planning Notes

### `CALC-01`
Implement four user-facing controls:
- temperature input
- time input
- flour quantity input
- flour unit selector

Use explicit labels and predictable grouping. The unit selector can be a `select` or segmented choice; either is sufficient for this phase.

### `CALC-02`
Live updates should be purely derived from draft state. No submit button should exist in the calculator flow. Tests should assert that results change immediately after typing or preset clicks.

### `CALC-03`
The success panel must render both values from a single successful `CalculationResult`:
- `gramsForRecipe`
- `gramsPerKg`

Do not recompute either value in the UI.

### `CALC-04`
Presets are safe to implement as time/temperature shortcuts because the context explicitly says they should update only those fields. Do not couple preset behavior to flour quantity or flour unit.

### `CALC-05`
Reset should restore the exact initial state of the calculator and produce the same initial result-panel guidance as first load.

### `SAFE-01`
This requirement is the reason the UI needs its own draft-validation layer. The domain layer alone cannot distinguish:
- empty field
- malformed number
- zero
- negative number

The planner should treat this as a first-class architecture concern, not a copy tweak.

## Integration Risks

### Risk 1: Blank-state handling gets collapsed into `NaN`
If the UI converts empty strings to numbers too early, the user will only see generic valid-number errors and the app will lose the clearer missing-field guidance promised in the phase context.

Mitigation:
- keep string draft state
- parse in a dedicated derived step

### Risk 2: UI duplicates domain rules
If positivity or warning thresholds are reimplemented in components, Phase 3 will drift from the tested calc engine.

Mitigation:
- keep UI validation limited to presence/parseability
- delegate numeric validity and warnings to `calculateFreshYeast`

### Risk 3: Stale results remain visible after invalid edits
If the last successful result is cached in component state, the UI can violate the requirement to suspend results cleanly.

Mitigation:
- derive displayed result only from current draft state
- avoid persisting previous successful output

### Risk 4: Presets accidentally overwrite flour state
This would violate `CALC-04` and make preset use feel destructive.

Mitigation:
- implement preset application as a partial update touching only two fields

### Risk 5: Reset does not fully restore initial UX
If reset only clears the text fields but not preset selection or result mode, the tool will feel inconsistent and tests will become brittle.

Mitigation:
- centralize initial state in one constant and reuse it in both mount and reset paths

## Testing Approach

### Unit tests
Add focused unit tests only if draft parsing/validation is extracted into pure helpers.

Recommended cases:
- missing temperature/time/flour detection
- malformed numeric string detection
- blank vs zero vs negative distinction
- preset application updates only time and temperature
- reset returns exact initial draft state

### Integration tests
This phase should rely primarily on `tests/integration/home-page.test.tsx` or its replacement because the key behaviors are component-level interactions.

Recommended scenarios:
- renders calculator controls and initial guidance state
- typing valid values produces live numeric results with no submit
- switching flour unit updates normalized output correctly
- empty fields show guidance and list missing fields
- zero/negative values suspend numeric output and show field-specific errors
- out-of-range but valid values keep results visible and show warning copy
- clicking a preset updates only time and temperature
- reset restores initial draft state and guidance panel

### E2E coverage
Keep e2e light for this phase.

Recommended smoke:
- load homepage
- fill calculator with valid inputs
- confirm both output values are visible
- trigger a preset or reset path
- run axe scan on the real rendered calculator

## Planning Recommendations

- Plan around a client calculator component instead of making all of `app/page.tsx` interactive.
- Treat draft-state modeling as the first implementation slice because it unblocks `SAFE-01`, `CALC-02`, and reliable tests.
- Reuse `calculateFreshYeast` exactly as-is for all numeric calculation and warning behavior.
- Prefer a single derived result-panel view model so the page does not accumulate ad hoc branching.
- Update integration tests in the same phase as the UI work; Phase 3 should not ship with placeholder-only page tests.

## Suggested File Targets

Likely files to touch during planning/execution:
- `app/page.tsx`
- `components/calculator/interactive-calculator.tsx`
- optional `components/calculator/calculator-result-panel.tsx`
- optional `components/calculator/calculator-presets.tsx`
- optional `lib/calc/ui-validation.ts` or `lib/calc/calculator-draft.ts`
- `tests/integration/home-page.test.tsx`
- optional new unit test file for UI draft helpers
- `tests/e2e/home.spec.ts`

## Planner Takeaway

The highest-leverage plan is: define a string-based draft state model first, derive a stable result-panel state from current input on every render, and reuse the existing calc engine for all numeric truth. If the plan preserves that boundary, the phase stays small, testable, and aligned with the requirement that invalid or incomplete edits suspend results cleanly instead of leaving stale numbers on screen.