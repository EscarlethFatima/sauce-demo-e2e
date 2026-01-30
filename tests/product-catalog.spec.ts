import { test, expect } from '../fixtures/pages.fixtures';

test.describe('Product Catalog tests', () => {

    test('All products display with required info', async ({
                                                               catalogPage,
                                                           }) => {
        const count = await catalogPage.inventoryItems.count();
        expect(count).toBeGreaterThan(0);

        for (let i = 0; i < count; i++) {
            const item = catalogPage.inventoryItems.nth(i);
            await expect(catalogPage.itemName(item)).toBeVisible();
            await expect(catalogPage.itemDescription(item)).toBeVisible();
            await expect(catalogPage.itemPrice(item)).toBeVisible();
        }
    });

    test('Sort by price low to high correctly reorders products', async ({
                                                                             catalogPage,
                                                                         }) => {
        await catalogPage.sortBy('lohi');

        const actualPrices = await catalogPage.getAllProductPrices();
        const expectedPrices = [...actualPrices].sort((a, b) => a - b);

        expect(actualPrices).toEqual(expectedPrices);
    });

    test('Sort by price high to low correctly reorders products', async ({
                                                                             catalogPage,
                                                                         }) => {
        await catalogPage.sortBy('hilo');

        const actualPrices = await catalogPage.getAllProductPrices();
        const expectedPrices = [...actualPrices].sort((a, b) => b - a);

        expect(actualPrices).toEqual(expectedPrices);
    });

    test('Sort by name A-Z correctly reorders products', async ({
                                                                    catalogPage,
                                                                }) => {
        await catalogPage.sortBy('az');

        const actualNames = await catalogPage.getAllProductNames();
        const expectedNames = [...actualNames].sort();

        expect(actualNames).toEqual(expectedNames);
    });

    test('Sort by name Z-A correctly reorders products', async ({
                                                                    catalogPage,
                                                                }) => {
        await catalogPage.sortBy('za');

        const actualNames = await catalogPage.getAllProductNames();
        const expectedNames = [...actualNames].sort().reverse();

        expect(actualNames).toEqual(expectedNames);
    });

    test('Clicking product navigates to detail page with correct data', async ({
                                                                                   inventoryItemPage,
                                                                                   catalogPage,
                                                                               }) => {
        const firstItem = catalogPage.inventoryItems.first();
        const expectedName = await catalogPage.itemName(firstItem).textContent();
        const expectedPrice = await catalogPage.itemPrice(firstItem).textContent();

        await catalogPage.openProductDetails(firstItem);

        await expect(inventoryItemPage.name).toHaveText(expectedName!);
        await expect(inventoryItemPage.price).toHaveText(expectedPrice!);
        await expect(inventoryItemPage.description).toBeVisible();
    });
});
