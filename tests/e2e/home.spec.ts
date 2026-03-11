import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('calculator flow is reachable, interactive, and accessible', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'Una stima pratica del lievito fresco, con il modello sempre leggibile.',
    }),
  ).toBeVisible();
  await expect(page.getByText('Formula base', { exact: true })).toBeVisible();
  await expect(page.getByText(/Per vedere la stima, completa temperatura ambiente/i)).toBeVisible();

  await expect(async () => {
    await page.getByRole('button', { name: /Impasto piu rapido/i }).click();
    await expect(page.getByLabel('Temperatura ambiente (\u00B0C)')).toHaveValue('26');
    await expect(page.getByLabel('Tempo di lievitazione (ore)')).toHaveValue('6');
  }).toPass();

  await page.getByLabel('Quantita di farina').fill('500');

  await expect(page.getByTestId('grams-for-recipe-value')).toBeVisible();
  await expect(page.getByTestId('dry-yeast-for-recipe-value')).toBeVisible();
  await expect(page.getByText('Modello empirico ambiente v1')).toBeVisible();
  await expect(page.getByText('Correttivi sperimentali inattivi nella v1.')).toBeVisible();

  const accessibilityScan = await new AxeBuilder({ page }).analyze();
  expect(accessibilityScan.violations).toEqual([]);
});
