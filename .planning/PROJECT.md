# Calcolatrice Lievitazione

## What This Is

Calcolatrice Lievitazione e una webapp standalone in italiano che stima i grammi di lievito di birra fresco in base a tempo, temperatura e quantita di farina. La v1 resta focalizzata su un solo strumento, molto curato nella UI e nella chiarezza del risultato, ma con un'architettura gia pensata per poter evolvere in futuro come primo modulo di una possibile suite di strumenti sulla fermentazione.

## Core Value

Offrire una stima pratica del lievito fresco che sia immediata, chiara, credibile e abbastanza affidabile da poter essere usata davvero come riferimento operativo.

## Requirements

### Validated

- [x] L'utente puo inserire temperatura ambiente, tempo di lievitazione, quantita di farina e unita della farina e ottenere subito una stima credibile.
- [x] L'utente puo vedere sia i grammi di lievito fresco per la ricetta sia un equivalente pratico di lievito secco istantaneo per la stessa ricetta.
- [x] L'utente riceve un'esperienza UI premium, mobile-first, chiara e credibile, senza comportamenti fragili o ambigui.
- [x] L'app gestisce input invalidi, valori fuori intervallo empirico, preset rapidi, reset completo e correttivi sperimentali inattivi senza crash o falsa precisione.
- [x] Il codice resta modulare e riusabile, cosi da supportare futuri strumenti collegati alla fermentazione senza rifare l'architettura.
- [x] Il progetto espone una baseline professionale con npm scripts chiari, test multipli, CI GitHub-ready e repository disciplinato.

### Active

(None - milestone v1 completed)

### Out of Scope

- Backend, database, autenticazione o persistenza dati.
- Correttivi avanzati realmente applicati al calcolo.
- Suite multi-tool completa.
- Funzioni avanzate non essenziali o molteplici modalita operative.

## Context

Il progetto e nato come tool standalone greenfield in Next.js App Router, TypeScript e React, con tutta la logica lato client. Il dominio attivo usa un modello empirico tempo + temperatura riallineato su fixture repo-owned per l'uso standard a temperatura ambiente, con warning non bloccanti fuori intervallo e una correzione continua sui tempi brevi.

Il prodotto e stato esplicitamente costruito per sembrare uno strumento serio per appassionati, non una demo tecnica. La formula base, i limiti del modello e il tono del disclaimer sono visibili in UI. I correttivi sperimentali sono predisposti ma restano inattivi nella v1.

## Constraints

- Tech stack: Next.js App Router, TypeScript, React, npm, Tailwind, test stack vitest + playwright.
- Product scope: v1 mono-tool standalone in italiano.
- Model honesty: un solo modello empirico attivo nella MVP.
- UX: risultato live, UI premium, mobile-first, feedback leggibile e robustezza degli input.
- Architecture: base riusabile ed estendibile verso una futura suite.
- Quality bar: lint, typecheck, unit test, integration test, e2e e build nella baseline.
- Repository: Git inizializzato e CI GitHub-ready.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| La v1 resta un tool singolo standalone in italiano | Mantiene focus e chiarezza del valore | Shipped |
| L'architettura e modulare e predisposta per una futura suite | Evita di ricostruire le fondamenta nelle versioni successive | Shipped |
| L'interfaccia privilegia chiarezza, credibilita e sobrieta | Allinea il prodotto ai criteri di successo dichiarati | Shipped |
| I correttivi sperimentali restano separati e non influenzano il calcolo nella MVP | Protegge l'onesta del modello e impedisce falsa precisione | Shipped |
| La baseline di qualita include test multipli e CI GitHub-ready | Garantisce una base professionale e sicura per evoluzioni future | Shipped |

---
*Last updated: 2026-03-12 after cleanup pass*
