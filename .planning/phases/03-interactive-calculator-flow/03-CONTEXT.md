# Phase 3: Interactive Calculator Flow - Context

**Gathered:** 2026-03-11
**Status:** Ready for planning

<domain>
## Phase Boundary

Deliver the live calculator experience around the existing domain engine: interactive inputs for temperature, time, flour quantity, and flour unit; live result updates without submit; clean suspension of results when input is incomplete or invalid; presets for quick entry; and a full reset path. This phase should establish the calculator state flow and behavior, not the final premium editorial presentation, formula storytelling, or experimental advanced controls.

</domain>

<decisions>
## Implementation Decisions

### Non-calculable result states
- Keep the result area mounted even when the calculator cannot produce a valid estimate.
- When required input is missing, show a guidance card instead of hiding the result area or preserving stale numbers.
- The guidance state should explicitly mention which fields are still missing so the next action is obvious.
- When input becomes invalid, suspend the numeric output cleanly and replace it with an error-oriented result state; do not leave the last valid answer on screen.

### Validation feedback presentation
- Show validation feedback both near the affected field and as a compact summary in the result area.
- Error copy should name the affected fields explicitly rather than relying only on generic messaging or visual emphasis.
- Feedback should stay readable and practical, not technical or punitive.

### Warning coexistence with valid results
- When the model can still calculate but temperature or time are outside the empirical range, keep the result visible and attach a sober warning.
- The warning should remain secondary to the main estimate, but it must clearly signal reduced reliability.
- Warning behavior should reinforce that the result is an empirical estimate, not a blocked state and not a hard failure.

### Claude's Discretion
- Exact component composition, spacing, and responsive layout, as long as the interaction stays mobile-first and visually stable.
- Exact copy phrasing for guidance, validation, and warning text, as long as the tone remains clear, credible, and restrained.
- Exact preset set, reset affordance styling, and interaction polish, unless later discussion overrides them during planning.

</decisions>

<specifics>
## Specific Ideas

- The user wants the app to feel immediate, clear, and credible enough to be used as a real practical reference.
- The result area should feel stable rather than jumpy while the user edits values live.
- Clarity and trust matter more than clever UI behavior or pseudo-scientific precision.

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `lib/calc/calculate-fresh-yeast.ts`: already exposes the core orchestration for valid vs invalid results and warning generation that Phase 3 should consume directly.
- `lib/calc/types.ts`: already defines field-specific issues, warnings, and the discriminated result shape needed for UI state handling.
- `tests/integration/` and `tests/e2e/`: already provide the harness needed to verify live updates, invalid states, presets, and reset behavior.

### Established Patterns
- Phase 2 already fixed the rule that errors dominate warnings, so invalid UI states should not try to render warning states at the same time.
- The project favors sober, honest behavior over cosmetic tricks, so stale results and ambiguous fallback states should be avoided.
- The app shell is still mostly a placeholder, so Phase 3 can define the first durable calculator interaction pattern.

### Integration Points
- `app/page.tsx` is the current landing point for the first real calculator experience.
- Phase 3 should wire UI state to the existing `lib/calc` contract rather than duplicating domain rules in components.
- The reset implementation should remain extensible so later phases can restore additional UI state without redesigning the flow.

</code_context>

<deferred>
## Deferred Ideas

- Formula visibility, explanatory model copy, and trust-centered presentation details belong to Phase 4.
- Premium layout refinement, motion polish, and editorial hierarchy belong to Phase 4.
- Experimental modifier controls and advanced-panel behavior belong to Phase 5.

</deferred>

---
*Phase: 03-interactive-calculator-flow*
*Context gathered: 2026-03-11*
