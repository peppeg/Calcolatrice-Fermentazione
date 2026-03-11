# Requirements: Calcolatrice Lievitazione

**Defined:** 2026-03-11
**Core Value:** Offrire una stima pratica del lievito fresco che sia immediata, chiara, credibile e abbastanza affidabile da poter essere usata davvero come riferimento operativo.

## v1 Requirements

### Calculator Core

- [x] **CALC-01**: Utente puo inserire temperatura ambiente, tempo di lievitazione, quantita di farina e unita della farina in un form chiaro e coerente.
- [x] **CALC-02**: Utente ottiene un aggiornamento live del risultato senza pulsante di submit.
- [x] **CALC-03**: Utente vede sia i grammi di lievito fresco per la ricetta sia il valore normalizzato per 1 kg di farina.
- [x] **CALC-04**: Utente puo applicare preset rapidi che aggiornano solo tempo e temperatura.
- [x] **CALC-05**: Utente puo eseguire un reset completo allo stato iniziale del tool.

### Reliability and Guidance

- [x] **SAFE-01**: Utente riceve messaggi chiari per input vuoti, non validi, negativi o pari a zero e il risultato viene sospeso in modo pulito quando l'input non e calcolabile.
- [x] **SAFE-02**: Utente riceve un warning non bloccante quando usa il modello fuori dall'intervallo empirico di riferimento.
- [x] **SAFE-03**: Utente vede valori arrotondati in modo pratico per uso reale, senza falsa precisione.

### Model Transparency

- [ ] **TRAN-01**: Utente puo vedere la formula base del modello empirico e capire quali variabili usa.
- [ ] **TRAN-02**: Utente vede un disclaimer chiaro che spiega che il risultato e una stima pratica, non una verita assoluta.
- [ ] **TRAN-03**: Utente vede un riepilogo leggibile dei parametri attivi e dello stato dei correttivi sperimentali.

### Experience and Presentation

- [ ] **UX-01**: Utente usa il tool con una UI premium, leggibile e coerente sia su mobile sia su desktop.
- [ ] **UX-02**: Utente distingue chiaramente area input, area risultato, dettagli del modello e sezione avanzata senza confusione visiva.
- [ ] **UX-03**: Utente percepisce un'interazione rapida e stabile con micro-animazioni discrete che non ostacolano la lettura.

### Experimental Extension Seam

- [ ] **EXP-01**: Utente puo aprire una sezione separata dedicata ai correttivi sperimentali, chiusa di default.
- [ ] **EXP-02**: Utente puo vedere i fattori futuri previsti dal prodotto senza che questi modifichino il calcolo attivo della MVP.

### Engineering Quality

- [x] **ENG-01**: Il progetto espone comandi npm chiari per lint, typecheck, unit test, integration test, e2e test e build.
- [x] **ENG-02**: Il repository include una CI GitHub-ready che esegue i controlli di qualita principali in modo ripetibile.

## v2 Requirements

### Advanced Modeling

- **ADV-01**: Utente puo applicare correttivi avanzati validati con logica esplicita e tracciabile.
- **ADV-02**: Utente puo gestire fermentazione in piu fasi, inclusi scenari con passaggio in frigo.
- **ADV-03**: Utente puo scegliere tipi di lievito differenti con regole dichiarate.

### Product Expansion

- **PROD-01**: Utente puo salvare e riaprire scenari o ricette.
- **PROD-02**: Utente puo usare altri strumenti della stessa famiglia dalla stessa esperienza prodotto.

## Out of Scope

| Feature | Reason |
|---------|--------|
| Backend, database, auth, sync | Non servono alla v1 e spostano attenzione fuori dal valore centrale. |
| Coefficienti attivi per idratazione, sale, zucchero, grassi o forza farina senza validazione | Creerebbero falsa precisione. |
| Suite multi-tool completa | La v1 deve restare focalizzata su un solo strumento. |
| Multi-yeast modes e conversioni automatiche | Allargano il dominio prima di aver consolidato il caso base. |
| Recipe saving, sharing, cloud history | Aumentano scope e complessita senza rafforzare la stima base. |
| AI recommendations | Indebolirebbero la credibilita senza una base dati auditabile. |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| ENG-01 | Phase 1 | Complete |
| ENG-02 | Phase 1 | Complete |
| SAFE-02 | Phase 2 | Complete |
| SAFE-03 | Phase 2 | Complete |
| CALC-01 | Phase 3 | Complete |
| CALC-02 | Phase 3 | Complete |
| CALC-03 | Phase 3 | Complete |
| CALC-04 | Phase 3 | Complete |
| CALC-05 | Phase 3 | Complete |
| SAFE-01 | Phase 3 | Complete |
| TRAN-01 | Phase 4 | Pending |
| TRAN-02 | Phase 4 | Pending |
| TRAN-03 | Phase 4 | Pending |
| UX-01 | Phase 4 | Pending |
| UX-02 | Phase 4 | Pending |
| UX-03 | Phase 4 | Pending |
| EXP-01 | Phase 5 | Pending |
| EXP-02 | Phase 5 | Pending |

**Coverage:**
- v1 requirements: 18 total
- Mapped to phases: 18
- Unmapped: 0
- Completed: 10

---
*Requirements defined: 2026-03-11*
*Last updated: 2026-03-11 after phase 3 completion*
