import { describe, expect, it } from 'vitest';
import {
  INITIAL_CALCULATOR_DRAFT,
  createInitialCalculatorDraft,
  formatCalculatorFieldList,
  parseCalculatorDraft,
} from '@/lib/calc/calculator-draft';

describe('calculator draft helpers', () => {
  it('exposes the exact initial draft and returns fresh reset copies', () => {
    expect(INITIAL_CALCULATOR_DRAFT).toEqual({
      temperatureC: '',
      timeHours: '',
      flourValue: '',
      flourUnit: 'g',
    });

    const firstReset = createInitialCalculatorDraft();
    const secondReset = createInitialCalculatorDraft();

    firstReset.temperatureC = '28';

    expect(secondReset).toEqual(INITIAL_CALCULATOR_DRAFT);
    expect(firstReset).not.toEqual(secondReset);
  });

  it('formats field labels for guidance and summary copy', () => {
    expect(formatCalculatorFieldList(['temperatureC'])).toBe('temperatura ambiente');
    expect(formatCalculatorFieldList(['temperatureC', 'timeHours'])).toBe(
      'temperatura ambiente e tempo di lievitazione',
    );
    expect(formatCalculatorFieldList(['temperatureC', 'timeHours', 'flourValue'])).toBe(
      'temperatura ambiente, tempo di lievitazione e quantita di farina',
    );
  });

  it('distinguishes blank input from malformed numbers', () => {
    const parsedDraft = parseCalculatorDraft({
      temperatureC: ' ',
      timeHours: 'dodici',
      flourValue: '1000',
      flourUnit: 'g',
    });

    expect(parsedDraft).toEqual({
      missingFields: ['temperatureC'],
      parseIssues: [
        {
          field: 'timeHours',
          message: 'Il tempo deve essere un numero valido.',
          rawValue: 'dodici',
        },
      ],
      calculatorInput: null,
    });
  });

  it('keeps zero and negative values parseable so the domain layer can validate them', () => {
    const parsedDraft = parseCalculatorDraft({
      temperatureC: '0',
      timeHours: '-4',
      flourValue: '500',
      flourUnit: 'g',
    });

    expect(parsedDraft).toEqual({
      missingFields: [],
      parseIssues: [],
      calculatorInput: {
        temperatureC: 0,
        timeHours: -4,
        flourValue: 500,
        flourUnit: 'g',
      },
    });
  });

  it('creates a calculator input only when all required fields are present and parseable', () => {
    const parsedDraft = parseCalculatorDraft({
      temperatureC: '24.5',
      timeHours: '8',
      flourValue: '1.2',
      flourUnit: 'kg',
    });

    expect(parsedDraft).toEqual({
      missingFields: [],
      parseIssues: [],
      calculatorInput: {
        temperatureC: 24.5,
        timeHours: 8,
        flourValue: 1.2,
        flourUnit: 'kg',
      },
    });
  });
});