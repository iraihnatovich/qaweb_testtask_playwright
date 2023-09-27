import {test, expect} from '@playwright/test'

test ('Login test demo', async ({page}) => {
    await page.goto('https://www.saucedemo.com/');
    await page.pause();
    await page.locator('//input[@placeholder="Username"]').fill('standard_user');
    await page.locator('//input[@name="password"]').fill('secret_sauce');
    await page.click('//input[@name="login-button"]');
})