# Phase 2: Domain Calculation Engine - Research

**Researched:** 2026-03-11
**Domain:** Pure yeast-calculation engine, normalization, validation, warnings, and practical rounding
**Confidence:** HIGH

<user_constraints>
## User Constraints

### Required outcomes
- Phase 2 must directly satisfy `SAFE-02` and `SAFE-03`, and establish the domain prerequisites that Phase 3 will use to fulfill `CALC-01`.
- The phase goal is explicit: implement the empirical model, normalization, validation primitives, and trustworthy numerical behavior.
- The domain layer must stay pure and reusable for later UI work in Phase 3.
- Out-of-range empirical inputs must still calculate, but with a non-blocking warning.
- Invalid inputs must suspend the result cleanly and suppress warnings on the same response.
- Experimental modifiers must remain an explicit seam but inactive for MVP math.

### Phase boundary
- This phase should create domain code and domain-focused tests.
- It should not absorb live UI orchestration, presets UI, reset flows, or presentation-heavy work from later phases.
- It may define types and result contracts that Phase 3 consumes directly.
</user_constraints>

<research_summary>
## Summary

Phase 2 should establish a **strict calculation pipeline**:

1. Normalize input into a canonical domain shape.
2. Validate numeric calculability and collect field-specific errors.
3. Abort early on errors with `null` result fields and no warnings.
4. Run the empirical formula and flour scaling in raw floating-point numbers.
5. Derive empirical-range warnings from the normalized input.
6. Apply practical rounding exactly once as the terminal step.
7. Return a stable result object that future UI code can render without re-deriving domain state.

**Primary recommendation:** keep the engine in a small `/lib/calc` domain package with one public orchestrator and a handful of narrowly scoped pure helpers. Do not let validation, warnings, and rounding leak into React components. Do not introduce a numeric library or schema framework for this phase; the math is simple enough for JavaScript `number`, provided the code avoids premature rounding, avoids string formatting in the domain, and tests boundaries explicitly.

**Planning implication:** the planner should treat this as a domain-contract phase, not a UI phase. The main output is a well-typed, pure calculation module plus strong unit tests that lock the math and response rules before interactive UI begins.
</research_summary>

<standard_stack>
## Standard Stack

### Core implementation choices
| Area | Decision | Why this should be the default |
|------|----------|--------------------------------|
| Numeric type | JavaScript `number` | Adequate for this empirical model and already native to the stack |
| Domain placement | `/lib/calc` | Matches the product brief and keeps math isolated from UI |
| Validation model | Hand-written pure validators | Small, explicit domain rules; no need for schema-library overhead yet |
| Warning model | Structured domain warnings with stable codes | Supports sober UI messaging later without parsing free text |
| Test runner | Vitest unit tests | Already configured and ideal for pure numeric code |
| Public surface | One orchestrator plus focused helpers | Keeps Phase 3 integration simple while preserving unit-test granularity |

### Recommended domain file/module breakdown
| File | Responsibility | Export guidance |
|------|----------------|-----------------|
| `lib/calc/constants.ts` | Formula constants, empirical intervals, rounding thresholds | Export immutable constants only |
| `lib/calc/types.ts` | Domain types for input, normalized input, validation issues, warnings, results, modifiers | Export all public calc-domain types |
| `lib/calc/normalize.ts` | Flour unit normalization to grams and canonical input shaping | Export pure normalization helpers |
| `lib/calc/model.ts` | `calculateBaseYeastPerKg` and `scaleYeastToFlour` | Export raw math helpers only |
| `lib/calc/rounding.ts` | Practical rounding utilities for yeast outputs | Export pure rounding helpers only |
| `lib/calc/validation.ts` | Field validation and empirical-range warning derivation | Export validation and warning builders |
| `lib/calc/modifiers.ts` | Inactive experimental modifier seam and summary helpers | Export seam types/helpers, but no math adjustments |
| `lib/calc/calculate-fresh-yeast.ts` | Main orchestrator that composes normalize -> validate -> calculate -> warn -> round | Export the primary public function |
| `lib/calc/index.ts` | Stable barrel for Phase 3 consumption | Re-export only intended public API |

### Why this split is preferable
- It preserves cohesion: each file owns one concern.
- It gives the planner a clean test map: model, rounding, normalization, validation, orchestrator.
- It avoids a premature global `types/` dumping ground in a repo that still has one real domain.
</standard_stack>

<architecture_patterns>
## Architecture Patterns

### Pattern 1: Canonical-input pipeline
Use two input shapes:
- `CalculatorInput` for UI-adjacent values: `temperatureC`, `timeHours`, `flourValue`, `flourUnit`, `modifiers`.
- `NormalizedCalculatorInput` for domain math: `temperatureC`, `timeHours`, `flourGrams`, `modifiers`.

This prevents the common bug where some functions accidentally multiply by kilograms while others assume grams.

### Pattern 2: Raw math first, rounded output last
`calculateBaseYeastPerKg` and `scaleYeastToFlour` should operate on raw numbers only. Rounding belongs in the terminal step of `calculateFreshYeast`, after the formula and scaling have both completed.

This protects against double-rounding drift and keeps helper tests numerically honest.

### Pattern 3: Structured issues internally, flattened strings only at outer boundaries
The domain should traffic in typed issues and warnings, not free-form string arrays as its primary internal representation.

Recommended internal shape:

```ts
type ValidationField = 'temperatureC' | 'timeHours' | 'flourValue' | 'flourGrams';

type ValidationCode =
  | 'required'
  | 'not-finite'
  | 'must-be-greater-than-zero';

type ValidationIssue = {
  field: ValidationField;
  code: ValidationCode;
  message: string;
};
```

If a later component wants `string[]`, it can map from the structured shape. The reverse is lossy.

### Pattern 4: Errors dominate warnings
When validation fails, the orchestrator should return:
- `gramsPerKg: null`
- `gramsForRecipe: null`
- `errors: [...]`
- `warnings: []`

This matches the phase context and prevents contradictory UI states such as "invalid input" plus "outside empirical range" on the same failed calculation.

### Pattern 5: Modifier seam without active math
`modifiers` should exist in the contract now, but the Phase 2 engine should only summarize modifier state, never alter the base calculation. The orchestration contract should make that explicit so Phase 5 can extend it safely rather than silently hijacking core math.

### Recommended function boundaries and purity expectations

#### `normalizeFlourInput`
- Responsibility: convert `flourValue` + `flourUnit` into `flourGrams`
- Purity: pure and deterministic; no validation side effects
- Rule: perform unit conversion only, not warning generation

#### `calculateBaseYeastPerKg`
- Responsibility: implement `14.5 * t^(-0.89) * 2^(-(T - 20) / 10)`
- Purity: pure and deterministic
- Rule: assume validated positive finite numbers; do not round internally

#### `scaleYeastToFlour`
- Responsibility: compute `gramsPerKg * (flourGrams / 1000)`
- Purity: pure and deterministic
- Rule: multiply only; no formatting and no clamping

#### `roundPracticalYeast`
- Responsibility: apply the agreed practical rounding rule to a single number
- Purity: pure and deterministic
- Rule: own the rounding threshold logic in one place

#### `validateCalculatorInput`
- Responsibility: detect missing, non-finite, zero, and negative values
- Purity: pure and deterministic
- Rule: return field-specific issues, not a boolean

#### `buildEmpiricalRangeWarnings`
- Responsibility: derive the single sober out-of-range warning and compact reason
- Purity: pure and deterministic
- Rule: never block calculation; never run on invalid-result output

#### `calculateFreshYeast`
- Responsibility: orchestrate the entire domain flow
- Purity: pure and deterministic
- Rule: no I/O, no mutation, no React imports, no `Intl`, no locale formatting

### Recommended orchestrator sequence

```ts
normalize -> validate -> return invalid result if errors
          -> raw base calculation -> raw recipe scaling
          -> warnings -> practical rounding
          -> final result object
```
</architecture_patterns>

<type_design>
## Type Design Recommendations

### Prefer discriminated results over loosely nullable bags
The cleanest way to encode "errors suspend warnings and result numbers" is a discriminated union.

Recommended result shape:

```ts
type CalculationSuccess = {
  status: 'ok';
  normalizedInput: NormalizedCalculatorInput;
  gramsPerKg: number;
  gramsForRecipe: number;
  warnings: DomainWarning[];
  errors: [];
  appliedModifiers: string[];
};

type CalculationFailure = {
  status: 'invalid';
  normalizedInput: NormalizedCalculatorInput | null;
  gramsPerKg: null;
  gramsForRecipe: null;
  warnings: [];
  errors: ValidationIssue[];
  appliedModifiers: string[];
};

type CalculationResult = CalculationSuccess | CalculationFailure;
```

This is safer than one bag type because it makes impossible states harder to represent.

### Keep unit types simple
Use:

```ts
type FlourUnit = 'g' | 'kg';
```

Do not introduce branded numeric types in this phase. They add friction without enough payoff for a three-input empirical model.

### Keep modifier typing explicit but lightweight
Recommended shape:

```ts
type ExperimentalModifierKey =
  | 'hydration'
  | 'salt'
  | 'sugar'
  | 'fat'
  | 'flourStrength'
  | 'fermentationStage'
  | 'coldRetard';

type ExperimentalModifierValue = number | string | boolean | null;

type ExperimentalModifierState = {
  enabled: boolean;
  values: Partial<Record<ExperimentalModifierKey, ExperimentalModifierValue>>;
};
```

This keeps the seam extensible without pretending the modifiers are already scientifically modeled.

### Recommendation on messages
Store stable codes in the domain and derive Italian copy from one message map. Tests should assert on codes where possible and only assert full text where the copy itself is part of the product contract.
</type_design>

<warning_validation_strategy>
## Warning And Validation Strategy

### Error rules
The domain should treat these as blocking errors:
- missing numeric input
- `NaN`
- `Infinity` or `-Infinity`
- zero
- negative values

All three numeric inputs should follow the same baseline validity rule: value must be finite and greater than zero.

### Warning rules
Empirical-range warnings should be non-blocking and should trigger when:
- `temperatureC < 16` or `temperatureC > 36`
- `timeHours < 2` or `timeHours > 24`

The warning model should remain single-level and sober. Recommended structured warning:

```ts
type DomainWarning = {
  code: 'outside-empirical-range';
  message: string;
  reason: 'temperature' | 'time' | 'temperature-and-time';
};
```

### Message behavior
- Use field-specific error messages so the future UI can attach them directly to inputs.
- Use one warning entry maximum for empirical-range issues.
- If both temperature and time are outside range, emit one warning with a combined reason.

### Do not clamp
Do not silently clamp temperature or time back into the empirical range. That would create false confidence and violate the product's honesty constraint.
</warning_validation_strategy>

<dont_hand_roll>
## Don't Hand-Roll

| Problem | Do not build | Use instead | Why |
|---------|--------------|-------------|-----|
| Numeric precision | custom decimal or fraction system | plain `number` with disciplined rounding boundaries | the formula is simple and empirical, not currency math |
| Validation contract | generic `boolean` or ad hoc `throw` flow | typed issue arrays | preserves field specificity and keeps the UI deterministic |
| Warning handling | UI-side heuristic checks | domain-generated warning metadata | one source of truth for empirical trust behavior |
| Unit conversion | inline `if (unit === 'kg')` inside components | one normalization helper | avoids drift between callers |
| Modifier support | fake coefficients or placeholder math | inactive seam with explicit no-op behavior | avoids pseudo-scientific behavior in MVP |
</dont_hand_roll>

<common_pitfalls>
## Common Pitfalls

### Pitfall 1: Rounding too early
If `gramsPerKg` is rounded before scaling, recipe output becomes less trustworthy, especially for small flour quantities. Round once at the end.

### Pitfall 2: Checking only positivity and forgetting finiteness
`NaN > 0` is false, but explicit finite checks are still needed for clean error classification and reliable test coverage.

### Pitfall 3: Mixing `flourValue` and `flourGrams`
Without a canonical normalized type, later UI code will eventually pass kilograms into a function that expects grams.

### Pitfall 4: Using strings as the only validation contract
Plain strings make tests brittle and future UI mapping harder. Codes plus messages are the better internal contract.

### Pitfall 5: Letting invalid results still emit warnings
This violates the agreed behavior and creates confusing UI states during Phase 3 integration.

### Pitfall 6: Treating experimental modifiers as active math
The seam is important, but any coefficient logic in Phase 2 would overreach the roadmap and damage product credibility.

### Pitfall 7: Hiding empirical uncertainty by clamping or sanitizing
The product promise is practical honesty, not pseudo-precision. Warning, do not "fix," out-of-range inputs.
</common_pitfalls>

<validation_architecture>
## Validation Architecture

### Required command posture for this phase
Phase 2 is domain-centric, so new coverage should land primarily in unit tests. Even so, the existing repository contract should remain green:

```bash
npm run test:unit
npm run test:integration
npm run lint
npm run typecheck
```

Run `npm run build` before phase closeout because the new domain exports will become part of the Next.js bundle graph.

### Unit test strategy for numeric domain code

#### Formula tests
- Use table-driven cases with explicit expected values.
- Assert with `toBeCloseTo` against the raw formula result.
- Include at least one reference case for the nominal default (`20C`, `12h`).

#### Conversion and scaling tests
- Verify `1000 g` and `1 kg` normalize to the same `flourGrams`.
- Verify recipe scaling is linear across multiple flour sizes.
- Verify scaling does not round on its own.

#### Validation tests
- Cover empty-ish numeric paths via `NaN`.
- Cover negative, zero, and non-finite values for each field.
- Assert field code, not just message text.
- Assert that invalid results return `warnings: []`.

#### Warning tests
- Verify boundaries are inclusive:
  - `16C`, `36C`, `2h`, and `24h` should not warn.
- Verify just-outside cases warn:
  - `15.9C`, `36.1C`, `1.9h`, `24.1h`.
- Verify combined reason when both temperature and time are outside range.

#### Rounding tests
- Lock the exact adaptive rule chosen by planning.
- Test values just below and just above the threshold boundary.
- Test that the same utility is used for both `gramsPerKg` and `gramsForRecipe`.

#### Orchestrator tests
- Verify the full happy path from UI-shaped input to rounded result.
- Verify invalid input short-circuits calculation.
- Verify out-of-range but valid input still calculates and emits one warning.
- Verify modifiers are reported but do not alter numeric output.

### Numeric assertion guidance
- Prefer exact equality for normalization and simple scaling cases where arithmetic is exact.
- Prefer `toBeCloseTo` for exponent-based formula assertions.
- Add one deterministic sweep test over a small grid of valid inputs to catch accidental regressions in monotonic behavior:
  - higher temperature should not increase required yeast when time is fixed
  - longer fermentation time should not increase required yeast when temperature is fixed

### Phase-scope test recommendation
Add new tests under `tests/unit`. Do not expand browser or UI integration scope in this phase unless the implementation unexpectedly requires a public UI adapter. Keep the existing integration and e2e smoke tests as regression gates only.
</validation_architecture>

<code_examples>
## Code Examples

### Recommended public calc API

```ts
export type FlourUnit = 'g' | 'kg';

export type CalculatorInput = {
  temperatureC: number;
  timeHours: number;
  flourValue: number;
  flourUnit: FlourUnit;
  modifiers?: ExperimentalModifierState;
};

export function calculateBaseYeastPerKg(params: {
  temperatureC: number;
  timeHours: number;
}): number;

export function scaleYeastToFlour(params: {
  gramsPerKg: number;
  flourGrams: number;
}): number;

export function calculateFreshYeast(input: CalculatorInput): CalculationResult;
```

### Recommended orchestrator shape

```ts
export function calculateFreshYeast(input: CalculatorInput): CalculationResult {
  const normalizedInput = normalizeCalculatorInput(input);
  const errors = validateCalculatorInput(normalizedInput);

  if (errors.length > 0) {
    return {
      status: 'invalid',
      normalizedInput,
      gramsPerKg: null,
      gramsForRecipe: null,
      warnings: [],
      errors,
      appliedModifiers: summarizeAppliedModifiers(input.modifiers),
    };
  }

  const rawGramsPerKg = calculateBaseYeastPerKg({
    temperatureC: normalizedInput.temperatureC,
    timeHours: normalizedInput.timeHours,
  });

  const rawGramsForRecipe = scaleYeastToFlour({
    gramsPerKg: rawGramsPerKg,
    flourGrams: normalizedInput.flourGrams,
  });

  return {
    status: 'ok',
    normalizedInput,
    gramsPerKg: roundPracticalYeast(rawGramsPerKg),
    gramsForRecipe: roundPracticalYeast(rawGramsForRecipe),
    warnings: buildEmpiricalRangeWarnings(normalizedInput),
    errors: [],
    appliedModifiers: summarizeAppliedModifiers(input.modifiers),
  };
}
```

### Recommended practical-rounding default
The context intentionally leaves the exact rule open. The strongest planning default is to keep the user brief's simple threshold unless planning finds a better reason to diverge:

```ts
export function roundPracticalYeast(value: number): number {
  return value >= 1 ? roundTo(value, 2) : roundTo(value, 3);
}
```

This is easy to explain, consistent across both outputs, and compatible with the "honesty over cosmetic neatness" constraint.
</code_examples>

<planning_inputs>
## What Planning Needs To Decide Explicitly

### Must-fix decisions
1. Whether the public result contract will use the recommended discriminated union directly or wrap it in a flatter compatibility shape.
2. Whether the calc types live in `lib/calc/types.ts` only or also get re-exported from a broader shared-types entrypoint.
3. The exact wording of field-specific Italian validation messages and the compact out-of-range reason text.
4. Whether the final rounding rule stays at `>= 1 => 2 decimals, < 1 => 3 decimals` or is adjusted based on stronger kitchen-use reasoning.

### Decisions that should default now
- keep the entire Phase 2 engine pure and framework-free
- use a normalized `flourGrams` shape internally
- use structured validation issues and structured warnings
- suppress warnings whenever validation errors exist
- keep experimental modifiers as an explicit no-op seam
- add unit tests only for new Phase 2 behavior, while continuing to run existing broader checks
</planning_inputs>

<sources>
## Sources

### Local project sources
- `C:/Users/peppeg/MyFilez/Fermentazione/.planning/phases/02-domain-calculation-engine/02-CONTEXT.md`
- `C:/Users/peppeg/MyFilez/Fermentazione/.planning/REQUIREMENTS.md`
- `C:/Users/peppeg/MyFilez/Fermentazione/.planning/STATE.md`
- `C:/Users/peppeg/MyFilez/Fermentazione/.planning/ROADMAP.md`
- `C:/Users/peppeg/MyFilez/Fermentazione/base.md`
- `C:/Users/peppeg/MyFilez/Fermentazione/package.json`
- `C:/Users/peppeg/MyFilez/Fermentazione/vitest.config.ts`
- `C:/Users/peppeg/MyFilez/Fermentazione/app/page.tsx`
- `C:/Users/peppeg/MyFilez/Fermentazione/tests/unit/app-shell.test.ts`
- `C:/Users/peppeg/MyFilez/Fermentazione/tests/integration/home-page.test.tsx`
- `C:/Users/peppeg/MyFilez/Fermentazione/tests/e2e/home.spec.ts`
</sources>

<metadata>
## Metadata

**Research scope:** calc-domain boundaries, normalization pipeline, validation architecture, warning behavior, rounding strategy, numeric testing posture

**Confidence breakdown:**
- module split and purity boundaries: HIGH
- validation and warning contract: HIGH
- type-shape recommendations: HIGH
- exact final rounding threshold: MEDIUM

**Ready for planning:** yes
</metadata>

---
*Phase: 02-domain-calculation-engine*
*Research completed: 2026-03-11*
*Ready for planning: yes*

