import { test, expect } from '@playwright/test';

test('Basic auth', async ({ page, browser }) => {
	await test.step('should login', async () => {
		await page.goto('/');
		await page.locator('#username').fill(process.env.VUE_APP_TEST_KEYCLOAK_USERNAME);
		await page.locator('#password').fill(process.env.VUE_APP_TEST_KEYCLOAK_PASSWORD);
		await page.locator('#kc-login').click();
		await page.waitForURL('/dashboard*');
		await expect(page.locator('#dh-eaasi-welcome')).toBeVisible();
	});

	await test.step('go to my resources', async () => {
		await page.goto('/resources/my-resources');
		const locatorResourcesPage = page.locator('.page-title');
		await expect(locatorResourcesPage).toHaveText('My Resources');
	});

	await test.step('should logout', async () => {
		await page.locator('.hmd-user').click();
		await page.getByText('Log Out').click();
		const orderSent = page.locator('#kc-form');
		await orderSent.waitFor();
		const locator = page.locator('h2');
		await expect(locator).toHaveText('Emulation-as-a-Service-Infrastructure');
	});
});