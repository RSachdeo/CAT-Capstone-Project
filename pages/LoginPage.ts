import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly loginHeader: Locator;
  readonly signupHeader: Locator;
  readonly loginEmail: Locator;
  readonly loginPassword: Locator;
  readonly loginButton: Locator;
  readonly signupName: Locator;
  readonly signupEmail: Locator;
  readonly signupButton: Locator;
  readonly loginErrorMessage: Locator;
  readonly signupErrorMessage: Locator;

  readonly signupTitle: Locator;
  readonly signupPassword: Locator;
  readonly signupDayOfBirth: Locator;
  readonly signupMonthOfBirth: Locator;
  readonly signupYearOfBirth: Locator;
  readonly signupNewsletter: Locator;
  readonly signupOffers: Locator;
  readonly signupFirstName: Locator;
  readonly signupLastName: Locator;
  readonly signupCompany: Locator;
  readonly signupAddress1: Locator;
  readonly signupAddress2: Locator;
  readonly signupCountry: Locator;
  readonly signupState: Locator;
  readonly signupCity: Locator;
  readonly signupZipcode: Locator;
  readonly signupMobile: Locator;
  readonly createAccountButton: Locator;
  readonly accountCreatedMessage: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    super(page);
    this.loginHeader = page.locator('h2:has-text("Login to your account")');
    this.signupHeader = page.locator('h2:has-text("New User Signup!")');
    this.loginEmail = page.locator('input[data-qa="login-email"]');
    this.loginPassword = page.locator('input[data-qa="login-password"]');
    this.loginButton = page.locator('button[data-qa="login-button"]');
    this.signupName = page.locator('input[data-qa="signup-name"]');
    this.signupEmail = page.locator('input[data-qa="signup-email"]');
    this.signupButton = page.locator('button[data-qa="signup-button"]');
    this.loginErrorMessage = page.locator('p:has-text("Your email or password is incorrect!")');
    this.signupErrorMessage = page.locator('p:has-text("Email Address already exist!")');

    this.signupTitle = page.locator('#id_gender1');
    this.signupPassword = page.locator('#password');
    this.signupDayOfBirth = page.locator('#days');
    this.signupMonthOfBirth = page.locator('#months');
    this.signupYearOfBirth = page.locator('#years');
    this.signupNewsletter = page.locator('#newsletter');
    this.signupOffers = page.locator('#optin');
    this.signupFirstName = page.locator('#first_name');
    this.signupLastName = page.locator('#last_name');
    this.signupCompany = page.locator('#company');
    this.signupAddress1 = page.locator('#address1');
    this.signupAddress2 = page.locator('#address2');
    this.signupCountry = page.locator('#country');
    this.signupState = page.locator('#state');
    this.signupCity = page.locator('#city');
    this.signupZipcode = page.locator('#zipcode');
    this.signupMobile = page.locator('#mobile_number');
    this.createAccountButton = page.locator('button[data-qa="create-account"]');
    this.accountCreatedMessage = page.locator('h2[data-qa="account-created"]');
    this.continueButton = page.locator('a[data-qa="continue-button"]');
  }

  async open(): Promise<void> {
    await this.navigate('/login');
  }

  async verifyLoginPageIsDisplayed(): Promise<void> {
    await expect(this.loginHeader).toBeVisible();
    await expect(this.signupHeader).toBeVisible();
  }

  async login(email: string, password: string): Promise<void> {
    await this.loginEmail.fill(email);
    await this.loginPassword.fill(password);
    await this.loginButton.click();
    await this.waitForPageLoad();
  }

  async startSignup(name: string, email: string): Promise<void> {
    await this.signupName.fill(name);
    await this.signupEmail.fill(email);
    await this.signupButton.click();
    await this.waitForPageLoad();
  }

  async fillSignupDetails(userData: {
    password: string;
    firstName: string;
    lastName: string;
    address: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    mobile: string;
    company?: string;
    address2?: string;
    day?: string;
    month?: string;
    year?: string;
  }): Promise<void> {
    await this.signupTitle.check();
    await this.signupPassword.fill(userData.password);

    if (userData.day) await this.signupDayOfBirth.selectOption(userData.day);
    if (userData.month) await this.signupMonthOfBirth.selectOption(userData.month);
    if (userData.year) await this.signupYearOfBirth.selectOption(userData.year);

    await this.signupNewsletter.check();
    await this.signupOffers.check();

    await this.signupFirstName.fill(userData.firstName);
    await this.signupLastName.fill(userData.lastName);
    if (userData.company) await this.signupCompany.fill(userData.company);
    await this.signupAddress1.fill(userData.address);
    if (userData.address2) await this.signupAddress2.fill(userData.address2);
    await this.signupCountry.selectOption(userData.country);
    await this.signupState.fill(userData.state);
    await this.signupCity.fill(userData.city);
    await this.signupZipcode.fill(userData.zipcode);
    await this.signupMobile.fill(userData.mobile);
  }

  async submitSignup(): Promise<void> {
    await this.createAccountButton.click();
    await this.waitForPageLoad();
  }

  async verifyAccountCreated(): Promise<void> {
    await expect(this.accountCreatedMessage).toBeVisible();
  }

  async clickContinueAfterSignup(): Promise<void> {
    await this.continueButton.click();
    await this.waitForPageLoad();
  }

  async verifyLoginError(): Promise<void> {
    await expect(this.loginErrorMessage).toBeVisible();
  }

  async verifySignupError(): Promise<void> {
    await expect(this.signupErrorMessage).toBeVisible();
  }

  async completeRegistration(name: string, email: string, userData: {
    password: string;
    firstName: string;
    lastName: string;
    address: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    mobile: string;
  }): Promise<void> {
    await this.startSignup(name, email);
    await this.fillSignupDetails(userData);
    await this.submitSignup();
    await this.verifyAccountCreated();
    await this.clickContinueAfterSignup();
  }
}
