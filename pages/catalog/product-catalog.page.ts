import { Page, Locator, expect } from '@playwright/test';

export class ProductCatalogPage {
    readonly page: Page;

    readonly inventoryContainer: Locator;
    readonly inventoryItems: Locator;

    readonly itemName: (item: Locator) => Locator;
    readonly itemDescription: (item: Locator) => Locator;
    readonly itemPrice: (item: Locator) => Locator;
    readonly itemImage: (item: Locator) => Locator;
    readonly addToCartButton: (item: Locator) => Locator;
    readonly removeFromCartButton: (item: Locator) => Locator;
    readonly sortDropdown: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inventoryContainer = page.getByTestId('inventory-container');
        this.inventoryItems = page.getByTestId('inventory-item');

        this.itemName = (item: Locator) =>
            item.getByTestId('inventory-item-name');

        this.itemDescription = (item: Locator) =>
            item.getByTestId('inventory-item-desc');

        this.itemPrice = (item: Locator) =>
            item.getByTestId('inventory-item-price');

        this.itemImage = (item: Locator) =>
            item.locator('img');

        this.addToCartButton = (item: Locator) =>
            item.locator('[data-test^="add-to-cart"]');

        this.removeFromCartButton = (item: Locator) =>
            item.locator('[data-test^="remove"]');
        this.sortDropdown = page.getByTestId('product-sort-container');
    }
    async getAllProductNames(): Promise<string[]> {
        return this.page
            .getByTestId('inventory-item-name')
            .allTextContents();
    }
    async getAllProductPrices(): Promise<number[]> {
        const prices = await this.page
            .getByTestId('inventory-item-price')
            .allTextContents();

        return prices.map(price => Number(price.replace('$', '')));
    }
    async sortBy(value: 'az' | 'za' | 'lohi' | 'hilo') {
        await this.sortDropdown.selectOption(value);
    }
    async openProductDetails(item: Locator) {
        await this.itemName(item).click();
        await expect(this.page).toHaveURL(/inventory-item/);
      }

    async addItemToCart(item: Locator) {
        await this.addToCartButton(item).click();
    }

    async addMultipleItemsToCart(items: Locator[]) {
        for (const item of items) {
            await this.addToCartButton(item).click();
        }
    }

    async removeItemFromCart(item: Locator) {
        await this.removeFromCartButton(item).click();
    }
}
