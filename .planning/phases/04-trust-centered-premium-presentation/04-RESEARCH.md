# Phase 4: Trust-Centered Premium Presentation - Research

**Date:** 2026-03-11
**Phase:** 4
**Status:** Complete

## What This Phase Actually Needs To Solve

Phase 4 is not a feature-expansion phase. The live calculator already works, the model has already been realigned in Phase 03.1, and the product direction is explicitly mono-tool and mono-model for v1. The real planning question is how to make the existing experience feel premium and trustworthy without introducing scope creep, visual noise, or pseudo-authoritative messaging.

The implementation has to solve three things at once:
- raise the visual quality of the homepage on mobile and desktop;
- make the model legible and honest through formula, limits, and disclaimer copy;
- improve the result surface so trust comes from context and readability, not just from a large number in grams.

## Current Baseline And Constraints

### What already exists and should be preserved
- `app/page.tsx` is still a server component and currently provides the outer shell and hero.
- `components/calculator/interactive-calculator.tsx` already owns live updates, presets, reset, field-level errors, and result-state derivation.
- `components/calculator/calculator-result-panel.tsx` already owns the mounted result area, warning rendering, and the explicit dry-yeast conversion note.
- Integration and e2e coverage already validate the basic calculator flow and should remain the backbone of regression protection.

### What should not change in this phase
- The active math, warning semantics, and calculation contract should remain untouched.
- The page should not start behaving like a multi-tool suite landing page.
- Phase 5's experimental section should not be implemented early just to satisfy presentation goals.
- The result area must remain stable across guidance, invalid, success, and warning states.

## Planning Implications

### 1. Keep the page shell server-rendered and centralize premium framing at the page level
The cleanest structure is to keep `app/page.tsx` as the composition layer for hero, calculator section, and a dedicated model/transparency block below the tool. This preserves the current server/client boundary and keeps presentation-only content out of the domain layer.

### 2. Keep the calculator flow intact, but upgrade its information architecture
`interactive-calculator.tsx` should continue to own the live interaction contract, but it likely needs a slightly richer success view-model so the result panel can summarize active parameters and explicitly state that experimental modifiers are inactive in v1. That is the safest way to satisfy `TRAN-03` without prematurely building the Phase 5 advanced section.

### 3. Extract the model/transparency content into a dedicated presentational component
A separate UI component below the tool is the safest place to surface:
- the active formula and its variables;
- the reliability window / model limits;
- the practical disclaimer about empirical estimation.

This avoids bloating the result card and keeps the formula visible but secondary, exactly as locked in context.

### 4. Premium direction should come from hierarchy and materials, not ornament
The requested tone points toward:
- compact hero copy with tighter hierarchy;
- stable two-column desktop tool layout;
- paper-like main surfaces with light glass accents or separators;
- restrained typography and whitespace instead of decorative flourishes;
- nearly invisible motion, likely limited to fade/translate-on-mount or focus transitions.

That means the phase should prefer class-level refinements and small structural additions over animation-heavy or novelty-heavy UI work.

### 5. The result panel should become more trustworthy, not just more decorative
The current result panel already gives the two yeast outputs and warning copy. To satisfy `TRAN-03` well, the success state should also include a compact summary of the active scenario, for example temperature, time, flour quantity/unit, active estimator label, and experimental modifiers status. This should read like a grounded operating summary, not like scientific instrumentation.

## Recommended Implementation Shape

### Page composition
- Keep `app/page.tsx` as the page shell.
- Refine the hero into a more editorial, compact introduction.
- Mount the calculator block first.
- Mount a dedicated model/transparency block directly below the calculator.

### Calculator/result composition
- Keep `InteractiveCalculator` as the only client interaction boundary.
- Extend its success-state payload with the minimal active-parameter summary required by `TRAN-03`.
- Keep the result card focused on outcome + practical context.

### Transparency block content
A dedicated model block should likely contain three subareas:
- `Formula base` - visible equation with plain-language variable labels.
- `Intervallo utile` - temperature/time reliability window and what happens outside it.
- `Come leggere il risultato` - short disclaimer explaining empirical estimate, not absolute truth.

### Motion strategy
The safest premium implementation is to avoid any animation dependencies or client-only motion wrappers. Small CSS transitions and subtle opacity/position entrance behavior are enough and easier to keep deterministic in tests.

## Risks To Plan Around

### Risk: The page becomes visually richer but less clear
Mitigation: keep mobile order fixed as hero -> input -> result -> model block, and validate this structure in integration tests through headings and copy presence rather than brittle style assertions.

### Risk: The formula block duplicates or conflicts with result-panel copy
Mitigation: keep formula/limits/disclaimer below the tool as the explanatory layer, while the result panel focuses on the current scenario and output.

### Risk: `TRAN-03` accidentally expands into Phase 5
Mitigation: represent experimental modifiers only as an explicit inactive status in the result context. Do not add toggles, drawers, or inactive controls.

### Risk: Motion or visual refactors accidentally destabilize accessibility or test selectors
Mitigation: preserve stable labels, headings, and `data-testid` markers, and extend the existing browser smoke rather than replacing it.

## Test Planning Implications

Phase 4 is primarily a presentation phase, but it still needs durable regression coverage.

### Automated coverage should prove
- the page still renders the calculator and live results correctly;
- the transparency/model block is visible with formula, limits, and disclaimer copy;
- the success state includes active-parameter summary and experimental-modifier status;
- warning behavior and dry-yeast note remain visible when appropriate;
- the browser smoke still passes after layout and copy changes.

### Manual review should still confirm
- the layout feels editorial and sober on both mobile and desktop widths;
- spacing and visual hierarchy remain strong under real viewport constraints;
- motion is nearly invisible and does not delay or obscure the result.

## Validation Architecture

### Required automated feedback loops
- Fast loop: `npm run test:integration`
- Structural safety: `npm run typecheck`
- Visual/system safety: `npm run validate:quick`
- Browser + accessibility smoke: `npm run test:e2e`

### Best test ownership by surface
- `tests/integration/home-page.test.tsx` should own the presence and wording of hero, transparency block, result-summary context, and stable tool flow.
- `tests/e2e/home.spec.ts` should remain lightweight and prove that the premium composition is reachable, interactive, and still accessible in the browser.
- No new unit-heavy surface is required unless a new pure formatter/helper is introduced for the result summary.

### Recommended execution shape
One plan in one wave is sufficient. The work is tightly coupled across `app/page.tsx`, the calculator presentation components, and the page-level tests. Splitting it further would create artificial boundaries and more plan overhead than execution value.

## Planning Recommendation

Plan Phase 4 as one execute plan with three tasks:
1. Restructure and refine the page shell and layout hierarchy.
2. Upgrade result/trust presentation and add the dedicated model/transparency block.
3. Refresh integration and e2e coverage to lock the new premium trust surface.

That is enough to satisfy `TRAN-01`, `TRAN-02`, `TRAN-03`, `UX-01`, `UX-02`, and `UX-03` without absorbing Phase 5 or reopening Phase 03.1.

---
*Research completed: 2026-03-11*
*Phase: 04-trust-centered-premium-presentation*
