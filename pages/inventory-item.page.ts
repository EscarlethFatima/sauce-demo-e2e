import { Page, Locator } from '@playwright/test';

export class InventoryItemPage {
  readonly page: Page;

  readonly name: Locator;
  readonly description: Locator;
  readonly price: Locator;
  readonly image: Locator;
  readonly addToCartButton: Locator;
  readonly removeFromCartButton: Locator;
  constructor(page: Page) {
    this.page = page;

    this.name = page.getByTestId('inventory-item-name');
    this.description = page.getByTestId('inventory-item-desc');
    this.price = page.getByTestId('inventory-item-price');
    this.image = page.locator('.inventory_details_img');
    this.addToCartButton = page.getByTestId('add-to-cart');
    this.removeFromCartButton = page.getByTestId('remove-sauce-labs-backpack');
  }
}
