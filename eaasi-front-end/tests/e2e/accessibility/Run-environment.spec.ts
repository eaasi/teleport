import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('Check accessibility issues into Run environment page', async ({ page }) => {
	await page.goto('/');
	await page.locator('#username').fill(process.env.VUE_APP_TEST_KEYCLOAK_USERNAME);
	await page.locator('#password').fill(process.env.VUE_APP_TEST_KEYCLOAK_PASSWORD);
	await page.locator('#kc-login').click();

	await page.goto('/emulation-project/options');
	await expect(page.getByText('Emulation Project')).toBeVisible({ timeout: 10000 });

	await page.getByRole('heading', { name: 'Advanced' }).click();
	await expect(page.getByRole('heading', { name: 'Hardware' })).toBeVisible();
	await page.getByTestId('test-select').selectOption('pc:qemu:basic');
	await page.getByText('Run project').click();

	await expect(page.getByRole('heading', { name: 'Generic 90s PC' })).toBeVisible({ timeout: 100000 });

	const accessibilityScanResults = await new AxeBuilder({ page })
		.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
		.analyze();
	expect(accessibilityScanResults.violations).toEqual([]);
});