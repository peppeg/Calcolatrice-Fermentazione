import { describe, expect, it } from 'vitest';
import { roundPracticalYeast } from '@/lib/calc';

describe('roundPracticalYeast', () => {
  it('rounds values greater than or equal to one gram to two decimals', () => {
    expect(roundPracticalYeast(1.234)).toBe(1.23);
    expect(roundPracticalYeast(1)).toBe(1);
  });

  it('rounds values below one gram to three decimals', () => {
    expect(roundPracticalYeast(0.12345)).toBe(0.123);
    expect(roundPracticalYeast(0.9994)).toBe(0.999);
  });
});
