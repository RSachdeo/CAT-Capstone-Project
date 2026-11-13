import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  readonly deliveryAddressSection: Locator;
  readonly billingAddressSection: Locator;
  readonly orderReviewSection: Locator;
  readonly deliveryFirstName: Locator;
  readonly deliveryLastName: Locator;
  readonly deliveryAddress: Locator;
  readonly deliveryCity: Locator;
  readonly deliveryCountry: Locator;
  readonly deliveryPhone: Locator;
  readonly commentTextarea: Locator;
  readonly placeOrderButton: Locator;
  readonly cartItems: Locator;
  readonly totalAmount: Locator;

  readonly cardNameInput: Locator;
  readonly cardNumberInput: Locator;
  readonly cvcInput: Locator;
  readonly expiryMonthInput: Locator;
  readonly expiryYearInput: Locator;
  readonly payButton: Locator;
  readonly orderSuccessMessage: Locator;
  readonly downloadInvoice: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    super(page);
    this.deliveryAddressSection = page.locator('#address_delivery');
    this.billingAddressSection = page.locator('#address_invoice');
    this.orderReviewSection = page.locator('#cart_info');
    this.deliveryFirstName = page.locator('#address_delivery .address_firstname');
    this.deliveryLastName = page.locator('#address_delivery .address_lastname');
    this.deliveryAddress = page.locator('#address_delivery .address_address1');
    this.deliveryCity = page.locator('#address_delivery .address_city');
    this.deliveryCountry = page.locator('#address_delivery .address_country_name');
    this.deliveryPhone = page.locator('#address_delivery .address_phone');
    this.commentTextarea = page.locator('textarea[name="message"]');
    this.placeOrderButton = page.locator('a:has-text("Place Order")');
    this.cartItems = page.locator('#cart_info tbody tr');
    this.totalAmount = page.locator('.cart_total_price');

    this.cardNameInput = page.locator('input[data-qa="name-on-card"]');
    this.cardNumberInput = page.locator('input[data-qa="card-number"]');
    this.cvcInput = page.locator('input[data-qa="cvc"]');
    this.expiryMonthInput = page.locator('input[data-qa="expiry-month"]');
    this.expiryYearInput = page.locator('input[data-qa="expiry-year"]');
    this.payButton = page.locator('button[data-qa="pay-button"]');
    this.orderSuccessMessage = page.locator('div:has-text("Congratulations! Your order has been confirmed!")');
    this.downloadInvoice = page.locator('a:has-text("Download Invoice")');
    this.continueButton = page.locator('a[data-qa="continue-button"]');
  }

  async verifyCheckoutPageIsDisplayed(): Promise<void> {
    await expect(this.deliveryAddressSection).toBeVisible();
    await expect(this.orderReviewSection).toBeVisible();
  }

  async verifyDeliveryAddress(expectedAddress: {
    name?: string;
    address?: string;
    city?: string;
    country?: string;
    phone?: string;
  }): Promise<void> {
    if (expectedAddress.name) {
      const nameElement = this.page.locator('#address_delivery .address_firstname.address_lastname');
      await expect(nameElement).toContainText(expectedAddress.name);
    }
  }

  async getDeliveryAddressDetails(): Promise<string[]> {
    const addressLines = this.deliveryAddressSection.locator('li');
    return addressLines.allTextContents();
  }

  async addComment(comment: string): Promise<void> {
    await this.commentTextarea.fill(comment);
  }

  async proceedToPayment(): Promise<void> {
    await this.placeOrderButton.click();
    await this.waitForPageLoad();
  }

  async fillPaymentDetails(paymentInfo: {
    nameOnCard: string;
    cardNumber: string;
    cvc: string;
    expiryMonth: string;
    expiryYear: string;
  }): Promise<void> {
    await this.cardNameInput.fill(paymentInfo.nameOnCard);
    await this.cardNumberInput.fill(paymentInfo.cardNumber);
    await this.cvcInput.fill(paymentInfo.cvc);
    await this.expiryMonthInput.fill(paymentInfo.expiryMonth);
    await this.expiryYearInput.fill(paymentInfo.expiryYear);
  }

  async confirmPayment(): Promise<void> {
    await this.payButton.click();
    await this.waitForPageLoad();
  }

  async completePayment(paymentInfo: {
    nameOnCard: string;
    cardNumber: string;
    cvc: string;
    expiryMonth: string;
    expiryYear: string;
  }): Promise<void> {
    await this.fillPaymentDetails(paymentInfo);
    await this.confirmPayment();
  }

  async verifyOrderSuccess(): Promise<void> {
    await expect(this.page.locator('p:has-text("Congratulations")')).toBeVisible();
  }

  async downloadInvoiceFile(): Promise<void> {
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.downloadInvoice.click(),
    ]);
    await download.saveAs(`reports/invoices/invoice-${Date.now()}.txt`);
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
    await this.waitForPageLoad();
  }

  async getOrderItemsCount(): Promise<number> {
    return this.cartItems.count();
  }

  async verifyOrderContainsProduct(productName: string): Promise<void> {
    const productLocator = this.page.locator(`#cart_info td:has-text("${productName}")`);
    await expect(productLocator).toBeVisible();
  }
}
