import { describe, expect, it } from 'vitest';
import { calculateFreshYeast } from '@/lib/calc';
import { MODEL_CALIBRATION_FIXTURES } from '@/tests/unit/calc/fixtures/model-calibration-fixtures';

const coreShortFixture = MODEL_CALIBRATION_FIXTURES.find((fixture) => fixture.id === 'core-20c-4h');

if (!coreShortFixture) {
  throw new Error('Missing core-20c-4h calibration fixture.');
}

describe('calculateFreshYeast', () => {
  it('returns a successful result that stays within the defended short-time fixture tolerance', () => {
    const result = calculateFreshYeast({
      temperatureC: coreShortFixture.temperatureC,
      timeHours: coreShortFixture.timeHours,
      flourValue: 1000,
      flourUnit: 'g',
    });

    expect(result.status).toBe('ok');
    if (result.status === 'ok') {
      const relativeErrorRatio =
        Math.abs(result.gramsPerKg - coreShortFixture.expectedGramsPerKg) /
        coreShortFixture.expectedGramsPerKg;

      expect(relativeErrorRatio).toBeLessThanOrEqual(coreShortFixture.toleranceRatio);
      expect(result.gramsForRecipe).toBe(result.gramsPerKg);
    }
  });

  it('short-circuits invalid input with no warnings', () => {
    const result = calculateFreshYeast({
      temperatureC: 20,
      timeHours: Number.NaN,
      flourValue: 1000,
      flourUnit: 'g',
    });

    expect(result.status).toBe('invalid');
    expect(result.gramsPerKg).toBeNull();
    expect(result.gramsForRecipe).toBeNull();
    expect(result.warnings).toEqual([]);
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]?.field).toBe('timeHours');
  });

  it('keeps out-of-range inputs calculable and emits one warning', () => {
    const result = calculateFreshYeast({
      temperatureC: 20,
      timeHours: 3.5,
      flourValue: 1,
      flourUnit: 'kg',
    });

    expect(result.status).toBe('ok');
    expect(result.warnings).toHaveLength(1);
    expect(result.warnings[0]?.reason).toBe('time');
  });

  it('keeps experimental modifiers as a no-op seam', () => {
    const baseResult = calculateFreshYeast({
      temperatureC: 20,
      timeHours: 12,
      flourValue: 1000,
      flourUnit: 'g',
    });
    const modifierResult = calculateFreshYeast({
      temperatureC: 20,
      timeHours: 12,
      flourValue: 1000,
      flourUnit: 'g',
      modifiers: {
        enabled: true,
        values: {
          hydration: 70,
        },
      },
    });

    expect(modifierResult.status).toBe('ok');
    expect(modifierResult.gramsPerKg).toBe(baseResult.status === 'ok' ? baseResult.gramsPerKg : null);
    expect(modifierResult.gramsForRecipe).toBe(baseResult.status === 'ok' ? baseResult.gramsForRecipe : null);
    expect(modifierResult.appliedModifiers).toEqual(['idratazione (non applicato nella MVP)']);
  });

  it('stays monotonic across a small sweep of valid inputs', () => {
    const temperatures = [20, 24, 28] as const;
    const times = [4, 8, 12] as const;

    for (const timeHours of times) {
      const previous = calculateFreshYeast({
        temperatureC: temperatures[0],
        timeHours,
        flourValue: 1000,
        flourUnit: 'g',
      });
      const next = calculateFreshYeast({
        temperatureC: temperatures[1],
        timeHours,
        flourValue: 1000,
        flourUnit: 'g',
      });
      const last = calculateFreshYeast({
        temperatureC: temperatures[2],
        timeHours,
        flourValue: 1000,
        flourUnit: 'g',
      });

      expect(previous.status).toBe('ok');
      expect(next.status).toBe('ok');
      expect(last.status).toBe('ok');
      if (previous.status === 'ok' && next.status === 'ok' && last.status === 'ok') {
        expect(next.gramsPerKg).toBeLessThanOrEqual(previous.gramsPerKg);
        expect(last.gramsPerKg).toBeLessThanOrEqual(next.gramsPerKg);
      }
    }

    for (const temperatureC of temperatures) {
      const shorter = calculateFreshYeast({
        temperatureC,
        timeHours: 4,
        flourValue: 1000,
        flourUnit: 'g',
      });
      const medium = calculateFreshYeast({
        temperatureC,
        timeHours: 8,
        flourValue: 1000,
        flourUnit: 'g',
      });
      const longer = calculateFreshYeast({
        temperatureC,
        timeHours: 12,
        flourValue: 1000,
        flourUnit: 'g',
      });

      expect(shorter.status).toBe('ok');
      expect(medium.status).toBe('ok');
      expect(longer.status).toBe('ok');
      if (shorter.status === 'ok' && medium.status === 'ok' && longer.status === 'ok') {
        expect(medium.gramsPerKg).toBeLessThanOrEqual(shorter.gramsPerKg);
        expect(longer.gramsPerKg).toBeLessThanOrEqual(medium.gramsPerKg);
      }
    }
  });
});
