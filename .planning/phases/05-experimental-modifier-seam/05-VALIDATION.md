---
phase: 5
slug: experimental-modifier-seam
status: approved
nyquist_compliant: true
wave_0_complete: true
created: 2026-03-12
---

# Phase 5 - Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | vitest + playwright |
| **Config file** | `vitest.config.ts`, `playwright.config.ts` |
| **Quick run command** | `npm run test:integration` |
| **Full suite command** | `npm run test:unit && npm run test:integration && npm run test:e2e` |
| **Estimated runtime** | ~50 seconds |

---

## Sampling Rate

- **After every task commit:** Run the task-specific `<automated>` commands from `05-01-PLAN.md`
- **After every plan wave:** Run `npm run test:unit && npm run test:integration && npm run test:e2e`
- **Before `$gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 50 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 05-01-01 | 01 | 1 | EXP-01, EXP-02 | integration + typecheck | `npm run test:integration`; `npm run typecheck` | yes | pending |
| 05-01-02 | 01 | 1 | EXP-01, EXP-02 | unit + integration + typecheck | `npm run test:unit`; `npm run test:integration`; `npm run typecheck` | yes | pending |
| 05-01-03 | 01 | 1 | EXP-01, EXP-02 | unit + integration + e2e | `npm run test:unit`; `npm run test:integration`; `npm run test:e2e` | yes | pending |

*Status: pending / green / red / flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| The advanced accordion feels clearly secondary and sober rather than like a hidden expert mode or a second primary workflow | EXP-01, EXP-02 | Automated tests can prove structure and copy, but not whether the visual weight is too strong or too promotional | Review the calculator on one mobile width and one desktop width, confirm the advanced section is visually quieter than the main input/result flow, and confirm its closed state does not compete with the active result |
| Interacting with experimental controls teaches future scope without implying validated active math | EXP-02 | Automated tests can assert labels and inactive messaging, but not whether the product tone still feels honest | Open the accordion, fill a few modifiers, and confirm the explanatory copy and result context make it obvious those values are placeholders and not applied to the estimate |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all missing references
- [x] No watch-mode flags
- [x] Feedback latency < 50s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** approved 2026-03-12