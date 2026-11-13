import { test as base, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { blockAdsAndTrackers } from '../utils/networkHelper';
import { generateRandomEmail } from '../utils/helpers';
import { testUsers } from '../testdata/users';

type AuthenticatedFixtures = {
  authenticatedPage: {
    homePage: HomePage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
    userEmail: string;
    userName: string;
  };
};

export const test = base.extend<AuthenticatedFixtures>({
  authenticatedPage: async ({ page }, use) => {
    await blockAdsAndTrackers(page);

    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    const userEmail = generateRandomEmail();
    const userName = `TestUser_${Date.now()}`;
    const userData = testUsers.newUser;

    await loginPage.open();
    await loginPage.completeRegistration(userName, userEmail, {
      ...userData,
      password: 'Test@123',
    });

    await expect(homePage.loggedInUser).toBeVisible();

    await use({
      homePage,
      cartPage,
      checkoutPage,
      userEmail,
      userName,
    });

    try {
      await homePage.deleteAccount();
    } catch {
      // Account may already be deleted or cleanup failed
    }
  },
});

export { expect };
