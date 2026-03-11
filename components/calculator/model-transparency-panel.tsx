import { EMPIRICAL_TEMPERATURE_RANGE_C, EMPIRICAL_TIME_RANGE_HOURS } from '@/lib/calc/constants';

const DISPLAY_FONT = '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif';
const MONO_FONT = '"IBM Plex Mono", "SFMono-Regular", Consolas, monospace';

const VARIABLE_CARDS = [
  {
    symbol: 'T',
    label: 'Temperatura ambiente',
    detail: 'Guida la velocita del modello nella cucina standard.',
  },
  {
    symbol: 't',
    label: 'Tempo di lievitazione',
    detail: "Riduce progressivamente il lievito richiesto quando l'impasto ha piu tempo.",
  },
  {
    symbol: 'F',
    label: 'Farina',
    detail: 'Non cambia la formula base: scala solo i grammi finali della ricetta.',
  },
] as const;

export function ModelTransparencyPanel() {
  return (
    <section className="rounded-[2.4rem] border border-white/65 bg-white/82 p-5 shadow-[0_28px_80px_-48px_rgba(41,37,36,0.5)] backdrop-blur sm:p-6 lg:p-7">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-stone-500">
          Modello e limiti
        </p>
        <div className="space-y-3 lg:max-w-3xl">
          <h2
            className="text-3xl leading-none tracking-[-0.03em] text-stone-950 sm:text-[2.4rem]"
            style={{ fontFamily: DISPLAY_FONT }}
          >
            Formula visibile, limiti espliciti, tono sobrio.
          </h2>
          <p className="text-sm leading-7 text-stone-700 sm:text-base">
            La v1 usa un solo modello empirico per l&apos;uso a temperatura ambiente. La formula
            base resta dichiarata, mentre sotto le 12 ore il tool applica un riallineamento
            continuo sui tempi brevi per evitare sottostime poco credibili.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)_minmax(0,0.85fr)]">
        <article className="rounded-[2rem] border border-stone-200/80 bg-stone-950/[0.03] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
            Formula base
          </p>
          <p
            className="mt-4 overflow-x-auto rounded-[1.4rem] border border-stone-200/80 bg-white/88 px-4 py-4 text-sm leading-7 text-stone-900 sm:text-[0.95rem]"
            style={{ fontFamily: MONO_FONT }}
          >
            {'Lbase = 14,5 \u00D7 t^-0,89 \u00D7 2^(-((T - 20) / 10))'}
          </p>
          <p className="mt-4 text-sm leading-7 text-stone-700">
            Questa e la struttura leggibile del modello. La farina non ne cambia la forma: serve
            solo a scalare i grammi finali della ricetta.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {VARIABLE_CARDS.map((card) => (
              <div
                key={card.symbol}
                className="rounded-[1.4rem] border border-stone-200/75 bg-white/88 px-4 py-4"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
                  {card.symbol}
                </p>
                <p className="mt-2 text-sm font-medium text-stone-900">{card.label}</p>
                <p className="mt-2 text-sm leading-6 text-stone-600">{card.detail}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[2rem] border border-stone-200/80 bg-white/88 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
            Intervallo utile
          </p>
          <div className="mt-4 space-y-4 text-sm leading-7 text-stone-700">
            <div className="rounded-[1.4rem] border border-amber-200/80 bg-amber-50/80 px-4 py-4 text-amber-950">
              <p className="font-medium">Temperatura</p>
              <p>
                {EMPIRICAL_TEMPERATURE_RANGE_C.min}-{EMPIRICAL_TEMPERATURE_RANGE_C.max} {'\u00B0'}C
              </p>
            </div>
            <div className="rounded-[1.4rem] border border-amber-200/80 bg-amber-50/80 px-4 py-4 text-amber-950">
              <p className="font-medium">Tempo</p>
              <p>
                {EMPIRICAL_TIME_RANGE_HOURS.min}-{EMPIRICAL_TIME_RANGE_HOURS.max} h
              </p>
            </div>
            <p>
              Fuori da questa finestra il tool continua a rispondere, ma segnala che la stima e
              meno affidabile.
            </p>
          </div>
        </article>

        <article className="rounded-[2rem] border border-stone-200/80 bg-white/88 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
            Come leggere il risultato
          </p>
          <div className="mt-4 space-y-3 text-sm leading-7 text-stone-700">
            <p>
              Il numero restituito e una stima pratica, non una verita assoluta. Serve per partire
              con un riferimento coerente, poi va sempre confermato dall&apos;impasto reale.
            </p>
            <p>
              La conversione al secco resta un rapporto pratico 3:1 rispetto al fresco, pensato
              come equivalenza rapida e non come standard universale di tutti i prodotti secchi.
            </p>
            <p className="rounded-[1.4rem] border border-stone-200/80 bg-stone-950/[0.03] px-4 py-4 text-stone-900">
              Correttivi sperimentali, frigo e variabili avanzate restano fuori dalla v1: qui il
              modello dichiara solo cio che usa davvero.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
