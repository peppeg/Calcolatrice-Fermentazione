import type { ReactNode } from 'react';

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
      gramsPerKg: number;
      warning: string | null;
    };

function formatGrams(value: number): string {
  return new Intl.NumberFormat('it-IT', {
    maximumFractionDigits: value < 1 ? 3 : 2,
    minimumFractionDigits: 0,
  }).format(value);
}

function PanelTone({ children }: { children: ReactNode }) {
  return <div className="rounded-[1.75rem] border border-stone-200/80 bg-white/95 p-5 shadow-[0_16px_40px_-28px_rgba(41,37,36,0.55)]">{children}</div>;
}

export function CalculatorResultPanel({ state }: { state: CalculatorResultState }) {
  return (
    <section
      aria-live="polite"
      aria-labelledby="calculator-result-title"
      className="space-y-4 rounded-[2rem] border border-stone-200/70 bg-stone-50/90 p-4"
    >
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">Stima live</p>
        <h2 id="calculator-result-title" className="text-2xl font-semibold tracking-tight text-stone-900">
          {state.title}
        </h2>
        <p className="text-sm leading-6 text-stone-600">{state.summary}</p>
      </div>

      {state.variant === 'guidance' ? (
        <PanelTone>
          <ul className="grid gap-2 text-sm text-stone-700 sm:grid-cols-2">
            {state.items.map((item) => (
              <li key={item} className="rounded-2xl border border-stone-200 bg-stone-50 px-3 py-2">
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
              <li key={issue} className="rounded-2xl border border-amber-200 bg-amber-50 px-3 py-2 text-amber-900">
                {issue}
              </li>
            ))}
          </ul>
        </PanelTone>
      ) : null}

      {state.variant === 'success' ? (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <PanelTone>
              <p className="text-sm text-stone-500">Lievito fresco per la ricetta</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-stone-950" data-testid="grams-for-recipe-value">
                {formatGrams(state.gramsForRecipe)} g
              </p>
            </PanelTone>
            <PanelTone>
              <p className="text-sm text-stone-500">Valore per 1 kg di farina</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-stone-950" data-testid="grams-per-kg-value">
                {formatGrams(state.gramsPerKg)} g
              </p>
            </PanelTone>
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