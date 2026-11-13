import { test, expect } from '../fixtures/pageFixtures';
import { mockApiResponse, blockRequests, captureNetworkRequests } from '../utils/networkHelper';

test.describe('Network Interception and Mocking Tests', () => {
  test('TC026 - Should block ad requests', async ({ page, homePage }) => {
    const blockedUrls: string[] = [];

    await page.route('**/googleads**', (route) => {
      blockedUrls.push(route.request().url());
      route.abort();
    });

    await page.route('**/googlesyndication**', (route) => {
      blockedUrls.push(route.request().url());
      route.abort();
    });

    await homePage.open();
    await homePage.verifyHomePageIsDisplayed();

    console.log(`Blocked ${blockedUrls.length} ad requests`);
  });

  test('TC027 - Should intercept and log API requests', async ({ page, productsPage }) => {
    const apiRequests: string[] = [];

    page.on('request', (request) => {
      if (request.url().includes('/api') || request.url().includes('search')) {
        apiRequests.push(request.url());
      }
    });

    await productsPage.open();
    await productsPage.searchProduct('Top');

    console.log('Captured API requests:', apiRequests);
  });

  test('TC028 - Should mock product search response', async ({ page, productsPage }) => {
    await page.route('**/api/searchProduct*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          responseCode: 200,
          products: [
            {
              id: 1,
              name: 'Mocked Product',
              price: 'Rs. 500',
              brand: 'Test Brand',
              category: {
                category: 'Women > Tops',
              },
            },
          ],
        }),
      });
    });

    await productsPage.open();
    await productsPage.verifyProductsPageIsDisplayed();
  });

  test('TC029 - Should simulate slow network', async ({ page, homePage }) => {
    test.setTimeout(120000);
    const client = await page.context().newCDPSession(page);
    await client.send('Network.enable');
    await client.send('Network.emulateNetworkConditions', {
      offline: false,
      downloadThroughput: (500 * 1024) / 8,
      uploadThroughput: (500 * 1024) / 8,
      latency: 100,
    });

    const startTime = Date.now();
    await homePage.open();
    const loadTime = Date.now() - startTime;

    console.log(`Page loaded in ${loadTime}ms with throttled network`);
    expect(loadTime).toBeGreaterThan(500);
  });

  test('TC030 - Should handle request failures gracefully', async ({ page, productsPage }) => {
    await page.route('**/products*', (route) => {
      if (route.request().resourceType() === 'image') {
        route.abort();
      } else {
        route.continue();
      }
    });

    await productsPage.open();
    const title = await productsPage.pageTitle.textContent();
    expect(title).toBeTruthy();
  });

  test('TC031 - Should capture and validate network timing', async ({ page, homePage }) => {
    const requestTimings: { url: string; duration: number }[] = [];

    page.on('requestfinished', async (request) => {
      const timing = request.timing();
      if (timing.responseEnd > 0) {
        requestTimings.push({
          url: request.url().substring(0, 50),
          duration: timing.responseEnd,
        });
      }
    });

    await homePage.open();
    await homePage.verifyHomePageIsDisplayed();

    console.log('Request timings:');
    requestTimings
      .sort((a, b) => b.duration - a.duration)
      .slice(0, 5)
      .forEach((t) => console.log(`  ${t.duration.toFixed(0)}ms - ${t.url}`));
  });
});
