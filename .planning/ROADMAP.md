# Roadmap: Calcolatrice Lievitazione

**Created:** 2026-03-11
**Phases:** 6
**v1 requirements mapped:** 18 / 18

## Roadmap Summary

| Phase | Name | Goal | Requirements | Status |
|-------|------|------|--------------|--------|
| 1 | Foundation and Quality Baseline | Create the technical baseline, repository discipline, and automated quality gates for a serious v1. | ENG-01, ENG-02 | Complete (2026-03-11) |
| 2 | Domain Calculation Engine | Implement the empirical model, normalization, validation primitives, and trustworthy numerical behavior. | SAFE-02, SAFE-03 | Complete (2026-03-11) |
| 3 | Interactive Calculator Flow | Deliver the live calculator experience with robust input handling, presets, reset, and reliable result orchestration. | CALC-01, CALC-02, CALC-03, CALC-04, CALC-05, SAFE-01 | Complete (2026-03-11) |
| 4 | Trust-Centered Premium Presentation | Make the tool feel premium, understandable, and honest through layout, copy, formula visibility, and polished interaction. | TRAN-01, TRAN-02, TRAN-03, UX-01, UX-02, UX-03 | Planned |
| 5 | Experimental Modifier Seam | Add the advanced section and future-facing modifier architecture without contaminating the active MVP math. | EXP-01, EXP-02 | Planned |

## Phase Details

### Phase 1: Foundation and Quality Baseline

**Goal**

Create the technical baseline, repository discipline, and automated quality gates for a serious v1.

**Status**

Complete on 2026-03-11.

**Requirements**

- ENG-01
- ENG-02

**Success criteria**

1. A new Next.js App Router project exists with the agreed stack, npm, strict TypeScript, and the initial folder structure required by the brief.
2. Lint, typecheck, unit, integration, e2e, and build commands are defined and runnable through npm scripts.
3. Git is initialized with a clean `.gitignore` suitable for Next.js, Node, tests, and local artifacts.
4. A GitHub Actions workflow runs the main quality checks and fails when baseline quality breaks.

### Phase 2: Domain Calculation Engine

**Goal**

Implement the empirical model, normalization, validation primitives, and trustworthy numerical behavior.

**Status**

Complete on 2026-03-11.

**Requirements**

- SAFE-02
- SAFE-03

**Success criteria**

1. Pure domain functions exist for base yeast calculation, flour scaling, flour unit normalization, validation, and practical rounding.
2. The calculation path clearly separates normalized input, validation, base model output, and final result metadata.
3. The empirical range warning logic is implemented as a non-blocking warning in the domain layer.
4. Unit tests cover the formula, scaling, conversion, validation, and rounding behavior with reliable numeric assertions.

### Phase 3: Interactive Calculator Flow

**Goal**

Deliver the live calculator experience with robust input handling, presets, reset, and reliable result orchestration.

**Requirements**

- CALC-01
- CALC-02
- CALC-03
- CALC-04
- CALC-05
- SAFE-01

**Success criteria**

1. Users can interact with temperature, time, flour quantity, and flour unit and see live updates without a submit button.
2. The result area shows both recipe-scaled output and normalized per-kilogram output when input is valid.
3. Invalid or incomplete input produces clear feedback and suppresses the final result cleanly instead of leaving stale answers on screen.
4. Presets update only the intended values, and reset restores the full initial state including advanced-panel state.
5. Integration tests verify the default render, live updates, presets, reset, and invalid-state handling.

### Phase 03.1: Empirical Model Realignment (INSERTED)

**Goal:** [Urgent work - to be planned]
**Requirements**: TBD
**Depends on:** Phase 3
**Plans:** 0 plans

Plans:
- [ ] TBD (run /gsd:plan-phase 03.1 to break down)

### Phase 4: Trust-Centered Premium Presentation

**Goal**

Make the tool feel premium, understandable, and honest through layout, copy, formula visibility, and polished interaction.

**Requirements**

- TRAN-01
- TRAN-02
- TRAN-03
- UX-01
- UX-02
- UX-03

**Success criteria**

1. The homepage presents a polished hero, balanced layout, and clear separation between input, result, and model information on both mobile and desktop.
2. The formula, main disclaimer, and model limits are visible and understandable without needing source-code knowledge.
3. The result card summarizes active parameters, warnings, and estimator context in a way that supports trust rather than pseudo-science.
4. Motion is subtle and supports orientation only; it does not delay or obscure critical information.
5. Visual and interaction details align with the requested premium, sober, editorial product direction.

### Phase 5: Experimental Modifier Seam

**Goal**

Add the advanced section and future-facing modifier architecture without contaminating the active MVP math.

**Requirements**

- EXP-01
- EXP-02

**Success criteria**

1. The UI includes a closed-by-default advanced section dedicated to experimental modifiers.
2. The future factor categories required by the brief are represented in data structures and UI affordances.
3. The active calculation remains unchanged when experimental controls are present in the MVP.
4. The app makes it obvious that these controls are heuristic placeholders for future work, not validated active math.
5. Tests prove modifier presence does not alter base-model results in the MVP.

## Coverage Check

| Requirement | Phase |
|-------------|-------|
| ENG-01 | Phase 1 |
| ENG-02 | Phase 1 |
| SAFE-02 | Phase 2 |
| SAFE-03 | Phase 2 |
| CALC-01 | Phase 3 |
| CALC-02 | Phase 3 |
| CALC-03 | Phase 3 |
| CALC-04 | Phase 3 |
| CALC-05 | Phase 3 |
| SAFE-01 | Phase 3 |
| TRAN-01 | Phase 4 |
| TRAN-02 | Phase 4 |
| TRAN-03 | Phase 4 |
| UX-01 | Phase 4 |
| UX-02 | Phase 4 |
| UX-03 | Phase 4 |
| EXP-01 | Phase 5 |
| EXP-02 | Phase 5 |

**Coverage result:** 18 of 18 v1 requirements are mapped to exactly one phase.

---
*Last updated: 2026-03-11 after inserting phase 03.1*
