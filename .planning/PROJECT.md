# Calcolatrice Lievitazione

## What This Is

Calcolatrice Lievitazione e una webapp standalone in italiano che stima i grammi di lievito di birra fresco in base a tempo, temperatura e quantita di farina. La v1 spedita e focalizzata su un solo strumento, con architettura gia pronta a crescere come primo modulo di una possibile suite di strumenti sulla fermentazione.

## Core Value

Offrire una stima pratica del lievito fresco che sia immediata, chiara, credibile e abbastanza affidabile da poter essere usata davvero come riferimento operativo.

## Current State

- Version shipped: v1.0
- Status: shipped and archived
- Stack: Next.js App Router, TypeScript, React, Tailwind, Vitest, Playwright, GitHub Actions
- Product surface: live calculator, trust-centered result panel, visible formula and limits, practical dry-yeast equivalent, inactive experimental seam
- Domain state: empirical ambient-use model calibrated with repo-owned fixtures and continuous short-time correction below 12 hours
- Quality state: npm quality contract, unit/integration/e2e coverage, CI green, milestone audit passed

## Next Milestone Goals

- Validare eventuali correttivi avanzati senza introdurre falsa precisione.
- Studiare gestione credibile di frigo e fermentazione in piu fasi.
- Valutare tipi di lievito differenti e loro regole esplicite.
- Preparare eventuale espansione verso altri strumenti della stessa famiglia.

## Validated

- v1.0 shipped a credible live yeast calculator with premium UI and explicit model transparency.
- v1.0 proved the architecture can host future modeling seams without contaminating active math.
- v1.0 established a professional engineering baseline with CI and automated regression coverage.

## Out of Scope for v1

- Backend, database, auth, sync.
- Advanced modifiers actively applied to the estimate.
- Full multi-tool suite.
- Saved recipes or cloud history.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Keep v1 as a single focused tool | Focus beats premature suite complexity | Good |
| Use one active empirical model in the MVP | Avoid false authority and UX confusion | Good |
| Show formula, limits and disclaimer directly in UI | Trust requires visible assumptions | Good |
| Convert fresh to instant dry yeast with a practical 3:1 rule | Faster real-world usefulness than abstract per-kg normalization | Good |
| Keep experimental modifiers visible but inactive | Preserve future extensibility without contaminating current math | Good |

---
*Last updated: 2026-03-12 after v1.0 milestone completion*
