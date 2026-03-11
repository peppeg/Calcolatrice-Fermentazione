'use client';

import { useState } from 'react';
import {
  CalculatorResultPanel,
  type CalculatorResultState,
} from '@/components/calculator/calculator-result-panel';
import { calculateFreshYeast } from '@/lib/calc/calculate-fresh-yeast';
import {
  createInitialCalculatorDraft,
  formatCalculatorFieldList,
  getCalculatorFieldLabel,
  parseCalculatorDraft,
  type CalculatorDraft,
} from '@/lib/calc/calculator-draft';
import { roundPracticalYeast } from '@/lib/calc/rounding';
import type { CalculationResult, NormalizedCalculatorInput, ValidationField } from '@/lib/calc/types';
import { convertFreshToDryYeastGrams } from '@/lib/calc/yeast-conversions';

const PRESETS = [
  {
    id: 'calmo',
    label: 'Calma da cucina',
    description: '20 \u00B0C \u00B7 12 h',
    temperatureC: '20',
    timeHours: '12',
  },
  {
    id: 'rapido',
    label: 'Impasto piu rapido',
    description: '26 \u00B0C \u00B7 6 h',
    temperatureC: '26',
    timeHours: '6',
  },
  {
    id: 'lento',
    label: 'Lungo e fresco',
    description: '18 \u00B0C \u00B7 18 h',
    temperatureC: '18',
    timeHours: '18',
  },
] as const;

const BODY_FONT = '"Avenir Next", "Segoe UI", "Helvetica Neue", sans-serif';

type TouchedFields = Partial<Record<ValidationField, boolean>>;
type FieldErrors = Partial<Record<ValidationField, string>>;

function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat('it-IT', {
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
    minimumFractionDigits: 0,
  }).format(value);
}

function formatFlourSummary(input: NormalizedCalculatorInput): string {
  const value = formatCompactNumber(input.flourValue);
  const unitLabel = input.flourUnit === 'kg' ? 'kg' : 'g';

  return `${value} ${unitLabel}`;
}

function buildGuidanceSummary(missingFields: ValidationField[]) {
  return `Per vedere la stima, completa ${formatCalculatorFieldList(missingFields)}.`;
}

function buildInvalidSummary(fields: ValidationField[]) {
  return `Correggi ${formatCalculatorFieldList(fields)} per vedere la stima.`;
}

function buildFieldErrors({
  touchedFields,
  missingFields,
  parseIssues,
  calculationResult,
}: {
  touchedFields: TouchedFields;
  missingFields: ValidationField[];
  parseIssues: Array<{ field: ValidationField; message: string }>;
  calculationResult: CalculationResult | null;
}): FieldErrors {
  const fieldErrors: FieldErrors = {};

  for (const issue of parseIssues) {
    fieldErrors[issue.field] = issue.message;
  }

  if (calculationResult?.status === 'invalid') {
    for (const issue of calculationResult.errors) {
      fieldErrors[issue.field] = issue.message;
    }
  }

  for (const field of missingFields) {
    if (!touchedFields[field] || fieldErrors[field]) {
      continue;
    }

    fieldErrors[field] = `Completa ${getCalculatorFieldLabel(field)}.`;
  }

  return fieldErrors;
}

function buildResultState({
  missingFields,
  parseIssues,
  calculationResult,
}: {
  missingFields: ValidationField[];
  parseIssues: Array<{ field: ValidationField; message: string }>;
  calculationResult: CalculationResult | null;
}): CalculatorResultState {
  if (missingFields.length > 0) {
    return {
      variant: 'guidance',
      title: 'Stima in attesa',
      summary: buildGuidanceSummary(missingFields),
      items: missingFields.map((field) => getCalculatorFieldLabel(field)),
    };
  }

  if (parseIssues.length > 0) {
    return {
      variant: 'invalid',
      title: 'Input da correggere',
      summary: buildInvalidSummary(parseIssues.map((issue) => issue.field)),
      issues: parseIssues.map((issue) => issue.message),
    };
  }

  if (calculationResult?.status === 'invalid') {
    return {
      variant: 'invalid',
      title: 'Input da correggere',
      summary: buildInvalidSummary(calculationResult.errors.map((issue) => issue.field)),
      issues: calculationResult.errors.map((issue) => issue.message),
    };
  }

  if (calculationResult?.status === 'ok') {
    const { normalizedInput } = calculationResult;

    return {
      variant: 'success',
      title: 'Stima attuale',
      summary: 'Lettura live del modello ambiente v1 sullo scenario che stai compilando.',
      gramsForRecipe: calculationResult.gramsForRecipe,
      dryYeastForRecipe: roundPracticalYeast(
        convertFreshToDryYeastGrams(calculationResult.gramsForRecipe),
      ),
      scenarioItems: [
        {
          label: 'Temperatura',
          value: `${formatCompactNumber(normalizedInput.temperatureC)} \u00B0C`,
        },
        {
          label: 'Tempo',
          value: `${formatCompactNumber(normalizedInput.timeHours)} h`,
        },
        {
          label: 'Farina',
          value: formatFlourSummary(normalizedInput),
        },
      ],
      estimatorName: 'Modello empirico ambiente v1',
      estimatorNote:
        'Usa temperatura e tempo per stimare il lievito; la farina scala solo il risultato finale.',
      modifierStatus:
        calculationResult.appliedModifiers.length > 0
          ? calculationResult.appliedModifiers.join(', ')
          : 'Correttivi sperimentali inattivi nella v1.',
      warning: calculationResult.warnings[0]?.message ?? null,
    };
  }

  return {
    variant: 'guidance',
    title: 'Stima in attesa',
    summary: buildGuidanceSummary(['temperatureC', 'timeHours', 'flourValue']),
    items: ['temperatura ambiente', 'tempo di lievitazione', 'quantita di farina'],
  };
}

export function InteractiveCalculator() {
  const [draft, setDraft] = useState<CalculatorDraft>(() => createInitialCalculatorDraft());
  const [touchedFields, setTouchedFields] = useState<TouchedFields>({});
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(null);

  const parsedDraft = parseCalculatorDraft(draft);
  const calculationResult = parsedDraft.calculatorInput
    ? calculateFreshYeast(parsedDraft.calculatorInput)
    : null;
  const resultState = buildResultState({
    missingFields: parsedDraft.missingFields,
    parseIssues: parsedDraft.parseIssues,
    calculationResult,
  });
  const fieldErrors = buildFieldErrors({
    touchedFields,
    missingFields: parsedDraft.missingFields,
    parseIssues: parsedDraft.parseIssues,
    calculationResult,
  });

  function updateDraftField(field: ValidationField, value: string) {
    setDraft((currentDraft) => ({
      ...currentDraft,
      [field]: value,
    }));
    setTouchedFields((currentTouched) => ({
      ...currentTouched,
      [field]: true,
    }));

    if (field === 'temperatureC' || field === 'timeHours') {
      setSelectedPresetId(null);
    }
  }

  function markFieldTouched(field: ValidationField) {
    setTouchedFields((currentTouched) => ({
      ...currentTouched,
      [field]: true,
    }));
  }

  function applyPreset(preset: (typeof PRESETS)[number]) {
    setDraft((currentDraft) => ({
      ...currentDraft,
      temperatureC: preset.temperatureC,
      timeHours: preset.timeHours,
    }));
    setTouchedFields((currentTouched) => ({
      ...currentTouched,
      temperatureC: true,
      timeHours: true,
    }));
    setSelectedPresetId(preset.id);
  }

  function resetCalculator() {
    setDraft(createInitialCalculatorDraft());
    setTouchedFields({});
    setSelectedPresetId(null);
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1.08fr)_minmax(21.5rem,0.92fr)] lg:items-start">
      <section className="space-y-5 rounded-[2.3rem] border border-white/65 bg-white/86 p-5 shadow-[0_26px_80px_-44px_rgba(41,37,36,0.5)] backdrop-blur sm:p-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
            Input essenziali
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-stone-950">
            Compila lo scenario, leggi subito la stima
          </h2>
          <p className="max-w-2xl text-sm leading-6 text-stone-600">
            Nessun submit e nessun pannello superfluo: il risultato reagisce subito a temperatura,
            tempo e farina.
          </p>
        </div>

        <div className="rounded-[1.8rem] border border-stone-200/80 bg-stone-950/[0.03] p-4">
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((preset) => {
              const selected = selectedPresetId === preset.id;

              return (
                <button
                  key={preset.id}
                  type="button"
                  className={selected
                    ? 'rounded-full border border-amber-300 bg-amber-100 px-4 py-2 text-sm font-medium text-stone-950 transition duration-200'
                    : 'rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition duration-200 hover:border-stone-300 hover:bg-stone-100'}
                  onClick={() => applyPreset(preset)}
                >
                  {preset.label}
                  <span className={selected ? 'ml-2 text-xs text-stone-600' : 'ml-2 text-xs text-stone-500'}>
                    {preset.description}
                  </span>
                </button>
              );
            })}
          </div>
          <button
            type="button"
            className="mt-3 text-sm font-medium text-stone-600 underline underline-offset-4 transition duration-200 hover:text-stone-900"
            onClick={resetCalculator}
          >
            Reset completo
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2" style={{ fontFamily: BODY_FONT }}>
          <label className="space-y-2">
            <span className="text-sm font-medium text-stone-700">Temperatura ambiente ({'\u00B0'}C)</span>
            <input
              aria-describedby={fieldErrors.temperatureC ? 'temperature-error' : undefined}
              aria-invalid={Boolean(fieldErrors.temperatureC)}
              className="w-full rounded-[1.3rem] border border-stone-200 bg-stone-50/85 px-4 py-3 text-base text-stone-950 outline-none transition duration-200 focus:border-amber-500 focus:bg-white"
              inputMode="decimal"
              name="temperatureC"
              placeholder="Es. 24"
              type="text"
              value={draft.temperatureC}
              onBlur={() => markFieldTouched('temperatureC')}
              onChange={(event) => updateDraftField('temperatureC', event.target.value)}
            />
            {fieldErrors.temperatureC ? (
              <p id="temperature-error" className="text-sm text-amber-900">
                {fieldErrors.temperatureC}
              </p>
            ) : null}
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-stone-700">Tempo di lievitazione (ore)</span>
            <input
              aria-describedby={fieldErrors.timeHours ? 'time-error' : undefined}
              aria-invalid={Boolean(fieldErrors.timeHours)}
              className="w-full rounded-[1.3rem] border border-stone-200 bg-stone-50/85 px-4 py-3 text-base text-stone-950 outline-none transition duration-200 focus:border-amber-500 focus:bg-white"
              inputMode="decimal"
              name="timeHours"
              placeholder="Es. 8"
              type="text"
              value={draft.timeHours}
              onBlur={() => markFieldTouched('timeHours')}
              onChange={(event) => updateDraftField('timeHours', event.target.value)}
            />
            {fieldErrors.timeHours ? (
              <p id="time-error" className="text-sm text-amber-900">
                {fieldErrors.timeHours}
              </p>
            ) : null}
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-stone-700">Quantita di farina</span>
            <input
              aria-describedby={fieldErrors.flourValue ? 'flour-error' : undefined}
              aria-invalid={Boolean(fieldErrors.flourValue)}
              className="w-full rounded-[1.3rem] border border-stone-200 bg-stone-50/85 px-4 py-3 text-base text-stone-950 outline-none transition duration-200 focus:border-amber-500 focus:bg-white"
              inputMode="decimal"
              name="flourValue"
              placeholder="Es. 500"
              type="text"
              value={draft.flourValue}
              onBlur={() => markFieldTouched('flourValue')}
              onChange={(event) => updateDraftField('flourValue', event.target.value)}
            />
            {fieldErrors.flourValue ? (
              <p id="flour-error" className="text-sm text-amber-900">
                {fieldErrors.flourValue}
              </p>
            ) : null}
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-stone-700">Unita farina</span>
            <select
              className="w-full rounded-[1.3rem] border border-stone-200 bg-stone-50/85 px-4 py-3 text-base text-stone-950 outline-none transition duration-200 focus:border-amber-500 focus:bg-white"
              name="flourUnit"
              value={draft.flourUnit}
              onChange={(event) =>
                setDraft((currentDraft) => ({
                  ...currentDraft,
                  flourUnit: event.target.value as CalculatorDraft['flourUnit'],
                }))
              }
            >
              <option value="g">Grammi</option>
              <option value="kg">Chilogrammi</option>
            </select>
          </label>
        </div>
      </section>

      <div className="lg:sticky lg:top-6">
        <CalculatorResultPanel state={resultState} />
      </div>
    </div>
  );
}
