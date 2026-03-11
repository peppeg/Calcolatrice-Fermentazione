import { describe, expect, it } from 'vitest';
import { calculateBaseYeastPerKg, scaleYeastToFlour } from '@/lib/calc';
import {
  CORE_MODEL_CALIBRATION_FIXTURES,
  MODEL_CALIBRATION_FIXTURES,
  type ModelCalibrationFixture,
} from '@/tests/unit/calc/fixtures/model-calibration-fixtures';

type CalibrationFailure = {
  fixture: ModelCalibrationFixture;
  actualGramsPerKg: number;
  relativeErrorRatio: number;
};

function scoreFixtures(
  model: (params: { temperatureC: number; timeHours: number }) => number,
  fixtures: readonly ModelCalibrationFixture[],
): CalibrationFailure[] {
  return fixtures
    .map((fixture) => {
      const actualGramsPerKg = model({
        temperatureC: fixture.temperatureC,
        timeHours: fixture.timeHours,
      });
      const relativeErrorRatio = Math.abs(actualGramsPerKg - fixture.expectedGramsPerKg) / fixture.expectedGramsPerKg;

      return {
        fixture,
        actualGramsPerKg,
        relativeErrorRatio,
      };
    })
    .filter(({ fixture, relativeErrorRatio }) => relativeErrorRatio > fixture.toleranceRatio)
    .sort((left, right) => right.relativeErrorRatio - left.relativeErrorRatio);
}

function formatFailures(failures: readonly CalibrationFailure[]) {
  return failures
    .map(({ fixture, actualGramsPerKg, relativeErrorRatio }) =>
      [
        fixture.id,
        `expected ${fixture.expectedGramsPerKg.toFixed(3)} g/kg`,
        `received ${actualGramsPerKg.toFixed(3)} g/kg`,
        `error ${(relativeErrorRatio * 100).toFixed(1)}%`,
        `tolerance ${(fixture.toleranceRatio * 100).toFixed(1)}%`,
      ].join(' | '),
    )
    .join('\n');
}

function calculateBestSingleFamilyCandidate(params: {
  temperatureC: number;
  timeHours: number;
}) {
  const { temperatureC, timeHours } = params;
  const temperatureFactor = Math.pow(2, -((temperatureC - 20) / 10));

  return 19.95 * Math.pow(timeHours, -0.975) * temperatureFactor;
}

describe('calculateBaseYeastPerKg', () => {
  it('defines a repo-owned calibration corpus with explicit tolerances', () => {
    expect(MODEL_CALIBRATION_FIXTURES).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 'core-20c-4h',
          confidenceWeight: 'high',
          gate: 'core',
          toleranceRatio: 0.1,
        }),
        expect.objectContaining({
          id: 'comparison-16c-2h',
          gate: 'comparison',
        }),
      ]),
    );
  });

  it('shows the best single-family retune still misses the short-time gate', () => {
    const failures = scoreFixtures(calculateBestSingleFamilyCandidate, CORE_MODEL_CALIBRATION_FIXTURES);

    expect(failures.length).toBeGreaterThan(0);
    expect(failures[0]?.fixture.id).toBe('core-20c-4h');
    expect(formatFailures(failures)).toContain('core-20c-6h');
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

  it('keeps the active runtime curve monotonic across the core calibration sweep', () => {
    const fixturesAt20C = CORE_MODEL_CALIBRATION_FIXTURES.filter((fixture) => fixture.temperatureC === 20);

    for (let index = 1; index < fixturesAt20C.length; index += 1) {
      const previousFixture = fixturesAt20C[index - 1];
      const currentFixture = fixturesAt20C[index];

      if (!previousFixture || !currentFixture) {
        continue;
      }

      const previousValue = calculateBaseYeastPerKg(previousFixture);
      const currentValue = calculateBaseYeastPerKg(currentFixture);

      expect(currentValue).toBeLessThan(previousValue);
    }
  });
});

describe('scaleYeastToFlour', () => {
  it('scales linearly with flour grams', () => {
    expect(scaleYeastToFlour({ gramsPerKg: 2, flourGrams: 1000 })).toBe(2);
    expect(scaleYeastToFlour({ gramsPerKg: 2, flourGrams: 500 })).toBe(1);
    expect(scaleYeastToFlour({ gramsPerKg: 2, flourGrams: 1500 })).toBe(3);
  });
});