import { Page, Locator } from '@playwright/test';

export class CheckoutOverviewPage {
    readonly page: Page;

    readonly cartItems: Locator;
    readonly subtotalLabel: Locator;
    readonly taxLabel: Locator;
    readonly totalLabel: Locator;
    readonly finishButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.cartItems = page.getByTestId('inventory-item');
        this.subtotalLabel = page.getByTestId('subtotal-label');
        this.taxLabel = page.getByTestId('tax-label');
        this.totalLabel = page.getByTestId('total-label');
        this.finishButton = page.getByTestId('finish');
    }

    async getSubtotal(): Promise<number> {
        const text = await this.subtotalLabel.textContent();
        return Number(text!.replace(/[^0-9.]/g, ''));
    }

    async getTax(): Promise<number> {
        const text = await this.taxLabel.textContent();
        return Number(text!.replace(/[^0-9.]/g, ''));
    }

    async getTotal(): Promise<number> {
        const text = await this.totalLabel.textContent();
        return Number(text!.replace(/[^0-9.]/g, ''));
    }

    async finishCheckout() {
        await this.finishButton.click();
    }
}
