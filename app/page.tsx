import { InteractiveCalculator } from '@/components/calculator/interactive-calculator';
import { ModelTransparencyPanel } from '@/components/calculator/model-transparency-panel';

const BODY_FONT = '"Avenir Next", "Segoe UI", "Helvetica Neue", sans-serif';
const DISPLAY_FONT = '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif';

const HERO_FACTS = [
  {
    label: 'Variabili attive',
    value: 'Temperatura, tempo, farina',
  },
  {
    label: 'Finestra utile',
    value: '16-36 °C · 4-24 h',
  },
  {
    label: 'Lettura pratica',
    value: 'Fresco + secco istantaneo',
  },
] as const;

export default function Home() {
  return (
    <main
      className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(217,119,6,0.18),_transparent_26%),linear-gradient(180deg,_#f6f1e8_0%,_#f0e9df_42%,_#ebe2d6_100%)] px-4 py-6 text-stone-950 sm:px-6 lg:px-8 lg:py-10"
      style={{ fontFamily: BODY_FONT }}
    >
      <div className="mx-auto max-w-6xl space-y-6">
        <section className="relative overflow-hidden rounded-[2.75rem] border border-white/65 bg-white/78 p-6 shadow-[0_36px_90px_-48px_rgba(41,37,36,0.55)] backdrop-blur sm:p-8 lg:p-10">
          <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.26),_transparent_72%)]" />
          <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(18rem,0.7fr)] lg:items-end">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-stone-500">
                Calcolatrice della lievitazione · v1
              </p>
              <div className="space-y-3">
                <h1
                  className="max-w-3xl text-4xl leading-none tracking-[-0.03em] text-stone-950 sm:text-5xl lg:text-[3.8rem]"
                  style={{ fontFamily: DISPLAY_FONT }}
                >
                  Una stima pratica del lievito fresco, con il modello sempre leggibile.
                </h1>
                <p className="max-w-2xl text-sm leading-7 text-stone-700 sm:text-base">
                  Temperatura, tempo e farina bastano per leggere una stima rapida e onesta. Il
                  risultato resta un riferimento empirico: utile in cucina, non assoluto.
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {HERO_FACTS.map((fact) => (
                <article
                  key={fact.label}
                  className="rounded-[1.6rem] border border-white/70 bg-stone-950/[0.04] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]"
                >
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-stone-500">
                    {fact.label}
                  </p>
                  <p className="mt-2 text-sm font-medium leading-6 text-stone-900">{fact.value}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <InteractiveCalculator />
          <ModelTransparencyPanel />
        </section>
      </div>
    </main>
  );
}
