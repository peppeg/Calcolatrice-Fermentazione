# Research Summary

## Executive Takeaways

This project should be built as a trust-first standalone calculator, not as a broad dough suite. The strongest pattern across the research is that credibility comes from three things working together:

- a fast and honest core estimate
- a premium but very clear interface
- visible boundaries between validated math and future heuristics

## Recommended Stack

### Core platform

- Next.js 16 with App Router
- React 19.2
- TypeScript 5.9 in strict mode
- Node 24 LTS for development and primary CI
- npm with committed lockfile

### UI and interaction

- Tailwind CSS 4.1
- shadcn/ui with Radix primitives
- lucide-react
- motion/react for restrained micro-animations only
- token-driven design system with CSS variables

### Quality baseline

- Vitest + React Testing Library + jsdom for unit and integration tests
- Playwright for e2e
- @axe-core/playwright for one main accessibility smoke
- ESLint 9 flat config + Prettier + prettier-plugin-tailwindcss
- GitHub Actions with explicit lint, typecheck, tests, and build jobs

## Product Shape

### Table stakes for v1

- temperature, time, flour quantity, and flour unit as core inputs
- live calculation with no submit button
- result for recipe and per-kilogram reference
- clear validation and clean invalid-state handling
- warning outside empirical range without blocking the estimate
- visible formula and explanation of model scope
- presets and reset
- mobile-first premium UI
- explicit disclaimer that the result is a practical estimate
- visible experimental modifiers section that is not active in the MVP

### Differentiators worth keeping

- trust-first result framing instead of a naked number
- clear separation between active model and future factors
- practical rounding policy aligned with kitchen use
- strong editorial/product presentation without dashboard aesthetics

### Anti-features for v1

- active advanced correction coefficients without validated calibration
- full dough builder and recipe formulation engine
- multi-stage fermentation scheduler
- multiple yeast types and automatic conversions
- saved recipes, sync, sharing, or accounts
- AI recommendations layered on top of weak evidence
- premature suite behavior or over-built architecture

## Architecture Direction

The correct shape for v1 is a single Next.js app with:

- server-rendered page shell
- one client-side calculator boundary
- pure domain logic under `lib/calc`
- shared constants and copy under `lib/constants`
- typed domain contracts under `lib/types`
- small calculator composition components under `components/calculator`

Important boundaries:

- formulas and validation stay out of React components
- modifiers remain a separate typed seam and do not affect the base formula in v1
- raw UI state, normalized input, and derived result view-model should stay distinct
- future suite growth should happen through new routes and shared primitives, not through premature backend or monorepo work

## Main Risks To Guard Against

- making the app sound more scientific than it is
- mixing validated base logic with speculative modifiers
- hiding empirical range limits or assumptions
- allowing fragile input and stale result behavior
- prioritizing atmosphere over clarity in the UI
- testing only the math and not the honesty/UX rules
- under-engineering because it is "just a calculator"
- shipping without CI or clear repository guardrails
- using authoritative copy that does not actually educate the user
- expanding breadth before the trust loop is solid

## Implications For Requirements And Roadmap

The roadmap should prioritize:

1. technical and quality foundation
2. pure domain engine and unit coverage
3. interactive calculator flow with robust input handling
4. premium result presentation and model transparency
5. experimental modifier seam without active modifier math
6. final hardening across integration, e2e, and CI

## Bottom Line

A successful v1 is the narrowest version that feels good enough to trust in practice:

- one reliable estimator
- one excellent interface
- one honest model story
