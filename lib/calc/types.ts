export type FlourUnit = 'g' | 'kg';

export type ExperimentalModifierKey =
  | 'hydration'
  | 'salt'
  | 'sugar'
  | 'fat'
  | 'flourStrength'
  | 'fermentationStage'
  | 'coldRetard';

export type ExperimentalModifierValue = number | string | boolean | null;

export type ExperimentalModifierControlType = 'number' | 'select' | 'toggle';

export type ExperimentalModifierOption = {
  value: string;
  label: string;
};

export type ExperimentalModifierDefinition = {
  key: ExperimentalModifierKey;
  label: string;
  description: string;
  control: ExperimentalModifierControlType;
  placeholder?: string;
  suffix?: string;
  options?: ExperimentalModifierOption[];
};

export type ExperimentalModifierState = {
  enabled: boolean;
  values: Partial<Record<ExperimentalModifierKey, ExperimentalModifierValue>>;
};

export type CalculatorInput = {
  temperatureC: number;
  timeHours: number;
  flourValue: number;
  flourUnit: FlourUnit;
  modifiers?: ExperimentalModifierState;
};

export type NormalizedCalculatorInput = {
  temperatureC: number;
  timeHours: number;
  flourValue: number;
  flourUnit: FlourUnit;
  flourGrams: number;
  modifiers: ExperimentalModifierState;
};

export type ValidationField = 'temperatureC' | 'timeHours' | 'flourValue';

export type ValidationCode = 'not-finite' | 'must-be-greater-than-zero';

export type ValidationIssue = {
  field: ValidationField;
  code: ValidationCode;
  message: string;
};

export type WarningCode = 'outside-empirical-range';
export type WarningReason = 'temperature' | 'time' | 'temperature-and-time';

export type DomainWarning = {
  code: WarningCode;
  reason: WarningReason;
  message: string;
};

export type CalculationSuccess = {
  status: 'ok';
  normalizedInput: NormalizedCalculatorInput;
  gramsPerKg: number;
  gramsForRecipe: number;
  warnings: DomainWarning[];
  errors: [];
  appliedModifiers: string[];
};

export type CalculationFailure = {
  status: 'invalid';
  normalizedInput: NormalizedCalculatorInput;
  gramsPerKg: null;
  gramsForRecipe: null;
  warnings: [];
  errors: ValidationIssue[];
  appliedModifiers: string[];
};

export type CalculationResult = CalculationSuccess | CalculationFailure;