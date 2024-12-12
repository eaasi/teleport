import { test, expect } from '@playwright/test';

test('Basic auth', async ({ page, browser }) => {
	await test.step('should login', async () => {
		await page.goto('/');
		await page.locator('#username').fill(process.env.VUE_APP_TEST_KEYCLOAK_USERNAME);
		await page.locator('#password').fill(process.env.VUE_APP_TEST_KEYCLOAK_PASSWORD);
		await page.locator('#kc-login').click();
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
		const logout = page.getByRole('button', { name: 'Logout' });
		if (await logout.isVisible()) {
			// New logout flow with an additional confirmation...
			await logout.click();
		}
		else {
			await page.locator('#kc-form').waitFor();
		}

		await expect(page.locator('#password')).toBeVisible();
	});
});