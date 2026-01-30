import { Page, Locator, expect } from '@playwright/test';

export class HeaderComponent {
  readonly page: Page;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.cartBadge = page.getByTestId('shopping-cart-badge');

    this.menuButton = page.getByRole('button', { name: /open menu/i })
    this.logoutLink = page.getByTestId('logout-sidebar-link');
  }

  async openCart() {
    await this.cartLink.click();
  }

  async logout() {
    await this.menuButton.click();
    await expect(this.logoutLink).toBeVisible();
    await this.logoutLink.click();
  }

}
