import {test, expect} from '@playwright/test'

test ( "Assertion", async ({page}) => {
    await page.goto('https://www.saucedemo.com/');
    //await page.pause();
    await expect(page.locator('//div[@class="login_logo"]')).toHaveCount(1);
    await expect(page.locator('//input[@name="login-button"]')).toBeVisible();

    await expect(page.locator('//input[@name="login-button"]')).not.toHaveText('testtest')

})
 