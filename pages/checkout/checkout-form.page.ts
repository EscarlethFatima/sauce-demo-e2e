import { Page, Locator } from '@playwright/test';

export class CheckoutFormPage {
    readonly page: Page;

    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;

        this.firstNameInput = page.getByTestId('firstName');
        this.lastNameInput = page.getByTestId('lastName');
        this.postalCodeInput = page.getByTestId('postalCode');
        this.continueButton = page.getByTestId('continue');
        this.errorMessage = page.getByTestId('error');
    }

    async fillFirstName(value: string) {
        await this.firstNameInput.fill(value);
    }

    async fillLastName(value: string) {
        await this.lastNameInput.fill(value);
    }

    async fillPostalCode(value: string) {
        await this.postalCodeInput.fill(value);
    }

    async fillForm(first: string, last: string, zip: string) {
        await this.fillFirstName(first);
        await this.fillLastName(last);
        await this.fillPostalCode(zip);
    }

    async continue() {
        await this.continueButton.click();
    }

    async submitValidForm(first: string, last: string, zip: string) {
        await this.fillForm(first, last, zip);
        await this.continue();
    }
}
