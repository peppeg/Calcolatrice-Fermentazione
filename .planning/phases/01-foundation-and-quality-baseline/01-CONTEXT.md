# Phase 1: Foundation and Quality Baseline - Context

**Gathered:** 2026-03-11
**Status:** Ready for planning

<domain>
## Phase Boundary

Create the technical baseline, repository discipline, and automated quality gates for a serious v1. This phase covers project bootstrap, repository hygiene, scripts, and CI guardrails. It does not add product capabilities beyond what is needed to establish a trustworthy engineering foundation.

</domain>

<decisions>
## Implementation Decisions

### Quality Gates
- The baseline must be strict: lint, typecheck, unit or integration tests relevant to the phase, and build should be treated as real gates, not advisory checks.
- E2E smoke coverage should block merges once present in CI because this product is trust-sensitive and the main path must stay reliable.
- Coverage policy should be targeted rather than vanity-driven: prioritize very strong coverage on domain logic instead of forcing an arbitrary global project threshold immediately.
- Local automation should be moderate: provide smooth developer guardrails without turning everyday iteration into a heavy pipeline.

### Repository Baseline
- The repository should be set up from the start as a serious project, not a throwaway scaffold.
- GitHub readiness is part of the phase outcome, not an optional later polish step.

### Claude's Discretion
- Exact local automation choice, such as whether to use a lightweight pre-commit hook or only documented npm scripts.
- Exact CI job split and naming, as long as the chosen structure enforces the agreed strict baseline.
- Exact reporting details for test failures and artifacts, as long as debugging remains practical.

</decisions>

<specifics>
## Specific Ideas

- The product should feel credible not only in UI but also in engineering discipline.
- The user prefers a baseline that supports professional, safe iteration rather than a permissive MVP setup.

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- No reusable runtime code exists yet. The workspace is greenfield from an application-code perspective.
- `base.md`: complete product brief and stack constraints that should be treated as the authoritative implementation brief for bootstrap decisions.
- `.planning/*`: project, roadmap, requirements, research, and state artifacts that should guide setup and file structure.

### Established Patterns
- No application patterns exist yet in code.
- The current project pattern is documentation-first: brief, research, requirements, and roadmap already define constraints and quality expectations before implementation starts.
- Git is initialized and planning artifacts are versioned, so planning and execution should continue under normal repository discipline.

### Integration Points
- The first real code should connect to the root Next.js app structure in the repository root.
- Quality tooling should integrate with npm scripts, GitHub Actions, and repository-level config files.
- Future phase work will rely on this phase for stack setup, test harnesses, and baseline folder structure.

</code_context>

<deferred>
## Deferred Ideas

None - discussion stayed within phase scope.

</deferred>

---
*Phase: 01-foundation-and-quality-baseline*
*Context gathered: 2026-03-11*
