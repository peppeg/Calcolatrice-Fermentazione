import { describe, expect, it } from 'vitest';
import {
  buildEmpiricalRangeWarnings,
  normalizeCalculatorInput,
  validateCalculatorInput,
} from '@/lib/calc';

describe('validateCalculatorInput', () => {
  it('returns a not-finite issue for invalid numbers', () => {
    const issues = validateCalculatorInput(
      normalizeCalculatorInput({
        temperatureC: Number.NaN,
        timeHours: 12,
        flourValue: 1000,
        flourUnit: 'g',
      }),
    );

    expect(issues).toEqual([
      {
        field: 'temperatureC',
        code: 'not-finite',
        message: 'La temperatura deve essere un numero valido.',
      },
    ]);
  });

  it('returns field-specific greater-than-zero issues', () => {
    const issues = validateCalculatorInput(
      normalizeCalculatorInput({
        temperatureC: 20,
        timeHours: 0,
        flourValue: -1,
        flourUnit: 'kg',
      }),
    );

    expect(issues).toEqual([
      {
        field: 'timeHours',
        code: 'must-be-greater-than-zero',
        message: 'Il tempo deve essere maggiore di zero.',
      },
      {
        field: 'flourValue',
        code: 'must-be-greater-than-zero',
        message: 'La quantita di farina deve essere maggiore di zero.',
      },
    ]);
  });
});

describe('buildEmpiricalRangeWarnings', () => {
  it('does not warn on inclusive empirical boundaries', () => {
    expect(
      buildEmpiricalRangeWarnings(
        normalizeCalculatorInput({
          temperatureC: 16,
          timeHours: 24,
          flourValue: 1000,
          flourUnit: 'g',
        }),
      ),
    ).toEqual([]);
  });

  it('warns when temperature is outside the empirical range', () => {
    const warnings = buildEmpiricalRangeWarnings(
      normalizeCalculatorInput({
        temperatureC: 15.9,
        timeHours: 12,
        flourValue: 1000,
        flourUnit: 'g',
      }),
    );

    expect(warnings).toHaveLength(1);
    expect(warnings[0]?.code).toBe('outside-empirical-range');
    expect(warnings[0]?.reason).toBe('temperature');
  });

  it('warns when time is outside the empirical range', () => {
    const warnings = buildEmpiricalRangeWarnings(
      normalizeCalculatorInput({
        temperatureC: 20,
        timeHours: 24.1,
        flourValue: 1000,
        flourUnit: 'g',
      }),
    );

    expect(warnings[0]?.reason).toBe('time');
  });

  it('uses a combined reason when both temperature and time are outside range', () => {
    const warnings = buildEmpiricalRangeWarnings(
      normalizeCalculatorInput({
        temperatureC: 40,
        timeHours: 1,
        flourValue: 1000,
        flourUnit: 'g',
      }),
    );

    expect(warnings[0]?.reason).toBe('temperature-and-time');
    expect(warnings[0]?.message).toContain('temperatura e tempo fuori intervallo');
  });
});
