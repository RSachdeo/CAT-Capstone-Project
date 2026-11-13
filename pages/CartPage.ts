import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export interface CartItem {
  name: string;
  price: string;
  quantity: string;
  total: string;
}

export class CartPage extends BasePage {
  readonly cartTable: Locator;
  readonly cartItems: Locator;
  readonly emptyCartMessage: Locator;
  readonly proceedToCheckout: Locator;
  readonly registerLoginLink: Locator;
  readonly quantityInputs: Locator;
  readonly deleteButtons: Locator;
  readonly cartTotalPrice: Locator;

  constructor(page: Page) {
    super(page);
    this.cartTable = page.locator('#cart_info_table');
    this.cartItems = page.locator('#cart_info_table tbody tr');
    this.emptyCartMessage = page.locator('#empty_cart');
    this.proceedToCheckout = page.locator('.check_out');
    this.registerLoginLink = page.locator('a:has-text("Register / Login")');
    this.quantityInputs = page.locator('.cart_quantity');
    this.deleteButtons = page.locator('.cart_quantity_delete');
    this.cartTotalPrice = page.locator('.cart_total_price');
  }

  async open(): Promise<void> {
    await this.navigate('/view_cart');
  }

  async verifyCartPageIsDisplayed(): Promise<void> {
    await expect(this.cartTable).toBeVisible();
  }

  async getCartItemsCount(): Promise<number> {
    return this.cartItems.count();
  }

  async isCartEmpty(): Promise<boolean> {
    return this.emptyCartMessage.isVisible();
  }

  async getCartItem(index: number): Promise<CartItem> {
    const row = this.cartItems.nth(index);
    const name = await row.locator('.cart_description h4 a').textContent();
    const price = await row.locator('.cart_price p').textContent();
    const quantity = await row.locator('.cart_quantity button').textContent();
    const total = await row.locator('.cart_total_price').textContent();

    return {
      name: name?.trim() || '',
      price: price?.trim() || '',
      quantity: quantity?.trim() || '',
      total: total?.trim() || '',
    };
  }

  async getAllCartItems(): Promise<CartItem[]> {
    const count = await this.getCartItemsCount();
    const items: CartItem[] = [];

    for (let i = 0; i < count; i++) {
      items.push(await this.getCartItem(i));
    }

    return items;
  }

  async removeItem(index: number): Promise<void> {
    const deleteButton = this.deleteButtons.nth(index);
    await deleteButton.click();
    await this.page.waitForTimeout(1000);
  }

  async removeAllItems(): Promise<void> {
    const count = await this.getCartItemsCount();
    for (let i = count - 1; i >= 0; i--) {
      await this.removeItem(0);
    }
  }

  async proceedToCheckoutPage(): Promise<void> {
    await this.proceedToCheckout.click();
    await this.waitForPageLoad();
  }

  async clickRegisterLogin(): Promise<void> {
    await this.registerLoginLink.click();
    await this.waitForPageLoad();
  }

  async verifyItemInCart(productName: string): Promise<void> {
    const itemLocator = this.page.locator(`.cart_description h4 a:has-text("${productName}")`);
    await expect(itemLocator).toBeVisible();
  }

  async verifyItemNotInCart(productName: string): Promise<void> {
    const itemLocator = this.page.locator(`.cart_description h4 a:has-text("${productName}")`);
    await expect(itemLocator).not.toBeVisible();
  }

  async getItemQuantity(productName: string): Promise<string> {
    const row = this.page.locator(`tr:has(.cart_description h4 a:has-text("${productName}"))`);
    const quantity = await row.locator('.cart_quantity button').textContent();
    return quantity?.trim() || '';
  }

  async verifyQuantity(productName: string, expectedQuantity: string): Promise<void> {
    const quantity = await this.getItemQuantity(productName);
    expect(quantity).toBe(expectedQuantity);
  }

  async getTotalPrice(): Promise<string[]> {
    return this.cartTotalPrice.allTextContents();
  }
}
