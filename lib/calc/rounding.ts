import {
  PRACTICAL_ROUNDING_DECIMALS_AT_OR_ABOVE_THRESHOLD,
  PRACTICAL_ROUNDING_DECIMALS_BELOW_THRESHOLD,
  PRACTICAL_ROUNDING_THRESHOLD_GRAMS,
} from '@/lib/calc/constants';

function roundTo(value: number, decimals: number): number {
  const factor = 10 ** decimals;
  const rounded = Math.round((value + Number.EPSILON) * factor) / factor;

  return Object.is(rounded, -0) ? 0 : rounded;
}

export function roundPracticalYeast(value: number): number {
  if (value >= PRACTICAL_ROUNDING_THRESHOLD_GRAMS) {
    return roundTo(value, PRACTICAL_ROUNDING_DECIMALS_AT_OR_ABOVE_THRESHOLD);
  }

  return roundTo(value, PRACTICAL_ROUNDING_DECIMALS_BELOW_THRESHOLD);
}
