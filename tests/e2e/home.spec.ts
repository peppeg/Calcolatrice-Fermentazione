import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('calculator flow is reachable, interactive, and accessible', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'Una stima pratica del lievito fresco, leggibile appena inserisci i dati.',
    }),
  ).toBeVisible();
  await expect(page.getByText(/Per vedere la stima, completa temperatura ambiente/i)).toBeVisible();

  await page.getByLabel('Temperatura ambiente (°C)').fill('24');
  await page.getByLabel('Tempo di lievitazione (ore)').fill('8');
  await page.getByLabel('Quantita di farina').fill('500');

  await expect(page.getByTestId('grams-for-recipe-value')).toBeVisible();
  await expect(page.getByTestId('grams-per-kg-value')).toBeVisible();

  await page.getByRole('button', { name: /Impasto piu rapido/i }).click();
  await expect(page.getByLabel('Temperatura ambiente (°C)')).toHaveValue('26');
  await expect(page.getByLabel('Tempo di lievitazione (ore)')).toHaveValue('6');

  const accessibilityScan = await new AxeBuilder({ page }).analyze();
  expect(accessibilityScan.violations).toEqual([]);
});