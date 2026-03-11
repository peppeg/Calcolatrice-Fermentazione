import { describe, expect, it } from 'vitest';
import { FRESH_TO_DRY_YEAST_RATIO, convertFreshToDryYeastGrams } from '@/lib/calc';

describe('convertFreshToDryYeastGrams', () => {
  it('applies the practical 3:1 fresh-to-dry conversion ratio', () => {
    expect(FRESH_TO_DRY_YEAST_RATIO).toBe(3);
    expect(convertFreshToDryYeastGrams(6)).toBeCloseTo(2, 10);
    expect(convertFreshToDryYeastGrams(15)).toBeCloseTo(5, 10);
  });
});
