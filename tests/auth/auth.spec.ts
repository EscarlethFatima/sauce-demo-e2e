import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/auth/login.page';
import { HeaderComponent } from '../../components/header.component';

test.describe('Authentication Tests', () => {
    let loginPage: LoginPage;
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    test('Successful login redirects to inventory page', async ({ page }) => {
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL(/inventory/);
    });

    test('Invalid credentials show error message', async ({ page }) => {
        await loginPage.login('standard_user', 'invalid_credentials');
        await expect(loginPage.errorMessage).toHaveText(/Username and password do not match/);
    });

    test('Locked out user sees locked error', async ({ page }) => {
        await loginPage.login('locked_out_user', 'secret_sauce');
        await expect(loginPage.errorMessage).toHaveText(/Sorry, this user has been locked out./);
    });

    test('Logout clears session', async ({ page }) => {
        await loginPage.login('standard_user', 'secret_sauce');
        const header = new HeaderComponent(page);
        await header.logout();
        await expect(page).toHaveURL('/');
        await expect(loginPage.loginButton).toBeVisible();
    });

    test('Protected routes redirect unauthenticated users to login', async ({ page }) => {
        await page.goto('/inventory.html');
        await expect(loginPage.page).toHaveURL('/');
        await expect(loginPage.loginButton).toBeVisible();
    });
});