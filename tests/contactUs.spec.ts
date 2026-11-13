import { test, expect } from '../fixtures/pageFixtures';
import { validContactData, contactFormTestData } from '../testdata/contactUs';

test.describe('Contact Us Form Tests', () => {
  test('TC013 - Should submit contact form successfully', async ({ contactUsPage }) => {
    await contactUsPage.open();
    await contactUsPage.verifyContactPageIsDisplayed();

    await contactUsPage.submitContactForm(validContactData);
    await contactUsPage.verifySuccessMessage();
  });

  test('TC014 - Should navigate back home after contact form submission', async ({ contactUsPage, homePage }) => {
    await contactUsPage.open();
    await contactUsPage.verifyContactPageIsDisplayed();

    await contactUsPage.submitContactForm(validContactData);
    await contactUsPage.verifySuccessMessage();

    await contactUsPage.clickHomeButton();
    await homePage.verifyHomePageIsDisplayed();
  });

  contactFormTestData.forEach((contactData, index) => {
    test(`TC013-DDT-${index + 1} - Should submit contact form: ${contactData.subject}`, async ({ contactUsPage }) => {
      await contactUsPage.open();
      await contactUsPage.verifyContactPageIsDisplayed();

      await contactUsPage.submitContactForm(contactData);
      await contactUsPage.verifySuccessMessage();
    });
  });
});
