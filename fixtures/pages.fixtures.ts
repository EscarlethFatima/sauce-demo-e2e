import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ProductCatalogPage } from '../pages/product-catalog.page';
import { CartPage } from '../pages/shopping-cart.page';
import { HeaderComponent } from '../components/header.component';
import { CheckoutFormPage } from '../pages/checkout-form.page';
import { CheckoutOverviewPage } from '../pages/checkout-overview.page';
import { CheckoutCompletePage } from '../pages/checkout-complete.page';
import { InventoryItemPage } from '../pages/inventory-item.page';

const test = base.extend<{
  catalogPage: ProductCatalogPage;
  cartPage: CartPage;
  header: HeaderComponent;
  checkoutStepOne: CheckoutFormPage;
  overviewPage: CheckoutOverviewPage;
  checkoutCompletePage: CheckoutCompletePage;
  inventoryItemPage: InventoryItemPage;
}>({
  catalogPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);

    const catalogPage = new ProductCatalogPage(page);
    await use(catalogPage);
  },
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },
  header: async ({ page }, use) => {
    const header = new HeaderComponent(page);
    await use(header);
  },
  checkoutStepOne: async ({ page }, use) => {
    const checkoutStepOne = new CheckoutFormPage(page);
    await use(checkoutStepOne);
  },
  overviewPage: async ({ page }, use) => {
    const overviewPage = new CheckoutOverviewPage(page);
    await use(overviewPage);
  },
  checkoutCompletePage: async ({ page }, use) => {
    const checkoutCompletePage = new CheckoutCompletePage(page);
    await use(checkoutCompletePage);
  },
  inventoryItemPage: async ({ page }, use) => {
    await use(new InventoryItemPage(page)); }
  });

export { test, expect };