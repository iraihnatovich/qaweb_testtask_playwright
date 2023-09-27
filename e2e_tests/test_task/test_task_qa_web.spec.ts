import { test, expect } from '@playwright/test';
import homePage from '../../pages/shop';

test.beforeEach(async ({ page }) => { //beforeEach or beforeAll????
    
    await page.goto('https://enotes.pointschool.ru/login');
    await page.locator('//input[@id="loginform-username"]').click();
    await page.keyboard.type('test');  // only via keyboard
    await page.locator('//input[@id="loginform-password"]').click();
    await page.keyboard.type('test');  // only via keyboard
    await page.locator('//input[@id="loginform-password"]').press('Enter'); // only via keyboard (hover + click doesnt work)
    await page.waitForURL('https://enotes.pointschool.ru/');
    await page.locator('div:nth-child(3) > .note-item > .card-body > .actionBuyProduct').click(); 
    await page.locator('#dropdownBasket').click(); 
    await page.waitForTimeout(1000);
    await page.locator('#basketContainer > div.dropdown-menu.dropdown-menu-right.show').locator('div',{
        has: page.locator('#basketContainer > div.dropdown-menu.dropdown-menu-right.show > div.float-right.mr-4.mt-4.mb-2.actionClearBasket > a')
     }).click();
    await page.reload();

})

test.afterEach(async ({ page }) => {
    await page.locator('#dropdownUser > div.text-uppercase').click();
    await page.locator('#navbarNav > ul > li.nav-item.dropdown.show > div > form > button').click();
    await page.waitForURL('https://enotes.pointschool.ru/');
})

test ("Переход в пустую корзину", async ({ page }) => { 

    await page.locator('#dropdownBasket > i').click();
    await expect.soft(page.locator('#basketContainer > div.dropdown-menu.dropdown-menu-right.show')).toBeVisible();
    await page.locator('#basketContainer > div.dropdown-menu.dropdown-menu-right.show > div.float-left.ml-4.mt-4.mb-2 > a').click(); //шаг фейлится --> fixme
    await expect.soft(page).toHaveURL('https://enotes.pointschool.ru/basket');
    await expect.soft(page.locator('#basketContainer > span')).toContainText('0')
    await expect.soft(page.locator('#basketContainer > div.dropdown-menu.dropdown-menu-right.show > ul')).toHaveCount(0);

})



test ("Переход в корзину с 1 неакционным товаром", async ({ page }) => {
    await page.waitForTimeout(1000);
    const homepage = new homePage(page); //созд экземпл класса 
    const prodCardNoDiscount = homepage.selectProdCardNoDiscout(); //вызов метода класса homepage
    const CartDdown = homepage.selectCartDdown();
    const CartItem = homepage.selectCartItem();
    const prodNoDiscountName = prodCardNoDiscount.locator('//div[@class="product_name h6 mb-auto"]').innerText();
    const prodNoDiscountPrice = prodCardNoDiscount.locator('//span[@class="product_price ml-1"]').innerText();
    await prodCardNoDiscount.getByRole('button', { name: 'Купить' }).click();
    await page.waitForTimeout(1000);

    await page.getByText('Корзина', { exact: true }).click();
    await expect.soft(page.locator('#basketContainer > div.dropdown-menu.dropdown-menu-right.show')).toBeVisible();

    const totalPrice = (await CartDdown).locator('//span[@class="basket_price"]').innerText();
    const cartProdName = (await CartItem).locator('//span[@class="basket-item-title"]').innerText();

    //необходимо сравнить цену товара на скарточке и в корзине (извлечь из элем текст - в строку - извлечь флоат)

    await expect.soft(page.locator('#basketContainer > span')).toHaveText('1'); //ОР звучал как "Рядом с корзиной отображается цифра 1"
    await expect.soft(cartProdName).toStrictEqual(prodNoDiscountName);
    await expect.soft(totalPrice).toStrictEqual(prodNoDiscountPrice)//сравниваем так сумму, только если 1 товар
    await page.click('#basketContainer > div.dropdown-menu.dropdown-menu-right.show > div.float-left.ml-4.mt-4.mb-2 > a');
    await expect.soft(page).toHaveURL('https://enotes.pointschool.ru/basket');
    await expect.soft(page.locator('#basketContainer > div.dropdown-menu.dropdown-menu-right.show > ul')).toHaveCount(1);// мало инфы, какая структура на /basket
    // делать ли проверку на 2хх статус код?



})

test ("Переход в корзину с 1 акционным товаром", async ({ page }) => {
    await page.waitForTimeout(1000);
    const homepage = new homePage(page);
    const prodCardDiscount = homepage.selectProdCardDiscout();
    const CartDdown = homepage.selectCartDdown();
    const CartItem = homepage.selectCartItem();
    const prodDiscountName = prodCardDiscount.locator('//div[@class="product_name h6 mb-auto"]').innerText();
    const prodDiscountPrice = prodCardDiscount.locator('//span[@class="product_price ml-1"]').innerText();
    await prodCardDiscount.getByRole('button', { name: 'Купить' }).click();
    await page.waitForTimeout(1000);
    await page.getByText('Корзина', { exact: true }).click();
    await expect.soft(page.locator('#basketContainer > div.dropdown-menu.dropdown-menu-right.show')).toBeVisible();

    const totalPrice = (await CartDdown).locator('//span[@class="basket_price"]').innerText();
    const cartProdName = (await CartItem).locator('//span[@class="basket-item-title"]').innerText();
    //необходимо сравнить цену товара на скарточке и в корзине (извлечь из элем текст - в строку - извлечь флоат)


    await expect.soft(page.locator('#basketContainer > span')).toHaveText('1'); //ОР звучал как "Рядом с корзиной отображается цифра 1"
    await expect.soft(cartProdName).toStrictEqual(prodDiscountName);
    await expect.soft(totalPrice).toStrictEqual(prodDiscountPrice)//сравниваем сумму, если 1 товар
    await page.click('#basketContainer > div.dropdown-menu.dropdown-menu-right.show > div.float-left.ml-4.mt-4.mb-2 > a');
    await expect.soft(page).toHaveURL('https://enotes.pointschool.ru/basket');
    await expect.soft(page.locator('#basketContainer > div.dropdown-menu.dropdown-menu-right.show > ul')).toHaveCount(1);
    // делать ли проверку на 2хх статус код
})










