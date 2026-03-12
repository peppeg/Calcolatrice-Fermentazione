# Phase 5: Experimental Modifier Seam - Context

**Gathered:** 2026-03-12
**Status:** Ready for planning

<domain>
## Phase Boundary

Add the advanced section and future-facing modifier architecture without contaminating the active MVP math. This phase should expose the experimental seam clearly in the UI, keep the section secondary and closed by default, and make future factors visible without implying validated active corrections.

</domain>

<decisions>
## Implementation Decisions

### Advanced section behavior
- The experimental section should be a sober accordion, closed by default.
- The accordion should feel clearly secondary to the active calculator, not like a competing primary panel.
- Opening the section should not change the active result unless the user manually edits the experimental placeholders.

### Experimental controls
- The future factors should be visible as real controls, not only as descriptive text.
- The controls should be compilable in the v1, but explicitly inactive: they must not alter the active calculation.
- The UI must state this clearly near the controls, not only in distant explanatory copy.

### Modifier scope and detail
- The v1 should show all seven future modifier categories already present in the domain seam.
- The visible categories should stay aligned with the current domain keys: hydration, salt, sugar, fat, flour strength, fermentation stage, and cold retard.
- The presentation should feel like a trustworthy preview of future modeling scope, not like hidden advanced math waiting to activate silently.

### Claude's Discretion
- Exact accordion copy, iconography, spacing, and disclosure treatment as long as the section stays sober and clearly secondary.
- Exact choice of per-field control type as long as each future factor remains understandable and obviously inactive.
- Exact grouping or layout density of the seven modifiers as long as all seven remain visible and the inactive status remains unmistakable.

</decisions>

<specifics>
## Specific Ideas

- The current product already tells the user that experimental modifiers are inactive; Phase 5 should now let the user see and manipulate that future surface safely.
- The UI should reward curiosity without encouraging false trust: interacting with an experimental value should teach scope, not suggest validated precision.
- The advanced section should feel integrated with the premium page, but visually quieter than the active result.
- Reset behavior should include the advanced section state and any experimental placeholder values.

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `lib/calc/modifiers.ts`: already defines the experimental modifier labels, inactive-state factory, and no-op summary behavior.
- `lib/calc/types.ts`: already exposes the durable `ExperimentalModifierState` and seven modifier keys needed by the UI.
- `components/calculator/interactive-calculator.tsx`: already owns calculator-local state, presets, reset, and is the natural place to host accordion state and experimental draft values.
- `components/calculator/calculator-result-panel.tsx`: already renders the experimental-modifier status and can be extended only if needed to reflect non-applied placeholder activity.

### Established Patterns
- The base model contract is already protected by tests proving modifiers are a no-op seam.
- The current result summary already distinguishes active model vs experimental status, so Phase 5 should reinforce that separation rather than invent a new trust pattern.
- The page hierarchy from Phase 4 is fixed: hero, tool, model transparency; the advanced section must fit inside that established tool experience instead of becoming a new page region.

### Integration Points
- The accordion and placeholder controls should likely live inside `interactive-calculator.tsx` or a child component mounted from there.
- The current modifier state from the calc domain can flow through the existing `calculateFreshYeast` contract without changing numeric behavior.
- Tests should cover accordion closed-by-default behavior, placeholder interaction, reset coverage, and proof that active results stay unchanged when modifier values are present.

</code_context>

<deferred>
## Deferred Ideas

- Any validated coefficient logic for hydration, salt, sugar, fat, flour strength, fermentation stage, or fridge behavior remains out of scope for v1.
- Multi-stage fermentation logic and fridge-aware real math remain future modeling work, not a hidden phase-5 activation.
- User-facing weighting, scoring, or confidence systems for experimental controls are deferred.

</deferred>

---
*Phase: 05-experimental-modifier-seam*
*Context gathered: 2026-03-12*