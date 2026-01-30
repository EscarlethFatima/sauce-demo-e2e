import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ProductCatalogPage } from '../pages/product-catalog.page';
import { CartPage } from '../pages/shopping-cart.page';
import { HeaderComponent } from '../components/header.component';

test.describe('Shopping Cart Tests', () => {
    let catalogPage: ProductCatalogPage;
    let cartPage: CartPage;
    let header: HeaderComponent;

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL(/inventory/);

        catalogPage = new ProductCatalogPage(page);
        cartPage = new CartPage(page);
        header = new HeaderComponent(page);
    });

    test('Adding product updates cart badge count', async ({ page }) => {
        const firstCatalogItem = catalogPage.inventoryItems.first();
        await catalogPage.addItemToCart(firstCatalogItem);

        await expect(header.cartBadge).toHaveText('1');
    });

    test('Adding multiple different products shows correct count', async ({ page }) => {
        const itemsToAdd = [
            catalogPage.inventoryItems.nth(0),
            catalogPage.inventoryItems.nth(1),
            catalogPage.inventoryItems.nth(2),
        ];

        await catalogPage.addMultipleItemsToCart(itemsToAdd);

        await expect(header.cartBadge).toHaveText('3');
    });

    test('Removing product updates cart badge count', async ({ page }) => {
        const firstCatalogItem = catalogPage.inventoryItems.first();
        await catalogPage.addItemToCart(firstCatalogItem);
        await expect(header.cartBadge).toHaveText('1');

        await catalogPage.removeItemFromCart(firstCatalogItem);
        await expect(header.cartBadge).toHaveCount(0);
    });

    test('Cart page displays correct items, quantities, and prices', async ({ page }) => {
        const firstCatalogItem = catalogPage.inventoryItems.first();

        const expectedName = await catalogPage.itemName(firstCatalogItem).textContent();
        const expectedPrice = await catalogPage.itemPrice(firstCatalogItem).textContent();

        await catalogPage.addItemToCart(firstCatalogItem);
        await cartPage.open();

        const cartItem = cartPage.cartItems.first();

        await expect(cartPage.itemName(cartItem)).toHaveText(expectedName!);
        await expect(cartPage.itemPrice(cartItem)).toHaveText(expectedPrice!);
        await expect(cartPage.itemQuantity(cartItem)).toHaveText('1');
    });
});
