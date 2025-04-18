import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('Check accessibility issues on Explore resources page when filtering modal was opened', async ({ page }) => {
	await test.step('Should login', async () => {
		await page.goto('/');
		await page.locator('#username').fill(process.env.VUE_APP_TEST_KEYCLOAK_USERNAME);
		await page.locator('#password').fill(process.env.VUE_APP_TEST_KEYCLOAK_PASSWORD);
		await page.locator('#kc-login').click();
		await expect(page.locator('#dh-eaasi-welcome')).toBeVisible();
	});

	await test.step('Go to Explore resources', async () => {
		await page.goto('/resources/explore');
		await expect(page.getByText('Explore resources')).toBeVisible({ timeout: 50000 });
	});

	await test.step('Open filtering menu', async () => {
		await page.getByText(' See All os ').click();
		await expect(page.getByText('Filter os')).toBeVisible({ timeout: 50000 });
	});

	await test.step('Check accessibility issues', async () => {
		const accessibilityScanResults = await new AxeBuilder({ page })
			.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
			.analyze();
		expect(accessibilityScanResults.violations).toEqual([]);
	});

});