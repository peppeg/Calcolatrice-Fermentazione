# Phase 2: Domain Calculation Engine - Context

**Gathered:** 2026-03-11
**Status:** Ready for planning

<domain>
## Phase Boundary

Implement the pure domain engine for the empirical yeast model: base formula per kilogram, flour scaling, robust input validation, out-of-range warning behavior, practical rounding, and the orchestration shape that future UI phases will call. This phase does not define layout, interaction design, presets UI, or experimental modifier behavior beyond keeping the seam explicit and inactive.

</domain>

<decisions>
## Implementation Decisions

### Practical rounding
- Use adaptive rounding rather than a fixed decimal rule or coarse kitchen steps.
- Very small values should remain readable with clear decimals rather than being forced to an artificial minimum.
- Use the same rounding logic for both `gramsPerKg` and `gramsForRecipe` to preserve mental consistency.
- When a number is awkward, favor honesty over cosmetic neatness.

### Validation contract
- Validation feedback should stay specific by field rather than collapsing into overly generic messages.
- Decimal values are acceptable where they make practical sense; the engine should not force integer-only input.
- Positive but implausible values should generally remain calculable with warning-oriented behavior rather than hard blocking, unless they violate the basic numeric validity rules.
- When errors suspend the result, prioritize errors and do not surface additional warnings at the same time.

### Empirical warning behavior
- Use one sober warning model rather than a tiered severity system.
- Trigger the warning as soon as either empirical parameter leaves the reference interval.
- Keep the tone practical and restrained, not alarmist.
- Include the reason compactly when possible so users can tell whether temperature, time, or both are outside the empirical range.

### Claude's Discretion
- Exact numeric thresholds and step sizes for the adaptive rounding rule.
- Exact phrasing of field-specific errors and compact out-of-range reasons.
- Exact TypeScript naming and result-shape details, as long as the engine remains pure, honest, and reusable.

</decisions>

<specifics>
## Specific Ideas

- The user wants the domain output to feel credible in real kitchen use, not mathematically ornamental.
- The engine should encode caution without pretending to know more than the empirical model justifies.
- This phase should establish the first real business-logic conventions of the project.

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `package.json`: the quality contract is already in place, so new domain code should fit unit and integration verification without inventing new workflows.
- `vitest.config.ts` and `tests/unit/`: ready for strong numeric and validation-focused unit coverage.
- `tests/integration/` and `tests/e2e/`: already available for later UI phases, so phase 2 can stay mostly domain-centric.
- `app/page.tsx`: currently a placeholder shell, which means domain work can land without coupling to unfinished UI decisions.

### Established Patterns
- The codebase is still greenfield for runtime logic, so phase 2 gets to establish the first durable domain patterns.
- Phase 1 locked a strict quality bar: domain logic should be validated with real tests, not informal confidence.
- The broader project brief already expects clear TypeScript types, pure functions, and an explicit seam for experimental modifiers.

### Integration Points
- Phase 2 should produce domain exports that Phase 3 can call directly for live calculator updates.
- Validation and warning outputs from this phase will flow into future UI messaging and result presentation.
- The inactive modifier seam created here must remain compatible with Phase 5 without altering MVP math.

</code_context>

<deferred>
## Deferred Ideas

None - discussion stayed within phase scope.

</deferred>

---
*Phase: 02-domain-calculation-engine*
*Context gathered: 2026-03-11*
