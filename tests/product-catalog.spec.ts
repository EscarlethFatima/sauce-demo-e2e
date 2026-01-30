import { test, expect } from '../fixtures/pages.fixtures';
export type SortOption = 'az' | 'za' | 'lohi' | 'hilo';

type SortScenario<T> = {
    name: string;
    sortValue: SortOption;
    getActual: (catalogPage: any) => Promise<T[]>;
    sortFn: (a: T, b: T) => number;
};

test.describe('Product Catalog tests', () => {

    const sortScenarios: SortScenario<any>[] = [
        {
            name: 'price low to high',
            sortValue: 'lohi',
            getActual: (catalogPage) => catalogPage.getAllProductPrices(),
            sortFn: (a: number, b: number) => a - b,
        },
        {
            name: 'price high to low',
            sortValue: 'hilo',
            getActual: (catalogPage) => catalogPage.getAllProductPrices(),
            sortFn: (a: number, b: number) => b - a,
        },
        {
            name: 'name A-Z',
            sortValue: 'az',
            getActual: (catalogPage) => catalogPage.getAllProductNames(),
            sortFn: (a: string, b: string) => a.localeCompare(b),
        },
        {
            name: 'name Z-A',
            sortValue: 'za',
            getActual: (catalogPage) => catalogPage.getAllProductNames(),
            sortFn: (a: string, b: string) => b.localeCompare(a),
        },
    ];

    for (const scenario of sortScenarios) {
        test(`Sort by ${scenario.name} correctly reorders products`, async ({
                                                                                catalogPage,
                                                                            }) => {
            await catalogPage.sortBy(scenario.sortValue);

            const actualValues = await scenario.getActual(catalogPage);
            const expectedValues = [...actualValues].sort(scenario.sortFn);

            expect(actualValues).toEqual(expectedValues);
        });
    }

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

    test('Clicking product navigates to detail page with correct data', async ({
                                                                                   catalogPage,
                                                                                   inventoryItemPage,
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
