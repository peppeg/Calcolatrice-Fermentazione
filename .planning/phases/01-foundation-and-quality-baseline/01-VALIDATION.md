---
phase: 1
slug: foundation-and-quality-baseline
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-11
---

# Phase 1 - Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | vitest + playwright |
| **Config file** | `vitest.config.ts`, `playwright.config.ts` |
| **Quick run command** | `npm run validate:quick` |
| **Full suite command** | `npm run validate:full` |
| **Estimated runtime** | ~30-90 seconds once baseline is in place |

---

## Sampling Rate

- **After every task commit:** Run `npm run validate:quick`
- **After every plan wave:** Run `npm run validate:full`
- **Before `$gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 90 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 1-01-01 | 01 | 1 | ENG-01 | build/lint/typecheck | `npm install && npm run build && npm run lint && npm run typecheck` | ❌ W0 | ⬜ pending |
| 1-01-02 | 01 | 1 | ENG-01 | unit/integration/e2e | `npm run test:unit && npm run test:integration && npm run test:e2e && npm run validate:quick` | ❌ W0 | ⬜ pending |
| 1-01-03 | 01 | 1 | ENG-02 | ci/full validation | `npm run validate:full` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `vitest.config.ts` - unit and integration test runner baseline
- [ ] `playwright.config.ts` - browser smoke test baseline
- [ ] `tests/setup.ts` - shared DOM test setup
- [ ] `tests/unit/app-shell.test.ts` - smoke-level unit target
- [ ] `tests/integration/home-page.test.tsx` - smoke-level integration target
- [ ] `tests/e2e/home.spec.ts` - browser smoke target
- [ ] npm install of framework dependencies - if not already present

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Repository feels serious and GitHub-ready | ENG-02 | This is partly a judgment call about structure and workflow clarity | Review root structure, script naming, CI workflow readability, and that `.planning/` remains untouched while the app baseline lives cleanly at the root |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 90s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
