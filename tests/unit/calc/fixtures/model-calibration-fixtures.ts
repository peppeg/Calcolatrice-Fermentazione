export type ModelCalibrationSource =
  | 'social-table-screenshot'
  | 'manual-target';

export type ModelCalibrationWeight = 'high' | 'medium' | 'low';
export type ModelCalibrationGate = 'core' | 'comparison';

export type ModelCalibrationFixture = {
  id: string;
  temperatureC: number;
  timeHours: number;
  expectedGramsPerKg: number;
  sourceLabel: ModelCalibrationSource;
  confidenceWeight: ModelCalibrationWeight;
  toleranceRatio: number;
  gate: ModelCalibrationGate;
  note?: string;
};

export const MODEL_CALIBRATION_FIXTURES: readonly ModelCalibrationFixture[] = [
  {
    id: 'core-20c-4h',
    temperatureC: 20,
    timeHours: 4,
    expectedGramsPerKg: 10,
    sourceLabel: 'social-table-screenshot',
    confidenceWeight: 'high',
    toleranceRatio: 0.1,
    gate: 'core',
    note: 'Rounded from the archived short-time reference table in ScreenShot/risultati_inattesi.jpg.',
  },
  {
    id: 'core-20c-6h',
    temperatureC: 20,
    timeHours: 6,
    expectedGramsPerKg: 5.8,
    sourceLabel: 'manual-target',
    confidenceWeight: 'high',
    toleranceRatio: 0.1,
    gate: 'core',
    note: 'Conservative midpoint between the archived screenshot and the current long-range tail.',
  },
  {
    id: 'core-20c-8h',
    temperatureC: 20,
    timeHours: 8,
    expectedGramsPerKg: 3.4,
    sourceLabel: 'social-table-screenshot',
    confidenceWeight: 'high',
    toleranceRatio: 0.1,
    gate: 'core',
    note: 'Short-to-standard handoff anchor for continuity checks.',
  },
  {
    id: 'core-20c-12h',
    temperatureC: 20,
    timeHours: 12,
    expectedGramsPerKg: 1.45,
    sourceLabel: 'social-table-screenshot',
    confidenceWeight: 'high',
    toleranceRatio: 0.1,
    gate: 'core',
  },
  {
    id: 'core-20c-18h',
    temperatureC: 20,
    timeHours: 18,
    expectedGramsPerKg: 1.05,
    sourceLabel: 'manual-target',
    confidenceWeight: 'medium',
    toleranceRatio: 0.12,
    gate: 'core',
    note: 'Rounded tail anchor to keep the long ferment branch practical rather than table-perfect.',
  },
  {
    id: 'core-20c-24h',
    temperatureC: 20,
    timeHours: 24,
    expectedGramsPerKg: 0.85,
    sourceLabel: 'social-table-screenshot',
    confidenceWeight: 'high',
    toleranceRatio: 0.1,
    gate: 'core',
  },
  {
    id: 'comparison-16c-2h',
    temperatureC: 16,
    timeHours: 2,
    expectedGramsPerKg: 26.39,
    sourceLabel: 'social-table-screenshot',
    confidenceWeight: 'low',
    toleranceRatio: 0.5,
    gate: 'comparison',
    note: 'Comparison-only extreme used to explain why the product no longer claims tight reliability below 4 hours.',
  },
  {
    id: 'comparison-30c-2h',
    temperatureC: 30,
    timeHours: 2,
    expectedGramsPerKg: 10,
    sourceLabel: 'social-table-screenshot',
    confidenceWeight: 'low',
    toleranceRatio: 0.5,
    gate: 'comparison',
    note: 'Comparison-only temperature check aligned with the same archived reference table.',
  },
] as const;

export const CORE_MODEL_CALIBRATION_FIXTURES = MODEL_CALIBRATION_FIXTURES.filter(
  (fixture) => fixture.gate === 'core',
);

export const COMPARISON_MODEL_CALIBRATION_FIXTURES = MODEL_CALIBRATION_FIXTURES.filter(
  (fixture) => fixture.gate === 'comparison',
);