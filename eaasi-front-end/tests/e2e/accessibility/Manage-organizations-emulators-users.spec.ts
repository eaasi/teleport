import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('Check accessibility issues into Manage organizations subpage users', async ({ page }) => {
	await test.step('Should login', async () => {
		await page.goto('https://dev.eaasi.duallab.com:8543/');
		await page.locator('#username').fill(process.env.VUE_APP_TEST_KEYCLOAK_USERNAME);
		await page.locator('#password').fill(process.env.VUE_APP_TEST_KEYCLOAK_PASSWORD);
		await page.locator('#kc-login').click();
		await expect(page.locator('#dh-eaasi-welcome')).toBeVisible();
	});

	await test.step('Go to users page', async () => {
		await page.goto('https://dev.eaasi.duallab.com:8543/manage-node/users');
		await expect(page.getByRole('heading', { name: 'Node Users' })).toBeVisible();

		const accessibilityScanResults = await new AxeBuilder({ page })
			.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
			.analyze();
		expect(accessibilityScanResults.violations).toEqual([]);
	});

	await test.step('Check user details', async () => {
		await page.locator('table > tbody > tr').nth(0).locator('td').nth(4).click();
		await expect(page.getByRole('heading', { name: 'User Roles & Permissions' })).toBeVisible();

		const accessibilityScanResults = await new AxeBuilder({ page })
			.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
			.analyze();
		expect(accessibilityScanResults.violations).toEqual([]);
	});
});