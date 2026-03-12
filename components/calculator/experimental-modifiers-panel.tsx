'use client';

import type { ExperimentalModifierKey, ExperimentalModifierState, ExperimentalModifierValue } from '@/lib/calc/types';
import { getExperimentalModifierDefinitions } from '@/lib/calc/modifiers';

const MODIFIER_DEFINITIONS = getExperimentalModifierDefinitions();

function getInputValue(value: ExperimentalModifierValue | undefined): string {
  if (value === undefined || value === null || value === false) {
    return '';
  }

  return String(value);
}

export function ExperimentalModifiersPanel({
  isOpen,
  modifiers,
  onToggle,
  onValueChange,
}: {
  isOpen: boolean;
  modifiers: ExperimentalModifierState;
  onToggle: () => void;
  onValueChange: (key: ExperimentalModifierKey, value: ExperimentalModifierValue) => void;
}) {
  return (
    <section className="rounded-[1.8rem] border border-stone-200/80 bg-stone-950/[0.03] p-4">
      <button
        aria-controls="experimental-modifiers-panel"
        aria-expanded={isOpen}
        className="flex w-full items-start justify-between gap-4 rounded-[1.2rem] text-left"
        type="button"
        onClick={onToggle}
      >
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">
            Sezione avanzata
          </p>
          <div>
            <p className="text-base font-medium text-stone-950">Correttivi sperimentali</p>
            <p className="mt-1 text-sm leading-6 text-stone-600">
              Puoi esplorare i fattori futuri gia previsti dal prodotto, ma nella v1 non cambiano la
              stima attiva.
            </p>
          </div>
        </div>
        <span className="rounded-full border border-stone-200 bg-white px-3 py-1 text-xs font-medium text-stone-600">
          {isOpen ? 'Chiudi' : 'Apri'}
        </span>
      </button>

      {isOpen ? (
        <div id="experimental-modifiers-panel" className="mt-4 space-y-4">
          <div className="rounded-[1.4rem] border border-amber-200/80 bg-amber-50/80 px-4 py-3 text-sm leading-6 text-amber-950">
            Placeholder sperimentali: puoi compilarli, ma il risultato sopra continua a usare solo
            temperatura, tempo e farina.
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {MODIFIER_DEFINITIONS.map((definition) => {
              const value = modifiers.values[definition.key];

              if (definition.control === 'toggle') {
                return (
                  <label
                    key={definition.key}
                    className="flex min-h-[8.5rem] flex-col justify-between rounded-[1.4rem] border border-stone-200/80 bg-white/90 px-4 py-4"
                  >
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-stone-900">{definition.label}</p>
                      <p className="text-sm leading-6 text-stone-600">{definition.description}</p>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-3 text-sm text-stone-700">
                      <input
                        aria-label={definition.label}
                        checked={value === true}
                        className="h-4 w-4 rounded border-stone-300 text-amber-700 focus:ring-amber-500"
                        type="checkbox"
                        onChange={(event) => onValueChange(definition.key, event.target.checked)}
                      />
                      Attiva placeholder
                    </span>
                  </label>
                );
              }

              if (definition.control === 'select') {
                return (
                  <label
                    key={definition.key}
                    className="flex min-h-[8.5rem] flex-col rounded-[1.4rem] border border-stone-200/80 bg-white/90 px-4 py-4"
                  >
                    <span className="text-sm font-medium text-stone-900">{definition.label}</span>
                    <span className="mt-2 text-sm leading-6 text-stone-600">{definition.description}</span>
                    <select
                      aria-label={definition.label}
                      className="mt-4 w-full rounded-[1rem] border border-stone-200 bg-stone-50/85 px-3 py-2 text-sm text-stone-950 outline-none transition duration-200 focus:border-amber-500 focus:bg-white"
                      value={getInputValue(value)}
                      onChange={(event) => onValueChange(definition.key, event.target.value || null)}
                    >
                      {definition.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>
                );
              }

              return (
                <label
                  key={definition.key}
                  className="flex min-h-[8.5rem] flex-col rounded-[1.4rem] border border-stone-200/80 bg-white/90 px-4 py-4"
                >
                  <span className="text-sm font-medium text-stone-900">{definition.label}</span>
                  <span className="mt-2 text-sm leading-6 text-stone-600">{definition.description}</span>
                  <div className="mt-4 flex items-center gap-2">
                    <input
                      aria-label={definition.label}
                      className="w-full rounded-[1rem] border border-stone-200 bg-stone-50/85 px-3 py-2 text-sm text-stone-950 outline-none transition duration-200 focus:border-amber-500 focus:bg-white"
                      inputMode="decimal"
                      placeholder={definition.placeholder}
                      type="number"
                      value={getInputValue(value)}
                      onChange={(event) => onValueChange(definition.key, event.target.value || null)}
                    />
                    {definition.suffix ? (
                      <span className="text-sm font-medium text-stone-500">{definition.suffix}</span>
                    ) : null}
                  </div>
                </label>
              );
            })}
          </div>
        </div>
      ) : null}
    </section>
  );
}