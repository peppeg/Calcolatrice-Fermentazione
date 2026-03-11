import type { CalculatorInput, FlourUnit, NormalizedCalculatorInput } from '@/lib/calc/types';
import { createInactiveModifierState } from '@/lib/calc/modifiers';

export function normalizeFlourToGrams(flourValue: number, flourUnit: FlourUnit): number {
  return flourUnit === 'kg' ? flourValue * 1000 : flourValue;
}

export function normalizeCalculatorInput(input: CalculatorInput): NormalizedCalculatorInput {
  return {
    temperatureC: input.temperatureC,
    timeHours: input.timeHours,
    flourValue: input.flourValue,
    flourUnit: input.flourUnit,
    flourGrams: normalizeFlourToGrams(input.flourValue, input.flourUnit),
    modifiers: input.modifiers ?? createInactiveModifierState(),
  };
}
