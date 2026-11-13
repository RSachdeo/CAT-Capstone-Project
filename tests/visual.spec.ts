import { test, expect } from '../fixtures/pageFixtures';

test.describe('Visual Regression Tests', () => {
  test.describe.configure({ retries: 0 });

  test('TC020 - Home page visual snapshot', async ({ homePage }) => {
    await homePage.open();
    await homePage.verifyHomePageIsDisplayed();

    await homePage.page.waitForLoadState('networkidle');

    await expect(homePage.page).toHaveScreenshot('homepage.png', {
      fullPage: false,
      maxDiffPixelRatio: 0.1,
      animations: 'disabled',
    });
  });

  test('TC021 - Login page visual snapshot', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.verifyLoginPageIsDisplayed();

    await expect(loginPage.page).toHaveScreenshot('login-page.png', {
      fullPage: false,
      maxDiffPixelRatio: 0.1,
      animations: 'disabled',
    });
  });

  test('TC022 - Products page visual snapshot', async ({ productsPage }) => {
    await productsPage.open();
    await productsPage.verifyProductsPageIsDisplayed();

    await expect(productsPage.page).toHaveScreenshot('products-page.png', {
      fullPage: false,
      maxDiffPixelRatio: 0.15,
      animations: 'disabled',
    });
  });

  test('TC023 - Cart page with items visual snapshot', async ({ productsPage, cartPage }) => {
    await productsPage.open();
    await productsPage.addProductToCartAndViewCart(0);

    await cartPage.verifyCartPageIsDisplayed();

    await expect(cartPage.page).toHaveScreenshot('cart-with-items.png', {
      fullPage: false,
      maxDiffPixelRatio: 0.1,
      animations: 'disabled',
    });
  });

  test('TC024 - Contact Us page visual snapshot', async ({ contactUsPage }) => {
    await contactUsPage.open();
    await contactUsPage.verifyContactPageIsDisplayed();

    await expect(contactUsPage.page).toHaveScreenshot('contact-us-page.png', {
      fullPage: false,
      maxDiffPixelRatio: 0.1,
      animations: 'disabled',
    });
  });

  test('TC025 - Product detail component snapshot', async ({ productsPage, productDetailPage }) => {
    await productsPage.open();
    await productsPage.viewProductDetails(0);

    await productDetailPage.verifyProductDetailPageIsDisplayed();

    const productInfo = productDetailPage.page.locator('.product-information');
    await expect(productInfo).toHaveScreenshot('product-detail-info.png', {
      maxDiffPixelRatio: 0.1,
      animations: 'disabled',
    });
  });
});
