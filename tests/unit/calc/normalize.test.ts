import { describe, expect, it } from 'vitest';
import { createInactiveModifierState, normalizeCalculatorInput, normalizeFlourToGrams } from '@/lib/calc';

describe('normalizeFlourToGrams', () => {
  it('keeps gram input unchanged', () => {
    expect(normalizeFlourToGrams(1000, 'g')).toBe(1000);
  });

  it('converts kilograms to grams', () => {
    expect(normalizeFlourToGrams(1, 'kg')).toBe(1000);
    expect(normalizeFlourToGrams(0.75, 'kg')).toBe(750);
  });
});

describe('normalizeCalculatorInput', () => {
  it('produces canonical flour grams and default modifiers', () => {
    expect(
      normalizeCalculatorInput({
        temperatureC: 20,
        timeHours: 12,
        flourValue: 1,
        flourUnit: 'kg',
      }),
    ).toEqual({
      temperatureC: 20,
      timeHours: 12,
      flourValue: 1,
      flourUnit: 'kg',
      flourGrams: 1000,
      modifiers: createInactiveModifierState(),
    });
  });
});
