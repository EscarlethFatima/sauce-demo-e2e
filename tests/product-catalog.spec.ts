import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ProductCatalogPage } from '../pages/product-catalog.page';
import { InventoryItemPage } from '../pages/inventory-item.page';

test.describe('Product Catalog tests', () => {
    let loginPage: LoginPage;
    let catalogPage: ProductCatalogPage;
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        catalogPage = new ProductCatalogPage(page);
        
        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL(/inventory/);
    });
    test('All products display with required info ', async ({ page }) => {
        const count = await catalogPage.inventoryItems.count();
        expect(count).toBeGreaterThan(0);

        for (let i = 0; i < count; i++) {
            const item = catalogPage.inventoryItems.nth(i);
            await expect(catalogPage.itemName(item)).toBeVisible();
            await expect(catalogPage.itemDescription(item)).toBeVisible();
            await expect(catalogPage.itemPrice(item)).toBeVisible();
        }
    });
    test('Sort by price low to high correctly reorders products', async ({ page }) => {
        await catalogPage.sortBy('lohi');

        const actualPrices = await catalogPage.getAllProductPrices();
        const expectedPrices = [...actualPrices].sort((a, b) => a - b);
    
        expect(actualPrices).toEqual(expectedPrices);
    });

    test('Sort by price high to low correctly reorders products', async ({ page }) => {
        await catalogPage.sortBy('hilo');

        const actualPrices = await catalogPage.getAllProductPrices();
        const expectedPrices = [...actualPrices].sort((a, b) => b - a);
    
        expect(actualPrices).toEqual(expectedPrices);
    });

    test('Sort by name A-Z correctly reorders products', async ({ page }) => {
        await catalogPage.sortBy('az');

        const actualNames = await catalogPage.getAllProductNames();
        const expectedNames = [...actualNames].sort();
    
        expect(actualNames).toEqual(expectedNames);
    });

    test('Sort by name Z-A correctly reorders products', async ({ page }) => {
        await catalogPage.sortBy('za');

        const actualNames = await catalogPage.getAllProductNames();
        const expectedNames = [...actualNames].sort().reverse();
    
        expect(actualNames).toEqual(expectedNames);
    });

    test('Clicking product navigates to detail page with correct data', async ({ page }) => {
        const firstItem = catalogPage.inventoryItems.first();
        const expectedName = await catalogPage.itemName(firstItem).textContent();
        const expectedPrice = await catalogPage.itemPrice(firstItem).textContent();
      
        await catalogPage.openProductDetails(firstItem);
        const itemPage = new InventoryItemPage(page);
      
        await expect(itemPage.name).toHaveText(expectedName!);
        await expect(itemPage.price).toHaveText(expectedPrice!);
        await expect(itemPage.description).toBeVisible();
    });
});