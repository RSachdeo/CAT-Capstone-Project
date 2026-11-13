import { test, expect } from '../fixtures/pageFixtures';
import { generateRandomEmail } from '../utils/helpers';
import { testUsers } from '../testdata/users';

test.describe('User Authentication Tests', () => {
  test.setTimeout(60000);

  test.describe('User Registration', () => {
    test('TC001 - Should register a new user successfully', async ({ loginPage, homePage }) => {
      const email = generateRandomEmail();
      const userName = `TestUser_${Date.now()}`;

      await loginPage.open();
      await loginPage.verifyLoginPageIsDisplayed();

      await loginPage.completeRegistration(userName, email, {
        ...testUsers.newUser,
        password: 'Test@123',
      });

      await expect(homePage.loggedInUser).toBeVisible();
      expect(await homePage.getLoggedInUsername()).toBe(userName);

      await homePage.deleteAccount();
      await expect(homePage.page.locator('h2[data-qa="account-deleted"]')).toBeVisible({ timeout: 10000 });
    });

    test('TC002 - Should show error for existing email registration', async ({ loginPage, homePage }) => {
      const existingEmail = generateRandomEmail();
      const userName = 'ExistingUser';

      await loginPage.open();
      await loginPage.completeRegistration(userName, existingEmail, {
        ...testUsers.newUser,
        password: 'Test@123',
      });

      await homePage.logout();

      await loginPage.startSignup('AnotherUser', existingEmail);
      await loginPage.verifySignupError();

      await loginPage.login(existingEmail, 'Test@123');
      await homePage.deleteAccountAndContinue();
    });
  });

  test.describe('User Login', () => {
    test('TC003 - Should login with valid credentials and logout', async ({ loginPage, homePage }) => {
      const email = generateRandomEmail();
      const userName = 'LoginTestUser';
      const password = 'Test@123';

      await loginPage.open();
      await loginPage.completeRegistration(userName, email, {
        ...testUsers.newUser,
        password,
      });

      await homePage.logout();
      await expect(loginPage.loginHeader).toBeVisible();

      await loginPage.login(email, password);
      await expect(homePage.loggedInUser).toBeVisible();

      await homePage.logout();
      await expect(loginPage.loginHeader).toBeVisible();

      await loginPage.login(email, password);
      await homePage.deleteAccountAndContinue();
    });

    test('TC004 - Should show error for invalid login credentials', async ({ loginPage }) => {
      await loginPage.open();
      await loginPage.verifyLoginPageIsDisplayed();

      await loginPage.login(
        testUsers.invalidCredentials.email,
        testUsers.invalidCredentials.password
      );

      await loginPage.verifyLoginError();
    });
  });
});
