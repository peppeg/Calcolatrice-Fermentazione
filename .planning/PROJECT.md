# Calcolatrice Lievitazione

## What This Is

Calcolatrice Lievitazione e una webapp standalone in italiano che stima i grammi di lievito di birra fresco in base a tempo, temperatura e quantita di farina. La v1 e focalizzata su un solo strumento, molto curato nella UI e nella chiarezza del risultato, ma con un'architettura gia pensata per poter evolvere in futuro come primo modulo di una possibile suite di strumenti sulla fermentazione.

## Core Value

Offrire una stima pratica del lievito fresco che sia immediata, chiara, credibile e abbastanza affidabile da poter essere usata davvero come riferimento operativo.

## Requirements

### Validated

(None yet - ship to validate)

### Active

- [ ] L'utente puo inserire temperatura ambiente, tempo di lievitazione e quantita di farina e ottenere subito i grammi di lievito fresco per la ricetta.
- [ ] L'utente puo vedere anche il valore espresso per 1 kg di farina, con formula base e limiti del modello dichiarati in modo trasparente.
- [ ] L'utente riceve un'esperienza UI premium, mobile-first, chiara e credibile, senza comportamenti fragili o ambigui.
- [ ] L'app gestisce input invalidi, valori fuori intervallo empirico, preset rapidi e reset completo senza crash o falsi segnali di precisione.
- [ ] Il codice resta modulare e riusabile, cosi da supportare futuri strumenti collegati alla fermentazione senza rifare l'architettura.

### Out of Scope

- Backend, database, autenticazione o persistenza dati - non servono alla v1 e aumenterebbero complessita senza rafforzare il valore centrale.
- Correttivi avanzati realmente applicati al calcolo - nella v1 devono restare predisposti ma non simulare precisione scientifica non validata.
- Suite multi-tool completa - la v1 deve restare focalizzata su una singola calcolatrice ben fatta.
- Funzioni avanzate non essenziali o molteplici modalita operative - priorita a chiarezza, velocita e affidabilita percepita.

## Context

Il progetto parte da zero in un repository greenfield. Il brief richiede Next.js con App Router, TypeScript, React, shadcn/ui, Tailwind CSS, lucide-react e framer-motion per micro-animazioni leggere. Tutta la logica deve restare lato client.

Il dominio e una calcolatrice della lievitazione centrata sul modello empirico:

`g(T, t) = 14.5 x t^(-0.89) x 2^(-(T - 20) / 10)`

Il prodotto deve essere percepito come uno strumento serio per appassionati, non come demo tecnica o dashboard generica. La trasparenza e centrale: la formula base deve essere visibile, il risultato va presentato come stima pratica e la distinzione tra modello affidabile e correttivi sperimentali deve essere netta.

Il committente considera la v1 riuscita se una persona apre l'app e pensa: "Bella, chiarissima, veloce, capisco cosa sto calcolando e mi fido abbastanza da usarla davvero come riferimento pratico."

La qualita richiesta include test professionali su logica, UI e flusso principale, repository Git pronto, e setup GitHub-ready con CI.

## Constraints

- **Tech stack**: Next.js App Router, TypeScript, React, npm, shadcn/ui, Tailwind CSS, lucide-react e framer-motion - sono vincoli espliciti del brief.
- **Product scope**: v1 mono-tool standalone in italiano - serve mantenere focus e qualita invece di allargare prematuramente il prodotto.
- **Model honesty**: solo il modello empirico base e realmente attivo nella MVP - i correttivi sperimentali non devono introdurre falsa precisione.
- **UX**: risultato live, UI premium, mobile-first, feedback leggibile e robustezza degli input - sono i criteri pratici di successo dichiarati.
- **Architecture**: base riusabile ed estendibile verso una futura suite - bisogna evitare accoppiamenti inutili e logica sparsa nei componenti UI.
- **Quality bar**: lint, typecheck, unit test, integration/component test, e2e e build devono far parte della baseline - il progetto non puo essere consegnato come semplice prototipo visivo.
- **Repository**: Git inizializzato e struttura GitHub-ready con CI - il progetto deve nascere gia con disciplina di manutenzione.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| La v1 sara un tool singolo standalone in italiano | Mantiene focus e permette di eccellere sulle funzioni essenziali | - Pending |
| L'architettura sara modulare e predisposta per una futura suite | Evita di dover ricostruire le fondamenta quando arriveranno altri strumenti | - Pending |
| L'interfaccia privilegia chiarezza, credibilita e sobrieta rispetto a feature extra o effetti visivi | E coerente con i criteri di successo dichiarati | - Pending |
| I correttivi sperimentali restano separati e non influenzano il calcolo nella MVP | Protegge l'onesta del modello e impedisce falsa precisione | - Pending |
| La baseline di qualita includera test multipli e CI GitHub-ready | Serve una base professionale e sicura per evoluzioni future | - Pending |

---
*Last updated: 2026-03-11 after initialization*
