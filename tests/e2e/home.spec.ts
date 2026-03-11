import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('home page baseline is reachable and readable', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', { level: 1, name: 'Calcolatrice Lievitazione' }),
  ).toBeVisible();
  await expect(page.getByText('Phase 1 baseline')).toBeVisible();
  await expect(page.getByText('Repo pronto per quality tooling')).toBeVisible();

  const accessibilityScan = await new AxeBuilder({ page }).analyze();
  expect(accessibilityScan.violations).toEqual([]);
});
