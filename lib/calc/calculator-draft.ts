import { getValidationMessage } from '@/lib/calc/messages';
import type { CalculatorInput, FlourUnit, ValidationField } from '@/lib/calc/types';

export type CalculatorDraft = {
  temperatureC: string;
  timeHours: string;
  flourValue: string;
  flourUnit: FlourUnit;
};

export type CalculatorDraftIssue = {
  field: ValidationField;
  message: string;
  rawValue: string;
};

export type ParsedCalculatorDraft = {
  missingFields: ValidationField[];
  parseIssues: CalculatorDraftIssue[];
  calculatorInput: CalculatorInput | null;
};

export const INITIAL_CALCULATOR_DRAFT: Readonly<CalculatorDraft> = Object.freeze({
  temperatureC: '',
  timeHours: '',
  flourValue: '',
  flourUnit: 'g',
});

const REQUIRED_DRAFT_FIELDS: ValidationField[] = ['temperatureC', 'timeHours', 'flourValue'];

const FIELD_LABELS: Record<ValidationField, string> = {
  temperatureC: 'temperatura ambiente',
  timeHours: 'tempo di lievitazione',
  flourValue: 'quantita di farina',
};

function parseDraftNumber(field: ValidationField, rawValue: string) {
  const trimmedValue = rawValue.trim();

  if (trimmedValue.length === 0) {
    return {
      missingField: field,
      parseIssue: null,
      parsedValue: null,
    };
  }

  const parsedValue = Number(trimmedValue);

  if (!Number.isFinite(parsedValue)) {
    return {
      missingField: null,
      parseIssue: {
        field,
        message: getValidationMessage(field, 'not-finite'),
        rawValue,
      },
      parsedValue: null,
    };
  }

  return {
    missingField: null,
    parseIssue: null,
    parsedValue,
  };
}

export function createInitialCalculatorDraft(): CalculatorDraft {
  return { ...INITIAL_CALCULATOR_DRAFT };
}

export function getCalculatorFieldLabel(field: ValidationField): string {
  return FIELD_LABELS[field];
}

export function formatCalculatorFieldList(fields: ValidationField[]): string {
  const labels = fields.map((field) => getCalculatorFieldLabel(field));

  if (labels.length <= 1) {
    return labels[0] ?? '';
  }

  if (labels.length === 2) {
    return `${labels[0]} e ${labels[1]}`;
  }

  return `${labels.slice(0, -1).join(', ')} e ${labels.at(-1)}`;
}

export function parseCalculatorDraft(draft: CalculatorDraft): ParsedCalculatorDraft {
  const parsedFields = REQUIRED_DRAFT_FIELDS.map((field) => ({
    field,
    result: parseDraftNumber(field, draft[field]),
  }));

  const missingFields = parsedFields.flatMap(({ result }) =>
    result.missingField ? [result.missingField] : [],
  );
  const parseIssues = parsedFields.flatMap(({ result }) =>
    result.parseIssue ? [result.parseIssue] : [],
  );

  if (missingFields.length > 0 || parseIssues.length > 0) {
    return {
      missingFields,
      parseIssues,
      calculatorInput: null,
    };
  }

  return {
    missingFields: [],
    parseIssues: [],
    calculatorInput: {
      temperatureC: parsedFields[0]!.result.parsedValue as number,
      timeHours: parsedFields[1]!.result.parsedValue as number,
      flourValue: parsedFields[2]!.result.parsedValue as number,
      flourUnit: draft.flourUnit,
    },
  };
}