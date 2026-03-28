const { test, expect } = require('@playwright/test');

test.describe('homepage smoke checks', () => {
  test('loads completely without any console errors or network failures', async ({ page }) => {
    const consoleErrors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('pageerror', (exception) => {
      consoleErrors.push(exception.message);
    });

    const response = await page.goto('/');

    expect(response.status()).toBe(200);
    expect(consoleErrors).toHaveLength(0);
  });

  test('contains essential SEO and Open Graph meta tags', async ({ page }) => {
    await page.goto('/');

    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute('content', /pragmatic engineering/i);

    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', 'QA Engineer Portfolio');
  });

  test('renders core structural sections', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle('QA Engineer Portfolio');
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

  test('project links are valid and hide decorative arrows from screen readers', async ({
    page
  }) => {
    await page.goto('/');

    const projectLinks = page.locator('.repo-link');
    await expect(projectLinks).toHaveCount(3);

    const projectHrefs = await projectLinks.evaluateAll((links) =>
      links.map((link) => link.getAttribute('href'))
    );

    for (const href of projectHrefs) {
      expect(href).toMatch(/^https:\/\/github\.com\/.+\/.+$/);
    }

    const decorativeArrows = page.locator('.repo-link span[aria-hidden="true"]');
    await expect(decorativeArrows).toHaveCount(3);
  });

  test('contact links use correct URI schemes', async ({ page }) => {
    await page.goto('/');

    const emailLink = page.locator('.contact-links a[href^="mailto:"]');
    await expect(emailLink).toHaveAttribute('href', 'mailto:your.name@example.com');

    const socialLinks = page.locator('.contact-links a[href^="https://"]');
    await expect(socialLinks).toHaveCount(2);
  });
});

test.describe('404 page', () => {
  test('renders meaningful content and offers a valid way back', async ({ page }) => {
    await page.goto('/404.html');

    await expect(page).toHaveTitle(/page not found/i);
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: /the page you were looking for does not exist/i
      })
    ).toBeVisible();

    await expect(page.getByRole('link', { name: /go to homepage/i })).toHaveAttribute(
      'href',
      './index.html'
    );
  });
});

test.describe('mobile smoke check', () => {
  test('keeps core layout and actions visible on a narrow viewport', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 }
    });

    const page = await context.newPage();
    await page.goto('/');

    await expect(
      page.getByRole('heading', {
        level: 1,
        name: /pragmatic engineering and quality thinking/i
      })
    ).toBeVisible();

    const bodyBox = await page.locator('body').boundingBox();
    expect(bodyBox).not.toBeNull();
    expect(bodyBox.width).toBeLessThanOrEqual(390);

    await context.close();
  });
});
