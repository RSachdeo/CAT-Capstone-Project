import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export interface ProductInfo {
  name: string;
  price: string;
  quantity?: number;
}

export class ProductsPage extends BasePage {
  readonly pageTitle: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly productsList: Locator;
  readonly allProductsTitle: Locator;
  readonly searchedProductsTitle: Locator;
  readonly viewProductButtons: Locator;
  readonly addToCartButtons: Locator;
  readonly continueShopping: Locator;
  readonly viewCartLink: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator('.title');
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.productsList = page.locator('.features_items');
    this.allProductsTitle = page.locator('h2.title:has-text("All Products")');
    this.searchedProductsTitle = page.locator('h2.title:has-text("Searched Products")');
    this.viewProductButtons = page.locator('a:has-text("View Product")');
    this.addToCartButtons = page.locator('.add-to-cart');
    this.continueShopping = page.locator('button:has-text("Continue Shopping")');
    this.viewCartLink = page.locator('a:has-text("View Cart")');
  }

  async open(): Promise<void> {
    await this.navigate('/products');
  }

  async verifyProductsPageIsDisplayed(): Promise<void> {
    await expect(this.allProductsTitle).toBeVisible();
    await expect(this.productsList).toBeVisible();
  }

  async searchProduct(productName: string): Promise<void> {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
    await this.waitForPageLoad();
  }

  async verifySearchResults(): Promise<void> {
    await expect(this.searchedProductsTitle).toBeVisible({ timeout: 10000 });
  }

  async getProductsCount(): Promise<number> {
    const products = this.productsList.locator('.product-image-wrapper');
    return products.count();
  }

  async getProductNames(): Promise<string[]> {
    const products = this.productsList.locator('.productinfo p');
    return products.allTextContents();
  }

  async viewProductDetails(index: number): Promise<void> {
    const viewButton = this.viewProductButtons.nth(index);
    await viewButton.click();
    await this.waitForPageLoad();
  }

  async addProductToCart(index: number): Promise<void> {
    const products = this.productsList.locator('.product-image-wrapper');
    const product = products.nth(index);
    await product.scrollIntoViewIfNeeded();
    await product.hover();
    const addButton = product.locator('.productinfo .add-to-cart');
    await addButton.click();
  }

  async addProductToCartAndContinue(index: number): Promise<void> {
    await this.addProductToCart(index);
    await this.continueShopping.click();
  }

  async addProductToCartAndViewCart(index: number): Promise<void> {
    await this.addProductToCart(index);
    await this.viewCartLink.click();
    await this.waitForPageLoad();
  }

  async addMultipleProductsToCart(indices: number[]): Promise<void> {
    for (const index of indices) {
      await this.addProductToCartAndContinue(index);
    }
  }

  async getProductInfo(index: number): Promise<ProductInfo> {
    const products = this.productsList.locator('.product-image-wrapper');
    const product = products.nth(index);
    const name = await product.locator('.productinfo p').textContent();
    const price = await product.locator('.productinfo h2').textContent();
    return {
      name: name?.trim() || '',
      price: price?.trim() || '',
    };
  }

  async verifyProductsMatchSearch(searchTerm: string): Promise<void> {
    const productNames = await this.getProductNames();
    for (const name of productNames) {
      expect(name.toLowerCase()).toContain(searchTerm.toLowerCase());
    }
  }

  async hoverOnProduct(index: number): Promise<void> {
    const products = this.productsList.locator('.product-image-wrapper');
    const product = products.nth(index);
    await product.hover();
  }

  async clickViewCartInModal(): Promise<void> {
    await this.viewCartLink.click();
    await this.waitForPageLoad();
  }
}
