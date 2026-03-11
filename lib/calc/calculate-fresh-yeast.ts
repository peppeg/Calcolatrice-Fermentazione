import { summarizeAppliedModifiers } from '@/lib/calc/modifiers';
import { calculateBaseYeastPerKg, scaleYeastToFlour } from '@/lib/calc/model';
import { normalizeCalculatorInput } from '@/lib/calc/normalize';
import { roundPracticalYeast } from '@/lib/calc/rounding';
import type { CalculationResult, CalculatorInput } from '@/lib/calc/types';
import { buildEmpiricalRangeWarnings, validateCalculatorInput } from '@/lib/calc/validation';

export function calculateFreshYeast(input: CalculatorInput): CalculationResult {
  const normalizedInput = normalizeCalculatorInput(input);
  const appliedModifiers = summarizeAppliedModifiers(normalizedInput.modifiers);
  const errors = validateCalculatorInput(normalizedInput);

  if (errors.length > 0) {
    return {
      status: 'invalid',
      normalizedInput,
      gramsPerKg: null,
      gramsForRecipe: null,
      warnings: [],
      errors,
      appliedModifiers,
    };
  }

  const rawGramsPerKg = calculateBaseYeastPerKg({
    temperatureC: normalizedInput.temperatureC,
    timeHours: normalizedInput.timeHours,
  });
  const rawGramsForRecipe = scaleYeastToFlour({
    gramsPerKg: rawGramsPerKg,
    flourGrams: normalizedInput.flourGrams,
  });

  return {
    status: 'ok',
    normalizedInput,
    gramsPerKg: roundPracticalYeast(rawGramsPerKg),
    gramsForRecipe: roundPracticalYeast(rawGramsForRecipe),
    warnings: buildEmpiricalRangeWarnings(normalizedInput),
    errors: [],
    appliedModifiers,
  };
}
