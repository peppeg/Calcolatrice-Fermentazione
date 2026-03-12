import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('calculator flow is reachable, interactive, and accessible', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'Quanto lievito ti serve, senza fare i conti a mente.',
    }),
  ).toBeVisible();
  await expect(page.getByText('Formula base', { exact: true })).toBeVisible();
  await expect(page.getByText(/Inserisci temperatura, tempo e farina - la stima arriva subito/i)).toBeVisible();
  await expect(page.getByRole('button', { name: /Correttivi sperimentali/i })).toHaveAttribute(
    'aria-expanded',
    'false',
  );

  await expect(async () => {
    await page.getByRole('button', { name: /Impasto piu rapido/i }).click();
    await expect(page.getByLabel('Temperatura ambiente (\u00B0C)')).toHaveValue('26');
    await expect(page.getByLabel('Tempo di lievitazione (ore)')).toHaveValue('6');
  }).toPass();

  await page.getByLabel('Quantita di farina').fill('500');

  await expect(page.getByTestId('grams-for-recipe-value')).toBeVisible();
  await expect(page.getByTestId('dry-yeast-for-recipe-value')).toBeVisible();
  await expect(page.getByText('Formula semplice v1')).toBeVisible();
  await expect(page.getByText('Correttivi sperimentali inattivi nella v1.')).toBeVisible();

  const freshBefore = await page.getByTestId('grams-for-recipe-value').textContent();
  const dryBefore = await page.getByTestId('dry-yeast-for-recipe-value').textContent();

  await page.getByRole('button', { name: /Correttivi sperimentali/i }).click();
  await expect(page.getByLabel('Idratazione')).toBeVisible();
  await expect(page.getByLabel('Forza farina')).toBeVisible();
  await expect(page.getByLabel('Riposo in frigo')).toBeVisible();

  await page.getByLabel('Idratazione').fill('70');
  await page.getByLabel('Riposo in frigo').check();

  await expect(page.getByTestId('grams-for-recipe-value')).toHaveText(freshBefore ?? '');
  await expect(page.getByTestId('dry-yeast-for-recipe-value')).toHaveText(dryBefore ?? '');
  await expect(page.getByText(/idratazione \(non applicato nella MVP\)/i)).toBeVisible();
  await expect(page.getByText(/riposo in frigo \(non applicato nella MVP\)/i)).toBeVisible();

  const accessibilityScan = await new AxeBuilder({ page }).analyze();
  expect(accessibilityScan.violations).toEqual([]);
});