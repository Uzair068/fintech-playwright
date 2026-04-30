import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Tests - Sauce Demo', () => {

  test('TC001: successful login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Go to the site
    await loginPage.goto();

    // Login
    await loginPage.login('standard_user', 'secret_sauce');

    // Confirm we landed on dashboard
    await expect(page).toHaveURL(/.*inventory/);
    await expect(page.locator('.title')).toHaveText('Products');

    console.log('✅ Login successful');
  });

  test('TC002: login fails with wrong password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'wrongpassword');

    await loginPage.expectLoginError('Username and password do not match');

    console.log('✅ Error message shown correctly');
  });

  test('TC003: login fails with empty fields', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('', '');

    await loginPage.expectLoginError('Username is required');

    console.log('✅ Validation error shown');
  });

});