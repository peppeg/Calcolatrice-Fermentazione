import type { ValidationCode, ValidationField, WarningReason } from '@/lib/calc/types';
import { EMPIRICAL_TEMPERATURE_RANGE_C, EMPIRICAL_TIME_RANGE_HOURS } from '@/lib/calc/constants';

const FIELD_LABELS: Record<ValidationField, string> = {
  temperatureC: 'La temperatura',
  timeHours: 'Il tempo',
  flourValue: 'La quantita di farina',
};

const WARNING_REASON_LABELS: Record<WarningReason, string> = {
  temperature: 'temperatura fuori intervallo',
  time: 'tempo fuori intervallo',
  'temperature-and-time': 'temperatura e tempo fuori intervallo',
};

export function getValidationMessage(field: ValidationField, code: ValidationCode): string {
  const label = FIELD_LABELS[field];

  if (code === 'not-finite') {
    return `${label} deve essere un numero valido.`;
  }

  return `${label} deve essere maggiore di zero.`;
}

export function getEmpiricalWarningMessage(reason: WarningReason): string {
  return `Stai usando il modello fuori dall'intervallo empirico di riferimento (${EMPIRICAL_TEMPERATURE_RANGE_C.min}-${EMPIRICAL_TEMPERATURE_RANGE_C.max}°C, ${EMPIRICAL_TIME_RANGE_HOURS.min}-${EMPIRICAL_TIME_RANGE_HOURS.max} h): ${WARNING_REASON_LABELS[reason]}. Il risultato potrebbe essere meno affidabile.`;
}