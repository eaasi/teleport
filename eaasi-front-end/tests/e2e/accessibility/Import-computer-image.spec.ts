import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('Check accessibility issues into Import Computer Image resource page', async ({ page }) => {
	await test.step('Should login', async () => {
		await page.goto('/');
		await page.locator('#username').fill(process.env.VUE_APP_TEST_KEYCLOAK_USERNAME);
		await page.locator('#password').fill(process.env.VUE_APP_TEST_KEYCLOAK_PASSWORD);
		await page.locator('#kc-login').click();
		await expect(page.locator('#dh-eaasi-welcome')).toBeVisible();
	});

	await test.step('Go to Import Resource', async () => {
		await page.goto('/import-resource');
		await expect(page.getByText('Import Resource')).toBeVisible({ timeout: 10000 });
	});

	await test.step('Open first step of Import Resource', async () => {
		await page.getByRole('button', { name: ' Import Image ' }).click();
		await expect(page.getByLabel(' Name ')).toBeVisible({ timeout: 50000 });
		const accessibilityScanResults = await new AxeBuilder({ page })
			.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
			.analyze();
		expect(accessibilityScanResults.violations).toEqual([]);
	});

	await test.step('Open second step of Import Resource', async () => {
		await page.getByLabel(' Name ').fill('Test computer image name');
		await page.getByRole('button', { name: ' Continue ' }).click();

		await expect(page.getByText('I will attach my disk image from...')).toBeVisible({ timeout: 50000 });
		await page.getByLabel(' Name ').fill('https://cdn2.iconfinder.com/data/icons/web-interface-icons/66/Img-512.png');
		await expect(page.getByText('1 file attached to this resource.')).toBeVisible({ timeout: 50000 });

		const accessibilityScanResults = await new AxeBuilder({ page })
			.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
			.analyze();
		expect(accessibilityScanResults.violations).toEqual([]);
	});
});