import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('Check accessibility issues on Manage organizations page', async ({ page }) => {
	await page.goto('/');
	await page.locator('#username').fill(process.env.VUE_APP_TEST_KEYCLOAK_USERNAME);
	await page.locator('#password').fill(process.env.VUE_APP_TEST_KEYCLOAK_PASSWORD);
	await page.locator('#kc-login').click();

	await page.goto('/manage-node');
	await expect(page.getByText('My Resources')).toBeVisible({ timeout: 10000 });

	const accessibilityScanResults = await new AxeBuilder({ page })
		.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
		.analyze();
	expect(accessibilityScanResults.violations).toEqual([]);
});