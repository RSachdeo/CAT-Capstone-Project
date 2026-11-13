import { test, expect } from '../fixtures/pageFixtures';
import { generateRandomEmail } from '../utils/helpers';
import { testUsers } from '../testdata/users';
import { validPaymentData, paymentTestData } from '../testdata/payment';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Checkout Flow Tests', () => {
  test('TC011 - Should complete full checkout flow with new registration', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    const email = generateRandomEmail();
    const userName = `CheckoutUser_${Date.now()}`;

    await productsPage.open();
    await productsPage.addProductToCartAndContinue(0);
    await productsPage.addProductToCartAndViewCart(1);

    await cartPage.verifyCartPageIsDisplayed();
    expect(await cartPage.getCartItemsCount()).toBe(2);

    await cartPage.proceedToCheckoutPage();
    await cartPage.clickRegisterLogin();

    await loginPage.completeRegistration(userName, email, {
      ...testUsers.newUser,
      password: 'Test@123',
    });

    await cartPage.open();
    await cartPage.proceedToCheckoutPage();

    await checkoutPage.verifyCheckoutPageIsDisplayed();
    await checkoutPage.addComment('Please deliver between 9 AM - 5 PM');
    await checkoutPage.proceedToPayment();

    await checkoutPage.completePayment(validPaymentData);
    await checkoutPage.verifyOrderSuccess();

    await checkoutPage.clickContinue();
    await homePage.deleteAccount();
  });

  test('TC012 - Should verify order review before payment', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    const email = generateRandomEmail();
    const userName = `OrderReviewUser_${Date.now()}`;

    await loginPage.open();
    await loginPage.completeRegistration(userName, email, {
      ...testUsers.newUser,
      password: 'Test@123',
    });

    await productsPage.open();
    const product1 = await productsPage.getProductInfo(0);
    await productsPage.addProductToCartAndViewCart(0);

    await cartPage.proceedToCheckoutPage();
    await checkoutPage.verifyCheckoutPageIsDisplayed();

    const orderCount = await checkoutPage.getOrderItemsCount();
    expect(orderCount).toBeGreaterThan(0);

    await checkoutPage.proceedToPayment();
    await checkoutPage.completePayment(validPaymentData);
    await checkoutPage.verifyOrderSuccess();
    await checkoutPage.clickContinue();

    await homePage.deleteAccount();
  });

  paymentTestData.forEach((payment, index) => {
    test(`TC012-DDT-${index + 1} - Should process payment with card: ${payment.nameOnCard}`, async ({ page }) => {
      const homePage = new HomePage(page);
      const loginPage = new LoginPage(page);
      const productsPage = new ProductsPage(page);
      const cartPage = new CartPage(page);
      const checkoutPage = new CheckoutPage(page);

      const email = generateRandomEmail();
      const userName = `PaymentUser_${Date.now()}`;

      await loginPage.open();
      await loginPage.completeRegistration(userName, email, {
        ...testUsers.newUser,
        password: 'Test@123',
      });

      await productsPage.open();
      await productsPage.addProductToCartAndViewCart(0);

      await cartPage.proceedToCheckoutPage();
      await checkoutPage.proceedToPayment();
      await checkoutPage.completePayment(payment);
      await checkoutPage.verifyOrderSuccess();
      await checkoutPage.clickContinue();

      await homePage.deleteAccount();
    });
  });
});
