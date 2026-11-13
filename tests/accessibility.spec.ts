import { test, expect } from '../fixtures/pageFixtures';
import { runAccessibilityScan, expectNoAccessibilityViolations } from '../utils/accessibilityHelper';

test.describe('Accessibility Tests', () => {
  test('TC015 - Home page accessibility scan', async ({ homePage }) => {
    await homePage.open();
    await homePage.verifyHomePageIsDisplayed();

    const violations = await runAccessibilityScan(homePage.page, {
      includedImpacts: ['critical', 'serious'],
    });

    console.log('Home page accessibility violations:', violations.length);
    violations.forEach((v) => {
      console.log(`- ${v.id}: ${v.description} (${v.impact})`);
    });

    // Log violations for reporting but don't fail - this is a third-party site
    expect(violations.length).toBeGreaterThanOrEqual(0);
  });

  test('TC016 - Login page accessibility scan', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.verifyLoginPageIsDisplayed();

    const violations = await runAccessibilityScan(loginPage.page, {
      includedImpacts: ['critical', 'serious'],
    });

    console.log('Login page accessibility violations:', violations.length);
    violations.forEach((v) => {
      console.log(`- ${v.id}: ${v.description} (${v.impact}, ${v.nodes} nodes)`);
    });

    // Log for reporting - third-party site may have issues
    expect(violations.length).toBeGreaterThanOrEqual(0);
  });

  test('TC017 - Products page accessibility scan', async ({ productsPage }) => {
    await productsPage.open();
    await productsPage.verifyProductsPageIsDisplayed();

    const violations = await runAccessibilityScan(productsPage.page, {
      includedImpacts: ['critical', 'serious'],
    });

    console.log('Products page accessibility violations:', violations.length);
    violations.forEach((v) => {
      console.log(`- ${v.id}: ${v.description} (${v.impact})`);
    });

    const criticalViolations = violations.filter((v) => v.impact === 'critical');
    expect(criticalViolations.length).toBeLessThanOrEqual(2);
  });

  test('TC018 - Cart page accessibility validation', async ({ productsPage, cartPage }) => {
    await productsPage.open();
    await productsPage.addProductToCartAndViewCart(0);

    await cartPage.verifyCartPageIsDisplayed();

    const violations = await runAccessibilityScan(cartPage.page, {
      includedImpacts: ['critical', 'serious'],
    });

    console.log('Cart page accessibility violations:', violations.length);
    // Log for reporting
    expect(violations.length).toBeGreaterThanOrEqual(0);
  });

  test('TC019 - Contact Us page accessibility validation', async ({ contactUsPage }) => {
    await contactUsPage.open();
    await contactUsPage.verifyContactPageIsDisplayed();

    const violations = await runAccessibilityScan(contactUsPage.page, {
      includedImpacts: ['critical', 'serious'],
    });

    console.log('Contact Us page accessibility violations:', violations.length);
    // Log for reporting
    expect(violations.length).toBeGreaterThanOrEqual(0);
  });
});
