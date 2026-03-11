---
phase: 4
slug: trust-centered-premium-presentation
status: approved
nyquist_compliant: true
wave_0_complete: true
created: 2026-03-11
---

# Phase 4 - Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | vitest + playwright |
| **Config file** | `vitest.config.ts`, `playwright.config.ts` |
| **Quick run command** | `npm run test:integration` |
| **Full suite command** | `npm run validate:quick && npm run test:e2e` |
| **Estimated runtime** | ~45 seconds |

---

## Sampling Rate

- **After every task commit:** Run the task-specific `<automated>` commands from `04-01-PLAN.md`
- **After every plan wave:** Run `npm run validate:quick && npm run test:e2e`
- **Before `$gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 45 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 04-01-01 | 01 | 1 | UX-01, UX-02 | integration + typecheck | `npm run test:integration`; `npm run typecheck` | yes | pending |
| 04-01-02 | 01 | 1 | TRAN-01, TRAN-02, TRAN-03, UX-02 | integration + typecheck | `npm run test:integration`; `npm run typecheck` | yes | pending |
| 04-01-03 | 01 | 1 | UX-01, UX-03, TRAN-03 | integration + e2e + full quick | `npm run test:integration`; `npm run validate:quick`; `npm run test:e2e` | yes | pending |

*Status: pending / green / red / flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| The page feels editorial, sober, and premium on both mobile and desktop rather than like a demo or dashboard | UX-01, UX-02 | Automated tests can assert structure and content, but not aesthetic judgment or visual hierarchy quality | Review the homepage at one mobile width and one desktop width, confirm the mobile order stays hero -> input -> result -> model block, confirm the desktop layout reads as two stable columns plus a secondary model block, and verify the page feels compact, readable, and not marketing-heavy |
| Motion remains nearly invisible and never delays result readability | UX-03 | Automated tests can detect breakage, but not whether the transitions feel too strong or distracting | Trigger first paint, focus changes, preset interactions, and result updates; confirm any transitions are subtle, fast, and do not obscure headings, inputs, results, or warnings |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all missing references
- [x] No watch-mode flags
- [x] Feedback latency < 45s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** approved 2026-03-11
