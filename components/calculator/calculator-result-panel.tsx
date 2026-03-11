import type { ReactNode } from 'react';

export type ResultContextItem = {
  label: string;
  value: string;
};

export type CalculatorResultState =
  | {
      variant: 'guidance';
      title: string;
      summary: string;
      items: string[];
    }
  | {
      variant: 'invalid';
      title: string;
      summary: string;
      issues: string[];
    }
  | {
      variant: 'success';
      title: string;
      summary: string;
      gramsForRecipe: number;
      dryYeastForRecipe: number;
      scenarioItems: ResultContextItem[];
      estimatorName: string;
      estimatorNote: string;
      modifierStatus: string;
      warning: string | null;
    };

const DISPLAY_FONT = '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif';

function formatGrams(value: number): string {
  return new Intl.NumberFormat('it-IT', {
    maximumFractionDigits: value < 1 ? 3 : 2,
    minimumFractionDigits: 0,
  }).format(value);
}

function PanelTone({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[1.75rem] border border-stone-200/80 bg-white/92 p-5 shadow-[0_18px_44px_-32px_rgba(41,37,36,0.45)] ${className}`}
    >
      {children}
    </div>
  );
}

export function CalculatorResultPanel({ state }: { state: CalculatorResultState }) {
  return (
    <section
      aria-live="polite"
      aria-labelledby="calculator-result-title"
      className="space-y-4 rounded-[2.3rem] border border-white/65 bg-stone-50/88 p-4 shadow-[0_22px_70px_-42px_rgba(41,37,36,0.45)] backdrop-blur sm:p-5"
    >
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">Stima live</p>
        <h2
          id="calculator-result-title"
          className="text-3xl leading-none tracking-[-0.03em] text-stone-950"
          style={{ fontFamily: DISPLAY_FONT }}
        >
          {state.title}
        </h2>
        <p className="text-sm leading-6 text-stone-600">{state.summary}</p>
      </div>

      {state.variant === 'guidance' ? (
        <PanelTone>
          <ul className="grid gap-2 text-sm text-stone-700 sm:grid-cols-2">
            {state.items.map((item) => (
              <li key={item} className="rounded-[1.25rem] border border-stone-200 bg-stone-50 px-3 py-2">
                {item}
              </li>
            ))}
          </ul>
        </PanelTone>
      ) : null}

      {state.variant === 'invalid' ? (
        <PanelTone>
          <ul className="space-y-2 text-sm leading-6 text-stone-700">
            {state.issues.map((issue) => (
              <li
                key={issue}
                className="rounded-[1.25rem] border border-amber-200 bg-amber-50 px-3 py-2 text-amber-900"
              >
                {issue}
              </li>
            ))}
          </ul>
        </PanelTone>
      ) : null}

      {state.variant === 'success' ? (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <PanelTone className="bg-white">
              <p className="text-sm text-stone-500">Lievito fresco per la ricetta</p>
              <p
                className="mt-2 text-3xl font-semibold tracking-tight text-stone-950"
                data-testid="grams-for-recipe-value"
              >
                {formatGrams(state.gramsForRecipe)} g
              </p>
            </PanelTone>
            <PanelTone className="bg-white">
              <p className="text-sm text-stone-500">Lievito secco istantaneo equivalente</p>
              <p
                className="mt-2 text-3xl font-semibold tracking-tight text-stone-950"
                data-testid="dry-yeast-for-recipe-value"
              >
                {formatGrams(state.dryYeastForRecipe)} g
              </p>
              <p className="mt-2 text-xs leading-5 text-stone-500">
                Rapporto pratico 3:1 rispetto al lievito fresco. Altri prodotti secchi possono
                variare.
              </p>
            </PanelTone>
          </div>

          <div className="grid gap-3 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
            <PanelTone>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">
                Scenario attivo
              </p>
              <dl className="mt-3 grid gap-3 sm:grid-cols-3">
                {state.scenarioItems.map((item) => (
                  <div key={item.label} className="rounded-[1.3rem] border border-stone-200 bg-stone-50 px-3 py-3">
                    <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-stone-500">
                      {item.label}
                    </dt>
                    <dd className="mt-2 text-sm font-medium text-stone-900">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </PanelTone>

            <div className="grid gap-3">
              <PanelTone>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">
                  Modello attivo
                </p>
                <p className="mt-3 text-sm font-medium text-stone-900">{state.estimatorName}</p>
                <p className="mt-2 text-sm leading-6 text-stone-600">{state.estimatorNote}</p>
              </PanelTone>
              <PanelTone>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">
                  Correttivi sperimentali
                </p>
                <p className="mt-3 text-sm leading-6 text-stone-700">{state.modifierStatus}</p>
              </PanelTone>
            </div>
          </div>

          {state.warning ? (
            <div className="rounded-[1.5rem] border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-950">
              {state.warning}
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
