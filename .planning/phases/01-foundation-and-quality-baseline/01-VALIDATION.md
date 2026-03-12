---
phase: 1
slug: foundation-and-quality-baseline
status: approved
nyquist_compliant: true
wave_0_complete: true
created: 2026-03-11
---

# Phase 1 - Validation Strategy

## Test Infrastructure

| Property | Value |
|----------|-------|
| Framework | vitest + playwright |
| Config file | vitest.config.ts, playwright.config.ts |
| Quick run command | npm run validate:quick |
| Full suite command | npm run validate:full |
| Estimated runtime | 30-90 seconds |

## Sampling Rate

- After every task commit: npm run validate:quick
- After every plan wave: npm run validate:full
- Before -verify-work: full suite must be green
- Max feedback latency: 90 seconds

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 1-01-01 | 01 | 1 | ENG-01 | build/lint/typecheck | npm run build; npm run lint; npm run typecheck | yes | green |
| 1-01-02 | 01 | 1 | ENG-01 | unit/integration/e2e | npm run test:unit; npm run test:integration; npm run test:e2e; npm run validate:quick | yes | green |
| 1-01-03 | 01 | 1 | ENG-02 | ci/full validation | npm run validate:full | yes | green |

## Wave 0 Requirements

Existing infrastructure covers all phase requirements.

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Repository feels serious and GitHub-ready | ENG-02 | Partly a structural judgment call | Review root structure, script naming, CI readability, and that app code lives cleanly at the root |

## Validation Sign-Off

- [x] All tasks have automated verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all missing references
- [x] No watch-mode flags
- [x] Feedback latency < 90s
- [x] nyquist_compliant set true in frontmatter

Approval: approved 2026-03-11
