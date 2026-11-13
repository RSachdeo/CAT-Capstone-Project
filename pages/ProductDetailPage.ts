import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductDetailPage extends BasePage {
  readonly productName: Locator;
  readonly productCategory: Locator;
  readonly productPrice: Locator;
  readonly productAvailability: Locator;
  readonly productCondition: Locator;
  readonly productBrand: Locator;
  readonly quantityInput: Locator;
  readonly addToCartButton: Locator;
  readonly continueShopping: Locator;
  readonly viewCartLink: Locator;
  readonly writeReviewSection: Locator;
  readonly reviewNameInput: Locator;
  readonly reviewEmailInput: Locator;
  readonly reviewTextarea: Locator;
  readonly submitReviewButton: Locator;
  readonly reviewSuccessMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.productName = page.locator('.product-information h2');
    this.productCategory = page.locator('.product-information p:has-text("Category")');
    this.productPrice = page.locator('.product-information span span');
    this.productAvailability = page.locator('.product-information p:has-text("Availability")');
    this.productCondition = page.locator('.product-information p:has-text("Condition")');
    this.productBrand = page.locator('.product-information p:has-text("Brand")');
    this.quantityInput = page.locator('#quantity');
    this.addToCartButton = page.locator('button:has-text("Add to cart")');
    this.continueShopping = page.locator('button:has-text("Continue Shopping")');
    this.viewCartLink = page.locator('a:has-text("View Cart")');
    this.writeReviewSection = page.locator('.category-tab a:has-text("Write Your Review")');
    this.reviewNameInput = page.locator('#name');
    this.reviewEmailInput = page.locator('#email');
    this.reviewTextarea = page.locator('#review');
    this.submitReviewButton = page.locator('#button-review');
    this.reviewSuccessMessage = page.locator('.alert-success');
  }

  async verifyProductDetailPageIsDisplayed(): Promise<void> {
    await expect(this.productName).toBeVisible();
    await expect(this.productPrice).toBeVisible();
  }

  async getProductName(): Promise<string> {
    return (await this.productName.textContent()) || '';
  }

  async getProductPrice(): Promise<string> {
    return (await this.productPrice.textContent()) || '';
  }

  async getProductCategory(): Promise<string> {
    return (await this.productCategory.textContent()) || '';
  }

  async getProductBrand(): Promise<string> {
    return (await this.productBrand.textContent()) || '';
  }

  async setQuantity(quantity: number): Promise<void> {
    await this.quantityInput.clear();
    await this.quantityInput.fill(quantity.toString());
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async addToCartAndContinue(): Promise<void> {
    await this.addToCart();
    await this.continueShopping.click();
  }

  async addToCartAndViewCart(): Promise<void> {
    await this.addToCart();
    await this.viewCartLink.click();
    await this.waitForPageLoad();
  }

  async addToCartWithQuantity(quantity: number): Promise<void> {
    await this.setQuantity(quantity);
    await this.addToCart();
  }

  async writeReview(name: string, email: string, review: string): Promise<void> {
    await this.reviewNameInput.fill(name);
    await this.reviewEmailInput.fill(email);
    await this.reviewTextarea.fill(review);
    await this.submitReviewButton.click();
  }

  async verifyReviewSubmitted(): Promise<void> {
    await expect(this.reviewSuccessMessage).toBeVisible();
  }

  async verifyProductInfo(expectedInfo: {
    name?: string;
    price?: string;
    brand?: string;
  }): Promise<void> {
    if (expectedInfo.name) {
      await expect(this.productName).toContainText(expectedInfo.name);
    }
    if (expectedInfo.price) {
      await expect(this.productPrice).toContainText(expectedInfo.price);
    }
    if (expectedInfo.brand) {
      await expect(this.productBrand).toContainText(expectedInfo.brand);
    }
  }
}
