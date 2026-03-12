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
    value: '16-36 \u00B0C \u00B7 4-24 h',
  },
  {
    label: 'Lettura pratica',
    value: 'Fresco + secco istantaneo',
  },
] as const;

export default function Home() {
  return (
    <main
      className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(204,191,172,0.18),_transparent_28%),linear-gradient(180deg,_#f5efe7_0%,_#efe8de_45%,_#e7dfd3_100%)] px-4 py-6 text-stone-950 sm:px-6 lg:px-8 lg:py-10"
      style={{ fontFamily: BODY_FONT }}
    >
      <div className="mx-auto max-w-6xl space-y-6">
        <section className="relative overflow-hidden rounded-[2.75rem] border border-white/65 bg-[linear-gradient(135deg,rgba(255,255,255,0.9),rgba(250,246,240,0.82)_58%,rgba(244,236,224,0.74)_100%)] p-6 shadow-[0_36px_90px_-48px_rgba(41,37,36,0.55)] backdrop-blur sm:p-8 lg:p-10">
          <div className="absolute right-0 top-0 h-full w-[22rem] bg-[radial-gradient(circle_at_top_right,_rgba(214,184,129,0.16),_transparent_68%)]" />
          <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(18rem,0.7fr)] lg:items-end">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-stone-500">
                Calcolatrice della lievitazione {'\u00B7'} v1
              </p>
              <div className="space-y-3">
                <h1
                  className="max-w-3xl text-4xl leading-none tracking-[-0.03em] text-stone-950 sm:text-5xl lg:text-[3.8rem]"
                  style={{ fontFamily: DISPLAY_FONT }}
                >
                  Quanto lievito ti serve, senza fare i conti a mente.
                </h1>
                <p className="max-w-2xl text-sm leading-7 text-stone-700 sm:text-base">
                  Dici la temperatura, il tempo e quanta farina usi, e ti diciamo quanto lievito
                  mettere. Niente tabelle, niente alchimia. Solo un numero onesto da cui partire.
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {HERO_FACTS.map((fact) => (
                <article
                  key={fact.label}
                  className="rounded-[1.6rem] border border-white/75 bg-white/64 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] backdrop-blur"
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
