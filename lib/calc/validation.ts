import {
  EMPIRICAL_TEMPERATURE_RANGE_C,
  EMPIRICAL_TIME_RANGE_HOURS,
} from '@/lib/calc/constants';
import { getEmpiricalWarningMessage, getValidationMessage } from '@/lib/calc/messages';
import type {
  DomainWarning,
  NormalizedCalculatorInput,
  ValidationCode,
  ValidationField,
  ValidationIssue,
  WarningReason,
} from '@/lib/calc/types';

function buildValidationIssue(field: ValidationField, code: ValidationCode): ValidationIssue {
  return {
    field,
    code,
    message: getValidationMessage(field, code),
  };
}

function validatePositiveFinite(field: ValidationField, value: number): ValidationIssue[] {
  if (!Number.isFinite(value)) {
    return [buildValidationIssue(field, 'not-finite')];
  }

  if (value <= 0) {
    return [buildValidationIssue(field, 'must-be-greater-than-zero')];
  }

  return [];
}

export function validateCalculatorInput(input: NormalizedCalculatorInput): ValidationIssue[] {
  return [
    ...validatePositiveFinite('temperatureC', input.temperatureC),
    ...validatePositiveFinite('timeHours', input.timeHours),
    ...validatePositiveFinite('flourValue', input.flourValue),
  ];
}

export function buildEmpiricalRangeWarnings(input: NormalizedCalculatorInput): DomainWarning[] {
  const temperatureOutside =
    input.temperatureC < EMPIRICAL_TEMPERATURE_RANGE_C.min ||
    input.temperatureC > EMPIRICAL_TEMPERATURE_RANGE_C.max;
  const timeOutside =
    input.timeHours < EMPIRICAL_TIME_RANGE_HOURS.min ||
    input.timeHours > EMPIRICAL_TIME_RANGE_HOURS.max;

  if (!temperatureOutside && !timeOutside) {
    return [];
  }

  const reason: WarningReason = temperatureOutside && timeOutside
    ? 'temperature-and-time'
    : temperatureOutside
      ? 'temperature'
      : 'time';

  return [
    {
      code: 'outside-empirical-range',
      reason,
      message: getEmpiricalWarningMessage(reason),
    },
  ];
}
