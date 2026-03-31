const { test, expect } = require('@playwright/test');

test.describe('homepage smoke checks', () => {
  test('loads completely without any console errors or network failures', async ({ page }) => {
    const consoleErrors = [];
    const requestFailures = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    page.on('pageerror', (exception) => {
      consoleErrors.push(exception.message);
    });

    page.on('requestfailed', (request) => {
      requestFailures.push(`${request.method()} ${request.url()}`);
    });

    const response = await page.goto('/');

    expect(response.status()).toBe(200);
    expect(consoleErrors).toHaveLength(0);
    expect(requestFailures).toHaveLength(0);
  });

  test('contains essential SEO and Open Graph meta tags', async ({ page }) => {
    await page.goto('/');

    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute('content', /software quality/i);

    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /QA Engineer/i);
  });

  test('renders core structural sections', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/QA Engineer/i);
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('.hero')).toBeVisible();
    await expect(page.locator('#projects')).toBeVisible();
  });

  test('supports skip link and keyboard-reachable content', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');

    const skipLink = page.getByRole('link', { name: /skip to content/i });
    await expect(skipLink).toBeFocused();

    await skipLink.press('Enter');
    await expect(page.locator('#main-content')).toBeFocused();
  });

  test('project links are valid and accessible', async ({ page }) => {
    await page.goto('/');

    const projectLinks = page.locator('.repo-link');
    const count = await projectLinks.count();
    expect(count).toBeGreaterThan(0);

    const projectHrefs = await projectLinks.evaluateAll((links) =>
      links.map((link) => link.getAttribute('href'))
    );

    for (const href of projectHrefs) {
      expect(href).toMatch(/^(https:\/\/github\.com\/.+\/.+|https:\/\/example\.com\/.*)$/);
    }

    const decorativeArrows = page.locator('.repo-link span[aria-hidden="true"]');
    const arrowCount = await decorativeArrows.count();
    expect(arrowCount).toBeGreaterThan(0);

    const ariaLabels = await projectLinks.evaluateAll((links) =>
      links.map((link) => link.getAttribute('aria-label'))
    );

    for (const label of ariaLabels) {
      expect(label).toBeTruthy();
      expect(label.toLowerCase()).toContain('repository');
    }
  });

  test('contact links use correct URI schemes', async ({ page }) => {
    await page.goto('/');

    const emailLink = page.locator('.contact-links a[href^="mailto:"]');
    await expect(emailLink).toHaveCount(1);

    const socialLinks = page.locator('.contact-links a[href^="https://"]');
    const count = await socialLinks.count();
    expect(count).toBeGreaterThan(1);
  });

  test('external links opened in new tabs use safe rel attributes', async ({ page }) => {
    await page.goto('/');

    const externalLinks = page.locator('a[target="_blank"]');
    const count = await externalLinks.count();
    expect(count).toBeGreaterThan(0);

    const relValues = await externalLinks.evaluateAll((links) =>
      links.map((link) => link.getAttribute('rel'))
    );

    for (const rel of relValues) {
      expect(rel).toBe('noopener noreferrer');
    }
  });

  test('homepage uses a single h1 heading', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('h1')).toHaveCount(1);
  });
});

test.describe('404 page', () => {
  test('renders meaningful content and offers a valid way back', async ({ page }) => {
    await page.goto('/404.html');

    await expect(page).toHaveTitle(/page not found/i);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    await expect(page.getByRole('link', { name: /home/i })).toHaveAttribute('href', './index.html');
  });

  test('loads stylesheet and favicon references on the 404 page', async ({ page }) => {
    await page.goto('/404.html');

    await expect(page.locator('link[rel="stylesheet"]')).toHaveCount(1);
    await expect(page.locator('link[rel="icon"]')).toHaveCount(1);
  });
});

test.describe('mobile smoke check', () => {
  test('keeps core layout and actions visible on a narrow viewport', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 }
    });

    const page = await context.newPage();
    await page.goto('/');

    await expect(page.locator('h1')).toBeVisible();

    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });

    expect(hasHorizontalOverflow).toBe(false);

    await context.close();
  });
});
