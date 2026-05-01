import {test as setup, expect} from '@playwright/test';
import path from 'path';

//where to save the login session 
// const authFilePath = path.join(__dirname, '.auth', 'saucedemo.json');
const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authentication and save session', async ({ page }) => {

    //login via UI once and save the session for reuse
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    //confirm login was successful
    await expect(page).toHaveURL(/.*inventory/);
    
    await page.context().storageState({ path: authFile });
    console.log(`✅ Authentication successful, session saved to ${authFile}`);
});