import { test, expect } from '../fixtures/pages.fixtures';

test.describe('Shopping Cart Tests', () => {
    test('Adding product updates cart badge count', async ({
                                                               catalogPage,
                                                               header,
                                                           }) => {
        const firstItem = catalogPage.inventoryItems.first();
        await catalogPage.addItemToCart(firstItem);

        await expect(header.cartBadge).toHaveText('1');
    });

    test('Adding multiple different products shows correct count', async ({
                                                                              catalogPage,
                                                                              header,
                                                                          }) => {
        await catalogPage.addMultipleItemsToCart([
            catalogPage.inventoryItems.nth(0),
            catalogPage.inventoryItems.nth(1),
            catalogPage.inventoryItems.nth(2),
        ]);

        await expect(header.cartBadge).toHaveText('3');
    });

    test('Removing product updates cart badge count', async ({
                                                                 catalogPage,
                                                                 header,
                                                             }) => {
        const firstItem = catalogPage.inventoryItems.first();
        await catalogPage.addItemToCart(firstItem);
        await expect(header.cartBadge).toHaveText('1');

        await catalogPage.removeItemFromCart(firstItem);
        await expect(header.cartBadge).toHaveCount(0);
    });

    test('Cart page displays correct items, quantities, and prices', async ({
                                                                                catalogPage,
                                                                                cartPage,
                                                                            }) => {
        const firstItem = catalogPage.inventoryItems.first();
        const expectedName = await catalogPage.itemName(firstItem).textContent();
        const expectedPrice = await catalogPage.itemPrice(firstItem).textContent();

        await catalogPage.addItemToCart(firstItem);
        await cartPage.open();

        const cartItem = cartPage.cartItems.first();
        await expect(cartPage.itemName(cartItem)).toHaveText(expectedName!);
        await expect(cartPage.itemPrice(cartItem)).toHaveText(expectedPrice!);
        await expect(cartPage.itemQuantity(cartItem)).toHaveText('1');
    });
});
