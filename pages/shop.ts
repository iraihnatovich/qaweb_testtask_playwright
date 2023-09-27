import { Page } from "@playwright/test"
export default class homePage {

    constructor(public page: Page) {

    }

    selectProdCardNoDiscout() {
        return this.page.locator('//span[@class="product_price ml-1"][not(s)]/parent::div/parent::div').first();
        //выбор самой первой  карточки неакц товара
    }

    selectProdCardDiscout() {
        return this.page.locator('//span[@class="product_price ml-1"][s]/parent::div/parent::div').first();
        //выбор самой первой  карточки  акц товара
    }

    async selectCartDdown() {
        await this.page.getByText('Корзина', { exact: true }).click();
        return this.page.locator('//div[@class="dropdown-menu dropdown-menu-right show"]');
    }
    async selectCartItem() {
        await this.page.getByText('Корзина', { exact: true }).click();
        await this.page.waitForSelector('//div[@class="dropdown-menu dropdown-menu-right show"]');
        return this.page.locator('//li[@class="basket-item list-group-item d-flex justify-content-start align-items-center"]').first();
    }


}