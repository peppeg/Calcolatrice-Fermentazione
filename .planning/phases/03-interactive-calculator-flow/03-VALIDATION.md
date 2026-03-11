---
phase: 03
slug: interactive-calculator-flow
status: approved
nyquist_compliant: true
wave_0_complete: true
created: 2026-03-11
---

# Phase 03 - Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | vitest + playwright |
| **Config file** | `vitest.config.ts`, `playwright.config.ts` |
| **Quick run command** | `npm run test:integration` |
| **Full suite command** | `npm run validate:quick && npm run test:e2e` |
| **Estimated runtime** | ~25 seconds |

---

## Sampling Rate

- **After every task commit:** Run the task-specific `<automated>` commands from `03-01-PLAN.md`
- **After every plan wave:** Run `npm run validate:quick && npm run test:e2e`
- **Before `$gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 25 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 03-01-01 | 01 | 1 | SAFE-01 | unit + typecheck | `npm run test:unit`; `npm run typecheck` | yes | pending |
| 03-01-02 | 01 | 1 | CALC-01, CALC-02, CALC-03, CALC-04, CALC-05, SAFE-01 | integration + typecheck | `npm run test:integration`; `npm run typecheck` | yes | pending |
| 03-01-03 | 01 | 1 | CALC-02, CALC-04, CALC-05, SAFE-01 | integration + e2e smoke | `npm run test:integration`; `npx playwright test tests/e2e/home.spec.ts` | yes | pending |

*Status: pending / green / red / flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Result area feels visually stable while switching between guidance, invalid, and success states | SAFE-01, CALC-02 | Automated tests can prove state changes, but not whether the layout feels jumpy or visually disruptive | On mobile and desktop widths, type from empty to valid to invalid states and confirm the result region remains mounted, readable, and does not leave stale numbers on screen |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all missing references
- [x] No watch-mode flags
- [x] Feedback latency < 30s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** approved 2026-03-11