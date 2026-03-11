# ARCHITECTURE

## Purpose

Definire un'architettura pragmatica per una webapp Next.js standalone, premium e mono-tool nella v1, ma gia predisposta per evolvere in una piccola suite di strumenti sulla fermentazione senza riscrivere fondamenta, dominio o test strategy.

Questa architettura deve sostenere tre obiettivi insieme:

- UI premium, chiara e credibile
- logica di calcolo onesta, isolata e testabile
- crescita futura verso nuovi moduli senza introdurre complessita prematura

## Architectural North Star

La v1 deve restare una singola applicazione Next.js App Router con rendering principalmente statico e un solo "interactive island" client-side per il calcolatore. La scelta corretta non e una monorepo, non e un backend, non e uno state manager globale: e un'app piccola ma disciplinata, con separazione netta fra presentazione, orchestrazione del flusso UI e dominio matematico puro.

Principi guida:

- Un solo tool reale nella v1, nessuna falsa suite simulata
- Tutta la logica di dominio deve essere pura e indipendente da React
- I componenti UI non devono contenere formule, soglie empiriche o copy decisionale sparso
- I correttivi sperimentali devono esistere come seam architetturale, non come pseudo-scienza attiva
- Il secondo tool futuro deve richiedere aggiunta, non rifattorizzazione distruttiva

## Recommended Shape

Per la v1 conviene mantenere un singolo repository Next.js con struttura semplice e leggibile:

```text
/app
  /layout.tsx
  /page.tsx
  /globals.css

/components
  /calculator
    CalculatorShell.tsx
    CalculatorForm.tsx
    ResultCard.tsx
    PresetButtons.tsx
    ExperimentalModifiers.tsx
    ModelInfo.tsx
    SummaryRow.tsx
  /marketing
    Hero.tsx
    SectionShell.tsx
  /ui
    ...shadcn/ui...

/lib
  /calc
    yeast.ts
    modifiers.ts
    validation.ts
    format.ts
    units.ts
  /constants
    limits.ts
    presets.ts
    copy.ts
    tool-metadata.ts
  /types
    calculator.ts
    result.ts

/tests
  /unit
  /integration
  /e2e

/.github/workflows
  ci.yml
```

Questa forma e coerente col brief e sufficiente per la v1. Non serve introdurre subito `/features` o package separati. La seam per la suite futura va lasciata nei confini logici, non nella complessita della cartella.

## Layer Boundaries

### 1. App Layer

Responsabilita:

- definire layout, metadata, shell pagina e sezioni
- decidere dove inizia il client boundary
- comporre hero, calcolatore e contenuti informativi

Regole:

- `app/layout.tsx` e `app/page.tsx` restano server component dove possibile
- il punto di ingresso interattivo e `CalculatorShell.tsx`, marcato `use client`
- nessuna formula matematica in `app/*`

### 2. Composition Layer

Responsabilita:

- orchestrare i sottocomponenti del tool
- trasformare stato UI in input dominio
- applicare copy, badge, warning visuali e gerarchia visiva

Componenti attesi:

- `CalculatorShell`: stato locale, wiring, reset, preset, live calculation
- `CalculatorForm`: input controllati, unita, validazione visuale di campo
- `ResultCard`: visualizzazione risultato, warning, errori, stato modifiers
- `ExperimentalModifiers`: pannello separato e disattivato di default
- `ModelInfo`: formula, limiti, disclaimer e trasparenza metodologica

Regole:

- i componenti leggono dati gia preparati, non calcolano formule
- i componenti non conoscono la matematica del modello, ma solo contratti dati
- la composizione deve essere riutilizzabile se in futuro la homepage diventa hub di piu tool

### 3. Domain Logic Layer

Responsabilita:

- implementare il modello empirico base
- validare input e soglie empiriche
- convertire unita
- gestire formattazione numerica e arrotondamento
- predisporre pipeline modifiers senza influenzare la v1

Regole:

- funzioni pure, deterministiche, senza dipendenze React o DOM
- nessuna dipendenza da componenti, classi CSS o librerie UI
- API di dominio piccole, esplicite e testabili

### 4. Constants and Copy Layer

Responsabilita:

- mantenere limiti empirici, preset rapidi e copy obbligatorio
- evitare stringhe duplicate sparse nei componenti
- centralizzare metadati del tool e future entry di suite

Regole:

- soglie, testi e preset non devono essere hardcoded in piu file
- le costanti di dominio non vanno mischiate con decisioni di rendering

### 5. Type Layer

Responsabilita:

- definire contratti di input, output, modifiers e summary view-model
- proteggere la crescita futura dei moduli

Regole:

- i tipi devono modellare differenze vere: input raw UI, input normalizzato, risultato dominio
- evitare tipi generici "bag of props" che mescolano concetti diversi

## Component Boundaries

| Component | Owns | Must Not Own |
|----------|------|--------------|
| `Hero` | titolo, badge, sottotitolo, contesto editoriale | stato del calcolatore |
| `CalculatorShell` | stato locale, preset/reset, invocazione dominio, derivazione del view-model | formula matematica inline, markup di basso livello di ogni campo |
| `CalculatorForm` | rendering input, eventi utente, hint di campo | risultato finale, copy metodologico lungo |
| `PresetButtons` | rendering preset e callback di applicazione | logica di scaling, validazione completa |
| `ResultCard` | layout del risultato e summary | conversioni, calcoli, gestione eventi |
| `ExperimentalModifiers` | UI della sezione avanzata e stato placeholder/modifier | applicazione reale di coefficienti non validati |
| `ModelInfo` | formula, limiti, disclaimer, trasparenza | stato form, warning runtime |

Decisione pragmatica: lo stato del tool puo vivere interamente in `CalculatorShell` tramite `useState` o `useReducer`. Un form library non e necessario finche esiste un solo tool con pochi campi numerici.

## Domain Boundaries

### Core pure functions

`yeast.ts`

- `calculateBaseYeastPerKg({ temperatureC, timeHours })`
- `scaleYeastToFlour({ gramsPerKg, flourGrams })`
- `calculateFreshYeast({ temperatureC, timeHours, flourGrams, modifiers })`

`validation.ts`

- `validateCalculatorInput({ temperatureC, timeHours, flourGrams })`
- `isWithinEmpiricalRange({ temperatureC, timeHours })`

`units.ts`

- `normalizeFlourToGrams({ flourValue, flourUnit })`

`format.ts`

- `roundDisplayValue(value)`
- eventuali formatter numerici per UI italiana

`modifiers.ts`

- definizione struttura `ExperimentalModifierState`
- registry dei modifiers disponibili
- pipeline no-op o esplicitamente disattivata per MVP

### Required separation

Il modello base e il solo path attivo:

1. normalizzazione input
2. validazione
3. calcolo formula base
4. scaling sulla farina
5. arricchimento con warning e metadata

I correttivi sperimentali non devono alterare il path 1-4 nella MVP. Devono vivere in una seam separata che oggi restituisce:

- `appliedModifiers: []`
- oppure metadata esplicito tipo "nessun correttivo applicato"

Questo evita la finta precisione e rende il futuro upgrade lineare: quando ci saranno coefficienti validati, si aggiungera un passaggio opzionale fra step 3 e 4 senza riscrivere UI o test di base.

## Data Flow

Flusso consigliato:

1. L'utente modifica un input nel form
2. `CalculatorShell` aggiorna lo stato raw UI
3. Il valore farina viene normalizzato in grammi tramite `units.ts`
4. `calculateFreshYeast()` produce risultato, warning, errori e metadata
5. `CalculatorShell` costruisce un view-model minimo per `ResultCard`
6. I componenti renderizzano stato valido, warning o errore senza logica di dominio interna

Decisioni importanti:

- Nessun fetch runtime: la v1 e interamente locale
- Nessun global state: il tool e autosufficiente
- Nessun caching dedicato: il calcolo e banale e live
- Nessuna persistenza iniziale: se servira in futuro, andra aggiunta come concern separato

## State Model

Separare chiaramente tre livelli di stato:

### Raw UI state

Serve a rappresentare cio che l'utente sta digitando, anche se temporaneamente incompleto o invalido.

Esempi:

- `temperatureInput`
- `timeInput`
- `flourInput`
- `flourUnit`
- `experimentalOpen`
- `experimentalModifiers`

### Normalized domain input

Serve a trasformare raw strings o numeri UI in un payload coerente per il dominio.

Esempi:

- `temperatureC: number`
- `timeHours: number`
- `flourGrams: number`

### Derived view-model

Serve a consegnare al rendering un oggetto gia pronto:

- risultato formattato
- warning ordinati
- errori ordinati
- badge e stati visuali
- summary leggibile

Questa separazione impedisce due problemi tipici:

- validazione mischiata ai componenti
- risultato "mezzo calcolato" con stato ambiguo

## Testing Boundaries

### Unit tests

Devono coprire solo il dominio e le utility:

- formula base con casi numerici attesi
- scaling della farina
- conversione unita g/kg
- validazione input
- warning fuori intervallo empirico
- rounding/display rules
- modifiers come struttura separata e no-op

Non vanno testati qui:

- markup dei componenti
- classi CSS
- comportamento specifico di shadcn/ui

### Integration / component tests

Devono coprire il tool come esperienza React:

- rendering valori di default
- live update del risultato
- preset che aggiornano tempo e temperatura ma non la farina
- reset completo dello stato
- comparsa warning fuori range
- blocco pulito del risultato in caso di input invalidi
- distinzione visiva fra modello base e correttivi sperimentali

Qui il boundary corretto e `CalculatorShell` con i figli reali, non il singolo input isolato.

### E2E tests

Devono coprire il flusso utente principale su browser reale:

- homepage caricata correttamente
- interazione con form
- risultato aggiornato
- preset funzionanti
- reset funzionante
- nessun crash o dead-end nel path principale

Non serve una matrice enorme nella v1. Serve uno smoke test vero e stabile.

## Build Order

Per roadmap e implementazione conviene questo ordine:

### Phase 1. Foundation

- inizializzazione Next.js App Router con TypeScript
- Tailwind, shadcn/ui, lucide-react, framer-motion
- lint, typecheck, test runner, Playwright/Cypress, CI
- struttura cartelle e tipi iniziali

### Phase 2. Domain Engine

- tipi del calcolatore
- formula base
- scaling
- conversione unita
- validazione
- rounding
- unit tests completi sul dominio

Motivo: la credibilita del prodotto dipende prima dalla correttezza del motore, non dal polish visivo.

### Phase 3. Interactive Calculator

- `CalculatorShell`
- form con valori di default
- live calculation
- warning/error handling
- preset e reset

### Phase 4. Premium Presentation

- hero editoriale
- result card rifinita
- micro-animazioni leggere
- model info e disclaimers
- rifinitura responsive mobile-first

### Phase 5. Experimental Modifier Seam

- pannello collassabile
- registry modifiers
- UI placeholder coerente
- esplicitazione che i modifiers non influenzano il modello attivo

### Phase 6. Verification Hardening

- integration tests del flusso React
- e2e smoke test
- CI con gate su lint, typecheck, test e build

## Extension Seams For Future Modules

La crescita futura va prevista in modo concreto, non astratto.

### Seam 1. Tool metadata registry

Aggiungere `tool-metadata.ts` con metadati del tool corrente:

- slug
- titolo
- descrizione breve
- stato
- route futura

Oggi serve poco, domani permette di aggiungere un hub o navigazione suite senza riscrivere copy e discovery.

### Seam 2. Route-level expansion

Quando arrivera il secondo tool, la crescita naturale e:

```text
/app
  /(site)/page.tsx
  /(tools)/lievito/page.tsx
  /(tools)/idratazione/page.tsx
```

Finche esiste un solo tool, la homepage puo coincidere con il tool. Quando ne arriveranno due, il calcolatore attuale potra migrare sotto una route dedicata con riuso quasi totale di componenti e dominio.

### Seam 3. Domain package by capability

Il dominio va gia scritto per capacita, non per pagina:

- `yeast.ts` per il modello base
- `validation.ts` per vincoli e warning
- `units.ts` per conversioni
- `modifiers.ts` per pipeline opzionale

Un futuro modulo, per esempio una calcolatrice idratazione, potra aggiungere file propri senza contaminare il modello lievito.

### Seam 4. Shared UI primitives

Componenti come `SectionShell`, `SummaryRow`, badge informativi e card strutturali devono essere neutrali rispetto al tool. Questo permette di riusarli nei moduli futuri mantenendo una famiglia visiva coerente.

### Seam 5. Modifier pipeline

La pipeline modifiers deve restare separata dal modello base anche quando diventera attiva. Architetturalmente:

- input base -> modello empirico
- output base -> applicazione eventuale modifiers validati
- output finale -> formatting e rendering

Questo consente di introdurre, sostituire o disattivare euristiche senza toccare la formula base.

## What Not To Do

Per restare aderenti al brief:

- non introdurre backend, API routes o database
- non usare store globali senza bisogno
- non distribuire la logica matematica nei componenti
- non creare cartelle "future proof" vuote e inutili
- non simulare accuratezza scientifica oltre il modello disponibile
- non testare dettagli implementation-specific di shadcn/ui invece del comportamento prodotto

## Decisions To Lock For Roadmap

- App singola Next.js, non monorepo, almeno finche non esiste un secondo tool reale
- Dominio puro in `lib/calc`, UI in `components`, copy e limiti in `lib/constants`
- `CalculatorShell` come unico orchestratore client-side del tool
- Modello base unico attivo; modifiers separati e non applicati nella MVP
- Test su tre livelli: unit, integration, e2e con CI bloccante
- Espansione futura via nuove route/tool e riuso di primitives, non via backend anticipato

## Roadmap Implications

Se il roadmap verra costruito su questa architettura, le fasi corrette saranno:

1. foundation tecnica e quality baseline
2. motore dominio e test unitari
3. shell interattiva del calcolatore
4. presentazione premium e contenuti di trasparenza
5. seam dei correttivi sperimentali
6. hardening con integration, e2e e CI

Questo ordine minimizza il rischio di una UI bella ma strutturalmente fragile e mantiene il progetto fedele al brief: uno strumento serio, leggibile, onesto e pronto ad accogliere futuri moduli senza pagare oggi complessita non necessaria.
