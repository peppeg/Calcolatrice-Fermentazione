import {
  LONG_FERMENTATION_BASE_COEFFICIENT,
  LONG_FERMENTATION_TIME_EXPONENT,
  MODEL_REFERENCE_TEMPERATURE_C,
  MODEL_TEMPERATURE_STEP_C,
  SHORT_TIME_BLEND_END_HOURS,
  SHORT_TIME_BLEND_WINDOW_HOURS,
  SHORT_TIME_BOOST_EXPONENT,
  SHORT_TIME_BOOST_MAX,
} from '@/lib/calc/constants';

type BaseModelParams = {
  temperatureC: number;
  timeHours: number;
};

type EmpiricalModelDefinition = {
  calculate: (params: BaseModelParams) => number;
};

function calculateTemperatureFactor(temperatureC: number): number {
  return Math.pow(
    2,
    -((temperatureC - MODEL_REFERENCE_TEMPERATURE_C) / MODEL_TEMPERATURE_STEP_C),
  );
}

function calculateLongFermentationBase({ temperatureC, timeHours }: BaseModelParams): number {
  return (
    LONG_FERMENTATION_BASE_COEFFICIENT *
    Math.pow(timeHours, LONG_FERMENTATION_TIME_EXPONENT) *
    calculateTemperatureFactor(temperatureC)
  );
}

function calculateShortTimeBoostMultiplier(timeHours: number): number {
  if (timeHours >= SHORT_TIME_BLEND_END_HOURS) {
    return 1;
  }

  const normalizedShortTimeDistance =
    (SHORT_TIME_BLEND_END_HOURS - timeHours) / SHORT_TIME_BLEND_WINDOW_HOURS;

  return 1 + SHORT_TIME_BOOST_MAX * Math.pow(normalizedShortTimeDistance, SHORT_TIME_BOOST_EXPONENT);
}

const activeEmpiricalModel: EmpiricalModelDefinition = {
  calculate(params) {
    return calculateLongFermentationBase(params) * calculateShortTimeBoostMultiplier(params.timeHours);
  },
};

export function calculateBaseYeastPerKg(params: BaseModelParams): number {
  return activeEmpiricalModel.calculate(params);
}

export function scaleYeastToFlour(params: {
  gramsPerKg: number;
  flourGrams: number;
}): number {
  const { gramsPerKg, flourGrams } = params;

  return gramsPerKg * (flourGrams / 1000);
}
