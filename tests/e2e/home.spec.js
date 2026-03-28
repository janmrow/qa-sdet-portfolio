const { test, expect } = require('@playwright/test');

test.describe('homepage smoke checks', () => {
  test('loads successfully and renders core sections', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle('QA Engineer Portfolio');
    await expect(page.locator('main')).toBeVisible();

    await expect(page.locator('.hero')).toBeVisible();
    await expect(page.locator('#projects')).toBeVisible();

    await expect(
      page.getByRole('heading', {
        level: 1,
        name: /pragmatic engineering and quality thinking/i
      })
    ).toBeVisible();
  });

  test('supports skip link and keyboard-reachable content', async ({ page }) => {
    await page.goto('/');

    await page.keyboard.press('Tab');

    const skipLink = page.getByRole('link', { name: /skip to content/i });
    await expect(skipLink).toBeFocused();

    await skipLink.press('Enter');

    await expect(page.locator('#main-content')).toBeFocused();
  });

  test('project links and contact links are present and structurally valid', async ({ page }) => {
    await page.goto('/');

    const projectLinks = page.locator('.repo-link');
    await expect(projectLinks).toHaveCount(3);

    const projectHrefs = await projectLinks.evaluateAll((links) =>
      links.map((link) => link.getAttribute('href'))
    );

    for (const href of projectHrefs) {
      expect(href).toMatch(/^https:\/\/github\.com\/.+\/.+$/);
    }

    const emailLink = page.locator('.contact-links a[href^="mailto:"]');
    await expect(emailLink).toHaveAttribute('href', 'mailto:your.name@example.com');

    const socialLinks = page.locator('.contact-links a[href^="https://"]');
    await expect(socialLinks).toHaveCount(2);
  });
});

test.describe('404 page', () => {
  test('renders meaningful content and offers a way back', async ({ page }) => {
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
