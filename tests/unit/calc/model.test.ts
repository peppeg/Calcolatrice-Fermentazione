import { describe, expect, it } from 'vitest';
import { calculateBaseYeastPerKg, scaleYeastToFlour } from '@/lib/calc';

describe('calculateBaseYeastPerKg', () => {
  it('matches the empirical formula for a nominal case', () => {
    const expected = 14.5 * Math.pow(12, -0.89) * Math.pow(2, -((20 - 20) / 10));

    expect(
      calculateBaseYeastPerKg({
        temperatureC: 20,
        timeHours: 12,
      }),
    ).toBeCloseTo(expected, 10);
  });

  it('decreases yeast when temperature rises at fixed time', () => {
    const cooler = calculateBaseYeastPerKg({ temperatureC: 20, timeHours: 12 });
    const warmer = calculateBaseYeastPerKg({ temperatureC: 25, timeHours: 12 });

    expect(warmer).toBeLessThan(cooler);
  });

  it('decreases yeast when fermentation time increases at fixed temperature', () => {
    const shorter = calculateBaseYeastPerKg({ temperatureC: 20, timeHours: 8 });
    const longer = calculateBaseYeastPerKg({ temperatureC: 20, timeHours: 16 });

    expect(longer).toBeLessThan(shorter);
  });
});

describe('scaleYeastToFlour', () => {
  it('scales linearly with flour grams', () => {
    expect(scaleYeastToFlour({ gramsPerKg: 2, flourGrams: 1000 })).toBe(2);
    expect(scaleYeastToFlour({ gramsPerKg: 2, flourGrams: 500 })).toBe(1);
    expect(scaleYeastToFlour({ gramsPerKg: 2, flourGrams: 1500 })).toBe(3);
  });
});
