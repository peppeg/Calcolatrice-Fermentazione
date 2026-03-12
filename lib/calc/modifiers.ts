import type {
  ExperimentalModifierDefinition,
  ExperimentalModifierKey,
  ExperimentalModifierState,
  ExperimentalModifierValue,
} from '@/lib/calc/types';

const EXPERIMENTAL_MODIFIER_DEFINITIONS: readonly ExperimentalModifierDefinition[] = [
  {
    key: 'hydration',
    label: 'Idratazione',
    description: 'Quanto acqua porti nell\'impasto rispetto alla farina.',
    control: 'number',
    placeholder: 'Es. 70',
    suffix: '%',
  },
  {
    key: 'salt',
    label: 'Sale',
    description: 'Quota sale sul peso farina, utile per il futuro modello esteso.',
    control: 'number',
    placeholder: 'Es. 2.5',
    suffix: '%',
  },
  {
    key: 'sugar',
    label: 'Zucchero',
    description: 'Ingrediente futuro: oggi resta solo un placeholder dichiarato.',
    control: 'number',
    placeholder: 'Es. 1',
    suffix: '%',
  },
  {
    key: 'fat',
    label: 'Grassi',
    description: 'Olio, burro o altri grassi: previsto, ma non applicato nella v1.',
    control: 'number',
    placeholder: 'Es. 3',
    suffix: '%',
  },
  {
    key: 'flourStrength',
    label: 'Forza farina',
    description: 'Categoria qualitativa per una futura lettura piu completa dell\'impasto.',
    control: 'select',
    options: [
      { value: '', label: 'Non impostata' },
      { value: 'debole', label: 'Debole' },
      { value: 'media', label: 'Media' },
      { value: 'forte', label: 'Forte' },
    ],
  },
  {
    key: 'fermentationStage',
    label: 'Fase di fermentazione',
    description: 'Serve a mostrare il perimetro futuro, non cambia il numero attuale.',
    control: 'select',
    options: [
      { value: '', label: 'Non impostata' },
      { value: 'diretta', label: 'Diretta' },
      { value: 'mista', label: 'Mista' },
      { value: 'indiretta', label: 'Indiretta' },
    ],
  },
  {
    key: 'coldRetard',
    label: 'Riposo in frigo',
    description: 'Flag preparatorio per una futura gestione credibile della fermentazione a freddo.',
    control: 'toggle',
  },
] as const;

const MODIFIER_LABELS: Record<ExperimentalModifierKey, string> = Object.fromEntries(
  EXPERIMENTAL_MODIFIER_DEFINITIONS.map((definition) => [definition.key, definition.label.toLowerCase()]),
) as Record<ExperimentalModifierKey, string>;

export function getExperimentalModifierDefinitions(): readonly ExperimentalModifierDefinition[] {
  return EXPERIMENTAL_MODIFIER_DEFINITIONS;
}

export function hasMeaningfulModifierValue(value: ExperimentalModifierValue | undefined): boolean {
  return value !== undefined && value !== null && value !== false && value !== '';
}

export function hasActiveExperimentalModifiers(modifiers?: ExperimentalModifierState): boolean {
  if (!modifiers?.enabled) {
    return false;
  }

  return Object.values(modifiers.values).some((value) => hasMeaningfulModifierValue(value));
}

export function createInactiveModifierState(): ExperimentalModifierState {
  return {
    enabled: false,
    values: {},
  };
}

export function summarizeAppliedModifiers(modifiers?: ExperimentalModifierState): string[] {
  if (!hasActiveExperimentalModifiers(modifiers)) {
    return [];
  }

  return Object.entries(modifiers?.values ?? {})
    .filter(([, value]) => hasMeaningfulModifierValue(value))
    .map(([key]) => `${MODIFIER_LABELS[key as ExperimentalModifierKey]} (non applicato nella MVP)`);
}