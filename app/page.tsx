import { InteractiveCalculator } from '@/components/calculator/interactive-calculator';

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.18),_transparent_32%),linear-gradient(180deg,_#f5f1ea_0%,_#f2ede5_45%,_#ece6dd_100%)] px-4 py-8 text-stone-950 sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-6xl space-y-6">
        <section className="rounded-[2.5rem] border border-white/60 bg-white/70 p-6 shadow-[0_30px_80px_-44px_rgba(41,37,36,0.5)] backdrop-blur sm:p-8">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-stone-500">Calcolatrice della lievitazione</p>
            <h1 className="text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl">
              Una stima pratica del lievito fresco, leggibile appena inserisci i dati.
            </h1>
            <p className="max-w-2xl text-sm leading-7 text-stone-650 sm:text-base">
              Questo primo modulo resta focalizzato su poche variabili essenziali: temperatura,
              tempo e farina. Il risultato e una stima empirica pensata per l&apos;uso pratico,
              non una promessa di precisione assoluta.
            </p>
          </div>
        </section>

        <InteractiveCalculator />
      </div>
    </main>
  );
}