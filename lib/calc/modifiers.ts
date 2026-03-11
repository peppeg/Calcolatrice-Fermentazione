import type {
  ExperimentalModifierKey,
  ExperimentalModifierState,
  ExperimentalModifierValue,
} from '@/lib/calc/types';

const MODIFIER_LABELS: Record<ExperimentalModifierKey, string> = {
  hydration: 'idratazione',
  salt: 'sale',
  sugar: 'zucchero',
  fat: 'grassi',
  flourStrength: 'forza farina',
  fermentationStage: 'fase fermentazione',
  coldRetard: 'riposo in frigo',
};

function hasMeaningfulModifierValue(value: ExperimentalModifierValue | undefined): boolean {
  return value !== undefined && value !== null && value !== false && value !== '';
}

export function createInactiveModifierState(): ExperimentalModifierState {
  return {
    enabled: false,
    values: {},
  };
}

export function summarizeAppliedModifiers(modifiers?: ExperimentalModifierState): string[] {
  if (!modifiers?.enabled) {
    return [];
  }

  return Object.entries(modifiers.values)
    .filter(([, value]) => hasMeaningfulModifierValue(value))
    .map(([key]) => `${MODIFIER_LABELS[key as ExperimentalModifierKey]} (non applicato nella MVP)`);
}
