# Calcolatrice Fermentazione

Tool standalone in italiano per stimare il lievito di birra in una ricetta a partire da:

- temperatura ambiente
- tempo di lievitazione
- quantita di farina

La v1 e volutamente focalizzata: fa molto bene poche cose essenziali, con un'interfaccia curata, una logica dichiarata e un'architettura pronta a crescere.

## Stato del progetto

- Versione milestone: `v1.0`
- Stato: shipped
- UI: live calculator mobile-first, premium, trust-centered
- Modello attivo: empirico tempo + temperatura, riallineato con fixture repo-owned
- Output: lievito fresco per la ricetta + equivalente pratico di lievito secco istantaneo
- Estensioni future: sezione avanzata gia predisposta, ma inattiva nella v1

## Cosa fa la v1

- aggiorna il risultato live senza submit
- gestisce input mancanti, invalidi o fuori range in modo robusto
- mostra formula, limiti e disclaimer del modello
- supporta preset rapidi e reset completo
- espone una sezione avanzata con correttivi sperimentali visibili ma non applicati

## Filosofia del prodotto

Questo progetto non prova a simulare una precisione scientifica che non ha.

Il risultato va letto come:

- stima pratica
- punto di partenza coerente
- riferimento utile per lavorare meglio

Non sostituisce occhio, mani e comportamento reale dell'impasto.

## Modello attivo

La base del modello e una formula empirica che usa:

- `T`: temperatura ambiente
- `t`: tempo di lievitazione

Formula base dichiarata in UI:

```txt
Lbase = 14,5 x t^-0,89 x 2^(-((T - 20) / 10))
```

Nella v1, per i tempi brevi il calcolatore applica anche un riallineamento continuo del modello, per evitare sottostime poco credibili.

La conversione al secco e dichiarata come rapporto pratico `3:1` rispetto al lievito fresco, pensato come equivalenza rapida per lievito secco istantaneo.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Vitest
- Playwright
- GitHub Actions

## Sviluppo locale

Installazione:

```bash
npm install
```

Avvio in sviluppo:

```bash
npm run dev
```

Build produzione:

```bash
npm run build
npm run start
```

## Qualita e test

Script principali:

```bash
npm run lint
npm run typecheck
npm run test:unit
npm run test:integration
npm run test:e2e
npm run validate:quick
npm run validate:full
```

## Struttura

```txt
app/
components/calculator/
lib/calc/
tests/
.planning/
```

- `app/`: shell Next.js
- `components/calculator/`: UI del tool
- `lib/calc/`: motore dominio puro
- `tests/`: unit, integration, e2e
- `.planning/`: artefatti GSD e milestone archive

## Roadmap

La milestone `v1.0` e stata archiviata in:

- [.planning/milestones/v1.0-ROADMAP.md](./.planning/milestones/v1.0-ROADMAP.md)
- [.planning/milestones/v1.0-REQUIREMENTS.md](./.planning/milestones/v1.0-REQUIREMENTS.md)

Il prossimo passo di planning e:

```txt
$gsd-new-milestone
```