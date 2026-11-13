import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { ContactUsPage } from '../pages/ContactUsPage';
import { blockAdsAndTrackers } from '../utils/networkHelper';

type PageFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  productsPage: ProductsPage;
  productDetailPage: ProductDetailPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  contactUsPage: ContactUsPage;
};

export const test = base.extend<PageFixtures>({
  homePage: async ({ page }, use) => {
    await blockAdsAndTrackers(page);
    const homePage = new HomePage(page);
    await use(homePage);
  },

  loginPage: async ({ page }, use) => {
    await blockAdsAndTrackers(page);
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  productsPage: async ({ page }, use) => {
    await blockAdsAndTrackers(page);
    const productsPage = new ProductsPage(page);
    await use(productsPage);
  },

  productDetailPage: async ({ page }, use) => {
    await blockAdsAndTrackers(page);
    const productDetailPage = new ProductDetailPage(page);
    await use(productDetailPage);
  },

  cartPage: async ({ page }, use) => {
    await blockAdsAndTrackers(page);
    const cartPage = new CartPage(page);
    await use(cartPage);
  },

  checkoutPage: async ({ page }, use) => {
    await blockAdsAndTrackers(page);
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },

  contactUsPage: async ({ page }, use) => {
    await blockAdsAndTrackers(page);
    const contactUsPage = new ContactUsPage(page);
    await use(contactUsPage);
  },
});

export { expect } from '@playwright/test';
