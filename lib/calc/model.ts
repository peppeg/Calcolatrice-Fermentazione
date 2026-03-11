import {
  FORMULA_BASE_COEFFICIENT,
  FORMULA_REFERENCE_TEMPERATURE_C,
  FORMULA_TEMPERATURE_STEP_C,
  FORMULA_TIME_EXPONENT,
} from '@/lib/calc/constants';

export function calculateBaseYeastPerKg(params: {
  temperatureC: number;
  timeHours: number;
}): number {
  const { temperatureC, timeHours } = params;

  return (
    FORMULA_BASE_COEFFICIENT *
    Math.pow(timeHours, FORMULA_TIME_EXPONENT) *
    Math.pow(2, -((temperatureC - FORMULA_REFERENCE_TEMPERATURE_C) / FORMULA_TEMPERATURE_STEP_C))
  );
}

export function scaleYeastToFlour(params: {
  gramsPerKg: number;
  flourGrams: number;
}): number {
  const { gramsPerKg, flourGrams } = params;

  return gramsPerKg * (flourGrams / 1000);
}
