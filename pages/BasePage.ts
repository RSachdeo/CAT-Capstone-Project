import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  readonly header: Locator;
  readonly footer: Locator;
  readonly logo: Locator;
  readonly homeLink: Locator;
  readonly productsLink: Locator;
  readonly cartLink: Locator;
  readonly loginLink: Locator;
  readonly logoutLink: Locator;
  readonly deleteAccountLink: Locator;
  readonly contactUsLink: Locator;
  readonly loggedInUser: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator('header');
    this.footer = page.locator('footer');
    this.logo = page.locator('.logo');
    this.homeLink = page.locator('a[href="/"]').first();
    this.productsLink = page.locator('a[href="/products"]');
    this.cartLink = page.locator('a[href="/view_cart"]');
    this.loginLink = page.locator('a[href="/login"]');
    this.logoutLink = page.locator('a[href="/logout"]');
    this.deleteAccountLink = page.locator('a[href="/delete_account"]');
    this.contactUsLink = page.locator('a[href="/contact_us"]');
    this.loggedInUser = page.locator('a:has-text("Logged in as")');
  }

  async navigate(path: string = '/'): Promise<void> {
    await this.page.goto(path);
    await this.waitForPageLoad();
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  async goToHome(): Promise<void> {
    await this.homeLink.click();
    await this.waitForPageLoad();
  }

  async goToProducts(): Promise<void> {
    await this.productsLink.click();
    await this.waitForPageLoad();
  }

  async goToCart(): Promise<void> {
    await this.cartLink.first().click();
    await this.waitForPageLoad();
  }

  async goToLogin(): Promise<void> {
    await this.loginLink.click();
    await this.waitForPageLoad();
  }

  async goToContactUs(): Promise<void> {
    await this.contactUsLink.click();
    await this.waitForPageLoad();
  }

  async logout(): Promise<void> {
    await this.logoutLink.click();
    await this.waitForPageLoad();
  }

  async deleteAccount(): Promise<void> {
    await this.deleteAccountLink.click();
    await this.waitForPageLoad();
  }

  async deleteAccountAndContinue(): Promise<void> {
    await this.deleteAccountLink.click();
    await this.waitForPageLoad();
    const continueBtn = this.page.locator('a[data-qa="continue-button"]');
    if (await continueBtn.isVisible({ timeout: 5000 })) {
      await continueBtn.click();
      await this.waitForPageLoad();
    }
  }

  async isLoggedIn(): Promise<boolean> {
    return this.loggedInUser.isVisible();
  }

  async getLoggedInUsername(): Promise<string> {
    const text = await this.loggedInUser.textContent();
    return text?.replace('Logged in as ', '').trim() || '';
  }

  async verifyHeaderIsVisible(): Promise<void> {
    await expect(this.header).toBeVisible();
  }

  async verifyFooterIsVisible(): Promise<void> {
    await expect(this.footer).toBeVisible();
  }

  async scrollToBottom(): Promise<void> {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }

  async scrollToTop(): Promise<void> {
    await this.page.evaluate(() => window.scrollTo(0, 0));
  }

  async acceptAlert(): Promise<void> {
    this.page.on('dialog', async (dialog) => {
      await dialog.accept();
    });
  }
}
