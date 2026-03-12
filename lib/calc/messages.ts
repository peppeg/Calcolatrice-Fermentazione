import type { ValidationCode, ValidationField, WarningReason } from '@/lib/calc/types';
import { EMPIRICAL_TEMPERATURE_RANGE_C, EMPIRICAL_TIME_RANGE_HOURS } from '@/lib/calc/constants';

const FIELD_LABELS: Record<ValidationField, string> = {
  temperatureC: 'La temperatura',
  timeHours: 'Il tempo',
  flourValue: 'La quantita di farina',
};

export function getValidationMessage(field: ValidationField, code: ValidationCode): string {
  const label = FIELD_LABELS[field];

  if (code === 'not-finite') {
    return `${label} deve essere un numero valido.`;
  }

  return `${label} deve essere maggiore di zero.`;
}

export function getEmpiricalWarningMessage(reason: WarningReason): string {
  if (reason === 'temperature') {
    return "Siamo fuori dalla zona di comfort del lievito. La stima c'e, ma prendila con piu cautela del solito.";
  }

  if (reason === 'time') {
    return `Sotto le ${EMPIRICAL_TIME_RANGE_HOURS.min} ore o sopra le ${EMPIRICAL_TIME_RANGE_HOURS.max}, il modello inizia a perdere precisione. Puoi usare il numero, ma tienilo d'occhio.`;
  }

  return `Temperatura e tempo sono fuori dalla finestra utile (${EMPIRICAL_TEMPERATURE_RANGE_C.min}-${EMPIRICAL_TEMPERATURE_RANGE_C.max}\u00B0C, ${EMPIRICAL_TIME_RANGE_HOURS.min}-${EMPIRICAL_TIME_RANGE_HOURS.max} h). La stima c'e, ma prendila con piu cautela del solito.`;
}