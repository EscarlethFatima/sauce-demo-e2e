import {Page, Locator, expect} from '@playwright/test';
import { HeaderComponent } from '../components/header.component';
export class CartPage {
    readonly page: Page;

    readonly cartItems: Locator;
    readonly itemName: (item: Locator) => Locator;
    readonly itemPrice: (item: Locator) => Locator;
    readonly itemQuantity: (item: Locator) => Locator;
    readonly removeButton: (item: Locator) => Locator;

    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.cartItems = page.getByTestId('inventory-item');
        this.itemName = (item: Locator) => item.getByTestId('inventory-item-name');
        this.itemPrice = (item: Locator) => item.getByTestId('inventory-item-price');
        this.itemQuantity = (item: Locator) => item.getByTestId('item-quantity');
        this.removeButton = (item: Locator) => item.locator('[data-test^="remove"]');
        this.checkoutButton = page.getByTestId('checkout');

    }
    async open() {
        const header = new HeaderComponent(this.page);
        await header.openCart();
        await expect(this.page).toHaveURL(/cart/);
    }

    async getItemPrices(): Promise<number[]> {
        const prices = await this.page
            .getByTestId('inventory-item-price')
            .allTextContents();

        return prices.map(p => Number(p.replace('$', '')));
    }

    async getDisplayedSubtotal(): Promise<number> {
        const subtotalText = await this.page.getByTestId('subtotal-label').textContent();
        return Number(subtotalText!.replace(/[^0-9.]/g, ''));
    }

    async calculateExpectedTotal(): Promise<number> {
        const prices = await this.getItemPrices();
        return prices.reduce((sum, price) => sum + price, 0);
    }
}
