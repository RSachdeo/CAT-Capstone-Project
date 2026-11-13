import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly slider: Locator;
  readonly featuredItems: Locator;
  readonly categorySection: Locator;
  readonly brandsSection: Locator;
  readonly subscriptionInput: Locator;
  readonly subscribeButton: Locator;
  readonly subscriptionSuccess: Locator;
  readonly scrollUpButton: Locator;

  constructor(page: Page) {
    super(page);
    this.slider = page.locator('#slider');
    this.featuredItems = page.locator('.features_items');
    this.categorySection = page.locator('.left-sidebar .category-products');
    this.brandsSection = page.locator('.brands_products');
    this.subscriptionInput = page.locator('#susbscribe_email');
    this.subscribeButton = page.locator('#subscribe');
    this.subscriptionSuccess = page.locator('.alert-success');
    this.scrollUpButton = page.locator('#scrollUp');
  }

  async open(): Promise<void> {
    await this.navigate('/');
  }

  async verifyHomePageIsDisplayed(): Promise<void> {
    await expect(this.slider).toBeVisible();
    await expect(this.featuredItems).toBeVisible();
  }

  async verifySliderIsVisible(): Promise<void> {
    await expect(this.slider).toBeVisible();
  }

  async verifyFeaturedItemsVisible(): Promise<void> {
    await expect(this.featuredItems).toBeVisible();
  }

  async verifyCategorySectionVisible(): Promise<void> {
    await expect(this.categorySection).toBeVisible();
  }

  async subscribeToNewsletter(email: string): Promise<void> {
    await this.scrollToBottom();
    await this.subscriptionInput.fill(email);
    await this.subscribeButton.click();
  }

  async verifySubscriptionSuccess(): Promise<void> {
    await expect(this.subscriptionSuccess).toBeVisible();
  }

  async getFeaturedProductsCount(): Promise<number> {
    const products = this.featuredItems.locator('.product-image-wrapper');
    return products.count();
  }

  async clickOnProduct(index: number): Promise<void> {
    const products = this.featuredItems.locator('.product-image-wrapper');
    const product = products.nth(index);
    await product.hover();
    await product.locator('.add-to-cart').first().click();
  }

  async addProductToCartByIndex(index: number): Promise<void> {
    const products = this.featuredItems.locator('.product-image-wrapper');
    const product = products.nth(index);
    await product.scrollIntoViewIfNeeded();
    await product.hover();
    const addToCartButton = product.locator('.productinfo .add-to-cart');
    await addToCartButton.click();
  }

  async clickContinueShopping(): Promise<void> {
    await this.page.locator('button:has-text("Continue Shopping")').click();
  }

  async clickViewCart(): Promise<void> {
    await this.page.locator('a:has-text("View Cart")').click();
    await this.waitForPageLoad();
  }

  async selectCategory(category: string, subCategory: string): Promise<void> {
    const categoryElement = this.categorySection.locator(`a:has-text("${category}")`).first();
    await categoryElement.click();
    const subCategoryElement = this.page.locator(`a:has-text("${subCategory}")`);
    await subCategoryElement.click();
    await this.waitForPageLoad();
  }

  async selectBrand(brand: string): Promise<void> {
    const brandLink = this.brandsSection.locator(`a:has-text("${brand}")`);
    await brandLink.click();
    await this.waitForPageLoad();
  }
}
