import { Page, Locator } from '@playwright/test';

export class CheckoutCompletePage {
    readonly page: Page;
    readonly confirmationHeader: Locator;
    readonly confirmationText: Locator;
    readonly backHomeButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.confirmationHeader = page.getByTestId('complete-header');
        this.confirmationText = page.getByTestId('complete-text');
        this.backHomeButton = page.getByTestId('back-to-products');
    }

    async waitForPage() {
        await this.confirmationHeader.waitFor({ state: 'visible' });
    }

    async backToProducts() {
        await this.backHomeButton.click();
    }
}
