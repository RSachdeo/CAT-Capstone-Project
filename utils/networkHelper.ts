import { Page, Route } from '@playwright/test';

export interface MockResponse {
  status?: number;
  contentType?: string;
  body: string | object;
}

export async function mockApiResponse(
  page: Page,
  urlPattern: string | RegExp,
  response: MockResponse
): Promise<void> {
  await page.route(urlPattern, async (route: Route) => {
    const body = typeof response.body === 'object'
      ? JSON.stringify(response.body)
      : response.body;

    await route.fulfill({
      status: response.status || 200,
      contentType: response.contentType || 'application/json',
      body,
    });
  });
}

export async function interceptAndModifyRequest(
  page: Page,
  urlPattern: string | RegExp,
  modifier: (route: Route) => Promise<void>
): Promise<void> {
  await page.route(urlPattern, modifier);
}

export async function blockRequests(
  page: Page,
  patterns: (string | RegExp)[]
): Promise<void> {
  for (const pattern of patterns) {
    await page.route(pattern, (route) => route.abort());
  }
}

export async function blockAdsAndTrackers(page: Page): Promise<void> {
  const adPatterns = [
    '**/googleads**',
    '**/googlesyndication**',
    '**/doubleclick**',
    '**/google-analytics**',
    '**/facebook.com/tr/**',
    '**/*.gif',
  ];
  await blockRequests(page, adPatterns);
}

export async function waitForApiResponse(
  page: Page,
  urlPattern: string | RegExp,
  timeout: number = 30000
): Promise<any> {
  const response = await page.waitForResponse(
    (response) => {
      const url = response.url();
      if (typeof urlPattern === 'string') {
        return url.includes(urlPattern);
      }
      return urlPattern.test(url);
    },
    { timeout }
  );
  return response.json();
}

export async function captureNetworkRequests(
  page: Page,
  urlPattern: string | RegExp
): Promise<string[]> {
  const requests: string[] = [];

  page.on('request', (request) => {
    const url = request.url();
    if (typeof urlPattern === 'string') {
      if (url.includes(urlPattern)) requests.push(url);
    } else if (urlPattern.test(url)) {
      requests.push(url);
    }
  });

  return requests;
}
