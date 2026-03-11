export const FRESH_TO_DRY_YEAST_RATIO = 3;

export function convertFreshToDryYeastGrams(freshYeastGrams: number): number {
  return freshYeastGrams / FRESH_TO_DRY_YEAST_RATIO;
}

