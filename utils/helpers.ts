import { Page } from '@playwright/test';

export function generateRandomEmail(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `testuser_${timestamp}_${random}@test.com`;
}

export function generateRandomString(length: number = 8): string {
  return Math.random().toString(36).substring(2, 2 + length);
}

export function generateRandomPhone(): string {
  return `+1${Math.floor(1000000000 + Math.random() * 9000000000)}`;
}

export async function waitForPageLoad(page: Page): Promise<void> {
  await page.waitForLoadState('domcontentloaded');
  await page.waitForLoadState('networkidle');
}

export async function scrollToElement(page: Page, selector: string): Promise<void> {
  const element = page.locator(selector);
  await element.scrollIntoViewIfNeeded();
}

export async function handleGoogleAds(page: Page): Promise<void> {
  try {
    const adFrame = page.frameLocator('iframe[id^="google_ads"]');
    const closeButton = adFrame.locator('[aria-label="Close"]');
    if (await closeButton.isVisible({ timeout: 2000 })) {
      await closeButton.click();
    }
  } catch {
    // Ad not present or already closed
  }
}

export function formatPrice(price: string): number {
  return parseFloat(price.replace(/[^0-9.]/g, ''));
}

export async function takeScreenshot(page: Page, name: string): Promise<void> {
  await page.screenshot({
    path: `reports/screenshots/${name}-${Date.now()}.png`,
    fullPage: true
  });
}
