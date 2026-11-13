import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ContactUsPage extends BasePage {
  readonly pageTitle: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly subjectInput: Locator;
  readonly messageTextarea: Locator;
  readonly uploadFileInput: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;
  readonly homeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator('h2:has-text("Get In Touch")');
    this.nameInput = page.locator('input[data-qa="name"]');
    this.emailInput = page.locator('input[data-qa="email"]');
    this.subjectInput = page.locator('input[data-qa="subject"]');
    this.messageTextarea = page.locator('textarea[data-qa="message"]');
    this.uploadFileInput = page.locator('input[name="upload_file"]');
    this.submitButton = page.locator('input[data-qa="submit-button"]');
    this.successMessage = page.locator('#contact-page .alert-success').first();
    this.homeButton = page.locator('a:has-text("Home")').first();
  }

  async open(): Promise<void> {
    await this.navigate('/contact_us');
  }

  async verifyContactPageIsDisplayed(): Promise<void> {
    await expect(this.pageTitle).toBeVisible();
  }

  async fillContactForm(contactInfo: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<void> {
    await this.nameInput.fill(contactInfo.name);
    await this.emailInput.fill(contactInfo.email);
    await this.subjectInput.fill(contactInfo.subject);
    await this.messageTextarea.fill(contactInfo.message);
  }

  async uploadFile(filePath: string): Promise<void> {
    await this.uploadFileInput.setInputFiles(filePath);
  }

  async submitForm(): Promise<void> {
    this.page.on('dialog', async (dialog) => {
      await dialog.accept();
    });
    await this.submitButton.click({ timeout: 30000 });
    await this.page.waitForTimeout(2000);
    await this.waitForPageLoad();
  }

  async verifySuccessMessage(): Promise<void> {
    await expect(this.successMessage).toBeVisible();
    await expect(this.successMessage).toContainText('Success');
  }

  async clickHomeButton(): Promise<void> {
    await this.homeButton.click();
    await this.waitForPageLoad();
  }

  async submitContactForm(contactInfo: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<void> {
    await this.fillContactForm(contactInfo);
    await this.submitForm();
  }

  async submitContactFormWithFile(
    contactInfo: {
      name: string;
      email: string;
      subject: string;
      message: string;
    },
    filePath: string
  ): Promise<void> {
    await this.fillContactForm(contactInfo);
    await this.uploadFile(filePath);
    await this.submitForm();
  }
}
