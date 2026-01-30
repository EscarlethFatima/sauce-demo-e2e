import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ProductCatalogPage } from '../pages/product-catalog.page';
import { CartPage } from '../pages/shopping-cart.page';
import { HeaderComponent } from '../components/header.component';
import { CheckoutFormPage } from '../pages/checkout-form.page';
import { CheckoutOverviewPage } from '../pages/checkout-overview.page';
import { CheckoutCompletePage } from '../pages/checkout-complete.page';

test.describe('Checkout Flow Tests', () => {
    let catalogPage: ProductCatalogPage;
    let cartPage: CartPage;
    let header: HeaderComponent;
    let checkoutStepOne: CheckoutFormPage;
    let overviewPage: CheckoutOverviewPage;
    let checkoutCompletePage: CheckoutCompletePage;

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL(/inventory/);

        catalogPage = new ProductCatalogPage(page);
        cartPage = new CartPage(page);
        header = new HeaderComponent(page);
        checkoutStepOne = new CheckoutFormPage(page);
        overviewPage = new CheckoutOverviewPage(page);
        checkoutCompletePage = new CheckoutCompletePage(page);
    });

    test('Checkout form validates required fields', async ({ page }) => {
        await header.openCart();
        await cartPage.checkout();

        await checkoutStepOne.continue();
        await expect(checkoutStepOne.errorMessage).toBeVisible();
        await expect(checkoutStepOne.errorMessage).toContainText('Error');
    });

    test('Valid form submission proceeds to order summary', async ({ page }) => {
        const firstCatalogItem = catalogPage.inventoryItems.first();
        await catalogPage.addItemToCart(firstCatalogItem);
        await header.openCart();
        await cartPage.checkout();

        await checkoutStepOne.submitValidForm('Jane', 'Doe', '12345');
        await expect(page).toHaveURL(/checkout-step-two/);
    });

    test('Order summary shows correct items and calculated total (with tax)', async ({ page }) => {

        const itemsToAdd = [
            catalogPage.inventoryItems.nth(0),
            catalogPage.inventoryItems.nth(1),
        ];
        await catalogPage.addMultipleItemsToCart(itemsToAdd);

        await header.openCart();
        await cartPage.checkout();
        await checkoutStepOne.submitValidForm('Jane', 'Doe', '12345');

        const subtotal = await overviewPage.getSubtotal();
        const tax = await overviewPage.getTax();
        const total = await overviewPage.getTotal();

        expect(subtotal).toBe(39.98);
        expect(total).toBeCloseTo(subtotal + tax, 2);
    });

    test('Completing order shows confirmation page', async ({ page }) => {
        const firstCatalogItem = catalogPage.inventoryItems.first();
        await catalogPage.addItemToCart(firstCatalogItem);
        await header.openCart();
        await cartPage.checkout();
        await checkoutStepOne.submitValidForm('Jane', 'Doe', '12345');

        await overviewPage.finishCheckout();
        await expect(checkoutCompletePage.confirmationHeader).toHaveText('Thank you for your order!');
    });

    test('Cart is emptied after successful order', async ({ page }) => {
        const firstCatalogItem = catalogPage.inventoryItems.first();
        await catalogPage.addItemToCart(firstCatalogItem);
        await header.openCart();
        await cartPage.checkout();
        await checkoutStepOne.submitValidForm('Jane', 'Doe', '12345');
        await overviewPage.finishCheckout();

        await header.openCart();
        await expect(cartPage.cartItems).toHaveCount(0);
    });
});
