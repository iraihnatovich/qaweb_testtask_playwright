import {test, expect} from 'playwright/test';

test ('button check', async({page}) => {
    await page.goto('https://www.saucedemo.com/')
    await page.click('id=user-name')
    await page.locator('id=user-name').fill('some value here')
   // await page.pause()
    await page.click('#password')
    await page.locator('//input[@name="password"]').fill('12345')
    await page.locator('text=LOGIN').click()
    
})
