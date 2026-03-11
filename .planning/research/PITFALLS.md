# PITFALLS

## Purpose

This document captures the highest-risk pitfalls for building a trustworthy yeast/fermentation calculator webapp. It is written to support roadmap creation, with emphasis on product honesty, UX clarity, testing coverage, and technical setup discipline.

## Proposed Phase Map

| Phase | Focus | Why it exists |
| --- | --- | --- |
| Phase 1 | Trust Contract and Domain Framing | Define what the calculator does, what it does not do, and how uncertainty is communicated. |
| Phase 2 | Core Calculation and Input Safety | Build the empirical model, unit conversion, validation, warnings, and state rules correctly. |
| Phase 3 | Honest Result UX and Interaction Design | Present results, presets, reset, disclaimers, and advanced sections without ambiguity. |
| Phase 4 | Test Baseline and Quality Gates | Add repeatable verification across logic, UI, and main flows so refactors stay safe. |
| Phase 5 | Delivery Setup and Maintainability | Lock down CI, repo hygiene, dependency choices, and architecture boundaries for future growth. |

## Pitfalls

### 1. Pretending the calculator is more scientific than it really is

**Why it matters**  
The app succeeds only if users trust it enough to use it in practice. That trust breaks quickly if the interface implies laboratory precision while the model is only an empirical estimate.

**Warning signs**
- Marketing copy or UI labels describe the result as exact, optimal, or scientifically precise.
- Experimental modifiers appear active even though they are not validated.
- Fine-grained decimal output suggests confidence the model does not justify.
- Disclaimers are hidden in secondary sections instead of near the result.

**Prevention strategy**
- Establish a product trust contract early: the calculator returns a practical estimate, not a guarantee.
- Keep the base formula visible and explain what inputs it actually covers.
- Separate active model logic from future heuristic modifiers in both code and UI.
- Use restrained rounding and plain language such as `stima pratica` and `modello empirico`.
- Make limitations visible at the point where users read the answer, not only in documentation.

**Phase to address**
- Phase 1
- Reinforce in Phase 3

### 2. Mixing validated base logic with experimental modifiers

**Why it matters**  
If future-oriented controls are mixed into the same result pathway, users cannot tell what is trustworthy and developers may accidentally ship fake precision.

**Warning signs**
- Modifier state is passed directly into the main calculation with placeholder coefficients.
- UI toggles imply salt, hydration, or fridge retard already affect the answer.
- Result summaries mention adjustments without transparent math or validation source.
- Code uses one monolithic calculation function for both base model and speculative extensions.

**Prevention strategy**
- Treat the empirical formula as its own pure domain module.
- Model experimental modifiers as a separate typed structure with explicit inactive behavior in MVP.
- Return `appliedModifiers` clearly, and keep it empty or explicitly non-operative until validated.
- Add tests proving the base result is unchanged when experimental controls are present but inactive.

**Phase to address**
- Phase 1
- Phase 2

### 3. Hiding input assumptions and empirical range limits

**Why it matters**  
A calculator feels dishonest when it gives a clean number for conditions outside the model's practical range without telling the user reliability has dropped.

**Warning signs**
- The same visual treatment is used for in-range and out-of-range results.
- Warnings appear only after submit, or disappear too easily on mobile.
- The app silently accepts extreme values like very short times or very high temperatures.
- Users can reach a result without seeing units, bounds, or model scope.

**Prevention strategy**
- Encode empirical range warnings in domain validation rather than ad hoc UI conditions.
- Show warnings inline near the result and keep them readable on small screens.
- Distinguish blocking errors from non-blocking reliability warnings.
- Include unit labels, defaults, and helper text directly in the form.

**Phase to address**
- Phase 2
- Phase 3

### 4. Allowing ambiguous or fragile input behavior

**Why it matters**  
Trust is lost when users are unsure whether `1` means 1 g or 1 kg, whether empty fields are accepted, or whether the displayed answer is based on stale state.

**Warning signs**
- Unit switching changes labels without converting the stored value.
- Empty, zero, negative, or malformed values produce partial calculations or inconsistent messages.
- Result cards keep showing the last valid answer after inputs become invalid.
- Presets overwrite flour quantity or other unrelated state.

**Prevention strategy**
- Define one canonical internal unit for flour and convert at the boundary.
- Centralize validation rules and use a single orchestrator for calculation eligibility.
- Decide and test how invalid state affects output: no stale successful result should remain.
- Make presets narrow in scope and make reset behavior explicit and fully deterministic.

**Phase to address**
- Phase 2
- Phase 3

### 5. Designing a premium-looking UI that is not actually clear

**Why it matters**  
A refined visual style helps credibility, but a visually polished interface that obscures warnings, hierarchy, or control intent is worse than a plain one.

**Warning signs**
- Styling emphasizes atmosphere more than readability.
- Important distinctions, such as result vs disclaimer vs experimental section, rely only on subtle color shifts.
- Motion delays the appearance of critical feedback.
- On mobile, form, result, and warning blocks compete for attention or appear out of order.

**Prevention strategy**
- Treat clarity as the primary design KPI, ahead of visual flourish.
- Use strong typographic hierarchy and clear sectional separation for input, result, and model context.
- Ensure warnings and validation states remain visible and readable across breakpoints.
- Keep animations light and non-blocking; they should support orientation, not distract from it.

**Phase to address**
- Phase 3

### 6. Failing to test the honesty rules, not just the math

**Why it matters**  
Teams often test formulas and ignore whether disclaimers, warnings, invalid-state behavior, and modifier separation survive refactors. Those are core trust features, not cosmetic extras.

**Warning signs**
- Unit tests cover only numeric outputs.
- Integration tests do not verify warning copy, invalid-state handling, or reset semantics.
- E2E coverage stops at page load and one happy-path calculation.
- No tests assert that experimental controls do not alter MVP results.

**Prevention strategy**
- Define trust-critical behaviors as testable requirements, not design intentions.
- Add unit tests for formula, scaling, validation, rounding, and unit conversion.
- Add integration tests for live updates, warnings, reset, presets, and blocked result states.
- Add at least one E2E smoke flow that exercises the main user journey end to end.
- Require these checks in CI so they are not optional local discipline.

**Phase to address**
- Phase 4

### 7. Shipping brittle technical foundations because the app is just a calculator

**Why it matters**  
Small client-side apps are often under-engineered. That creates avoidable breakage, slows future tools, and undermines confidence in a product that aims to become a broader fermentation suite.

**Warning signs**
- Domain logic lives inside React components.
- Copy, constants, limits, and calculation rules are duplicated across files.
- Type definitions are loose enough that invalid states leak into runtime.
- The structure makes it hard to add another fermentation tool without rewiring the app.

**Prevention strategy**
- Keep calculation logic in pure modules under a clear domain boundary.
- Separate constants, copy, types, and orchestration logic from presentation.
- Use strict TypeScript models for input, result, modifier state, and validation output.
- Prefer small compositional components over one oversized page component.

**Phase to address**
- Phase 2
- Phase 5

### 8. Missing CI and repository guardrails

**Why it matters**  
Without automated quality gates, regressions in calculation, copy, or UX behavior will slip in unnoticed. That is especially risky when the product's value depends on consistency and credibility.

**Warning signs**
- `build`, `lint`, `typecheck`, and test scripts are missing or not aligned.
- CI runs only a subset of checks, or nothing on pull requests.
- Generated files and local artifacts clutter the repository.
- Contributors cannot tell what `green` means before merging.

**Prevention strategy**
- Define a baseline command contract early: lint, typecheck, unit, integration, e2e, build.
- Add a GitHub-ready CI workflow that runs the critical path on every change.
- Keep `.gitignore` clean and repo output deterministic.
- Document the verification workflow in the README so future contributors follow the same bar.

**Phase to address**
- Phase 4
- Phase 5

### 9. Using copy that sounds authoritative but fails to educate

**Why it matters**  
Even correct math can feel untrustworthy if labels, disclaimers, or summaries are vague. Users need to understand what the number represents without reading source code.

**Warning signs**
- The result card lacks context such as `per recipe` versus `per 1 kg`.
- Warnings are technically correct but too abstract for non-expert users.
- Advanced options use internal terminology without explanation.
- The app explains the formula but not the practical implication of the estimate.

**Prevention strategy**
- Treat product copy as part of the domain model, not last-mile polish.
- Write short, precise labels for units, result meanings, and model limitations.
- Use summaries that restate the user's inputs in plain language.
- Test copy-heavy flows on mobile where comprehension is most fragile.

**Phase to address**
- Phase 1
- Phase 3

### 10. Optimizing for feature growth before trust is established

**Why it matters**  
It is tempting to add dough science controls, saved recipes, or multiple tools early. For v1 that would dilute quality and increase the chance of misleading behavior.

**Warning signs**
- Roadmap items expand into many calculator modes before MVP trust behaviors are complete.
- Placeholder controls outnumber validated features.
- Architecture becomes abstract before there is a proven need.
- Time is spent on future extensibility while core reliability and clarity remain under-tested.

**Prevention strategy**
- Keep scope anchored to one trustworthy tool in v1.
- Add extension seams only where they directly protect future maintainability.
- Treat validated base flow, honest result presentation, and test coverage as release blockers.
- Use roadmap reviews to reject work that increases breadth before confidence.

**Phase to address**
- Phase 1
- Re-check during every roadmap review

## Recommended Roadmap Implications

- Start with a dedicated trust-definition phase before UI polish. The wording, active model boundary, and limitation strategy are product requirements, not copy cleanup.
- Build calculation logic and validation rules before composing the premium interface. Honest UX depends on stable domain behavior.
- Make `trust behaviors` explicit acceptance criteria: disclaimer visibility, out-of-range warnings, invalid-state handling, inactive experimental modifiers, and deterministic reset.
- Treat test automation and CI as part of MVP scope, not post-launch hardening. For this product, credibility is inseparable from repeatable verification.
- Keep future extensibility lightweight and intentional. The app should be ready for more tools, but v1 should still feel focused and disciplined.
