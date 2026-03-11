# Phase 4: Trust-Centered Premium Presentation - Context

**Gathered:** 2026-03-11
**Status:** Ready for planning

<domain>
## Phase Boundary

Refine the existing homepage into a premium, understandable, and honest product surface around the calculator that already works. This phase should improve layout, copy, hierarchy, and trust cues without changing the underlying calculation model, broadening the scope into a suite, or introducing advanced controls.

</domain>

<decisions>
## Implementation Decisions

### Model transparency
- The active formula should be visible on the page, but visually secondary to the calculator and result.
- Model limits should live in a dedicated block rather than being buried in generic helper copy.
- The dry-yeast conversion rule should remain visible as a short explicit note near the result, not hidden in a footnote-only pattern.
- Disclaimer tone should be sober and direct, with no pseudo-scientific hedging and no alarmist copy.

### Page hierarchy
- On mobile, the order should be: hero, input, result, model block.
- On desktop, the calculator experience should sit in a stable two-column layout.
- The hero should feel compact but authoritative, not expansive or marketing-heavy.
- The model/transparency block should appear immediately below the tool, not far down the page.

### Premium direction
- The overall mood should be editorial and sober rather than dashboard-like or rustic.
- Density should feel airy but controlled, with clean hierarchy and restrained text volume.
- Surface language should lean toward paper plus light glass, with subtle depth rather than heavy chrome.
- Motion should be nearly invisible and used only to support orientation and polish.

### Claude's Discretion
- Exact copy, typography, spacing system, and breakpoint behavior as long as the fixed hierarchy and tone remain intact.
- Exact composition of the model block as long as formula visibility, limits, and disclaimer remain clear and secondary to the main tool.
- Exact animation timing and visual treatment as long as motion stays subtle and never competes with the result.

</decisions>

<specifics>
## Specific Ideas

- Trust in this product should come from clarity and honesty, not from decorative authority signals.
- Phase 03.1 already stabilized the estimator enough for presentation work; this phase should frame the model well, not reopen the math.
- The current result panel now includes the dry yeast equivalent, so Phase 4 should present that information in a more premium and coherent context rather than revisiting the conversion rule itself.
- The page should still feel like one excellent standalone calculator, not an early shell of a larger suite.

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `app/page.tsx`: already provides a compact page shell and is the main integration point for layout and surrounding trust copy.
- `components/calculator/interactive-calculator.tsx`: already owns the live calculator flow, draft-state handling, presets, and reset behavior.
- `components/calculator/calculator-result-panel.tsx`: already owns the result surface, warnings, and the explicit dry-yeast note.

### Established Patterns
- The result area must remain stable even when the estimate is incomplete or invalid.
- Warning semantics, validation feedback, and the live update contract are already locked by earlier phases.
- The visual direction already leans soft and refined; this phase should sharpen that direction, not replace it with a different product identity.

### Integration Points
- Likely implementation work will center on `app/page.tsx` plus selective presentation updates inside the calculator components.
- Formula, limits, and disclaimer content should mount near or below the tool instead of leaking into the domain layer.
- Any premium UI treatment must preserve the current calculator semantics and testable behavior.

</code_context>

<deferred>
## Deferred Ideas

- User-facing choice between multiple models remains deferred to a later milestone.
- Advanced modifiers, fridge logic, hydration-driven inputs, and other richer fermentation variables remain out of scope here.
- Deeper dry-yeast taxonomy beyond the current "instant dry" framing is not a Phase 4 requirement.

</deferred>

---
*Phase: 04-trust-centered-premium-presentation*
*Context gathered: 2026-03-11*
