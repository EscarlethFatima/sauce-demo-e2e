import { test, expect } from '../fixtures/pages.fixtures';

test.describe('Checkout Flow Tests', () => {

    test('Checkout form validates required fields', async ({
                                                               catalogPage,
                                                               header,
                                                               cartPage,
                                                               checkoutStepOne,
                                                           }) => {
        await header.openCart();
        await cartPage.checkout();

        await checkoutStepOne.continue();
        await expect(checkoutStepOne.errorMessage).toBeVisible();
        await expect(checkoutStepOne.errorMessage).toContainText('Error');
    });

    test('Valid form submission proceeds to order summary', async ({
                                                                       page,
                                                                       catalogPage,
                                                                       header,
                                                                       cartPage,
                                                                       checkoutStepOne,
                                                                   }) => {
        const firstItem = catalogPage.inventoryItems.first();
        await catalogPage.addItemToCart(firstItem);

        await header.openCart();
        await cartPage.checkout();

        await checkoutStepOne.submitValidForm('Jane', 'Doe', '12345');
        await expect(page).toHaveURL(/checkout-step-two/);
    });

    test('Order summary shows correct items and calculated total (with tax)', async ({
                                                                                         catalogPage,
                                                                                         header,
                                                                                         cartPage,
                                                                                         checkoutStepOne,
                                                                                         overviewPage,
                                                                                     }) => {
        await catalogPage.addMultipleItemsToCart([
            catalogPage.inventoryItems.nth(0),
            catalogPage.inventoryItems.nth(1),
        ]);

        await header.openCart();
        await cartPage.checkout();
        await checkoutStepOne.submitValidForm('Jane', 'Doe', '12345');

        const subtotal = await overviewPage.getSubtotal();
        const tax = await overviewPage.getTax();
        const total = await overviewPage.getTotal();

        expect(subtotal).toBe(39.98);
        expect(total).toBeCloseTo(subtotal + tax, 2);
    });

    test('Completing order shows confirmation page', async ({
                                                                catalogPage,
                                                                header,
                                                                cartPage,
                                                                checkoutStepOne,
                                                                overviewPage,
                                                                checkoutCompletePage,
                                                            }) => {
        await catalogPage.addItemToCart(
            catalogPage.inventoryItems.first()
        );

        await header.openCart();
        await cartPage.checkout();
        await checkoutStepOne.submitValidForm('Jane', 'Doe', '12345');
        await overviewPage.finishCheckout();
        await expect(checkoutCompletePage.confirmationHeader)
            .toHaveText('Thank you for your order!');
    });

    test('Cart is emptied after successful order', async ({
                                                              catalogPage,
                                                              header,
                                                              cartPage,
                                                              checkoutStepOne,
                                                              overviewPage,
                                                          }) => {
        await catalogPage.addItemToCart(
            catalogPage.inventoryItems.first()
        );
        await header.openCart();
        await cartPage.checkout();
        await checkoutStepOne.submitValidForm('Jane', 'Doe', '12345');
        await overviewPage.finishCheckout();
        await header.openCart();
        await expect(cartPage.cartItems).toHaveCount(0);
    });
});
