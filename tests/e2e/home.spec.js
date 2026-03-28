const { test, expect } = require('@playwright/test');

test.describe('homepage smoke checks', () => {
  test('loads successfully and renders core sections', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle('QA Engineer Portfolio');
    await expect(page.locator('main')).toBeVisible();

    await expect(page.locator('#top')).toBeVisible();
    await expect(page.locator('#about')).toBeVisible();
    await expect(page.locator('#projects')).toBeVisible();
    await expect(page.locator('#skills')).toBeVisible();
    await expect(page.locator('#approach')).toBeVisible();
    await expect(page.locator('#contact')).toBeVisible();

    await expect(
      page.getByRole('heading', {
        level: 1,
        name: /building trust in software through pragmatic engineering and quality thinking/i
      })
    ).toBeVisible();
  });

  test('supports skip link and keyboard-reachable navigation', async ({ page }) => {
    await page.goto('/');

    await page.keyboard.press('Tab');

    const skipLink = page.getByRole('link', { name: /skip to content/i });
    await expect(skipLink).toBeFocused();

    await skipLink.press('Enter');

    await expect(page.locator('#main-content')).toBeFocused();
  });

  test('navigation links move to the correct sections', async ({ page }) => {
    await page.goto('/');

    const targets = [
      { name: 'About', hash: '#about', heading: /about/i },
      { name: 'Projects', hash: '#projects', heading: /selected work focused on quality/i },
      { name: 'Skills', hash: '#skills', heading: /practical strengths across testing/i },
      { name: 'Approach', hash: '#approach', heading: /how i think about software quality/i },
      {
        name: 'Contact',
        hash: '#contact',
        heading: /open to thoughtful engineering conversations/i
      }
    ];

    for (const target of targets) {
      await page
        .getByRole('navigation', { name: /primary navigation/i })
        .getByRole('link', {
          name: target.name
        })
        .click();

      await expect(page).toHaveURL(new RegExp(`${target.hash}$`));
      await expect(page.getByRole('heading', { level: 2, name: target.heading })).toBeVisible();
    }
  });

  test('project links and contact links are present and structurally valid', async ({ page }) => {
    await page.goto('/');

    const projectLinks = page.locator('#projects a[href^="https://github.com/"]');
    await expect(projectLinks).toHaveCount(3);

    const projectHrefs = await projectLinks.evaluateAll((links) =>
      links.map((link) => link.getAttribute('href'))
    );

    for (const href of projectHrefs) {
      expect(href).toMatch(/^https:\/\/github\.com\/.+\/.+$/);
    }

    const emailLink = page.locator('#contact a[href^="mailto:"]');
    await expect(emailLink).toHaveAttribute('href', 'mailto:your.name@example.com');

    const socialLinks = page.locator('#contact a[href^="https://"]');
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
        name: /building trust in software through pragmatic engineering and quality thinking/i
      })
    ).toBeVisible();

    await expect(page.getByRole('link', { name: /view selected projects/i })).toBeVisible();
    await expect(page.getByRole('navigation', { name: /primary navigation/i })).toBeVisible();

    const heroBox = await page.locator('.hero-layout').boundingBox();
    expect(heroBox).not.toBeNull();
    expect(heroBox.width).toBeLessThanOrEqual(390);

    await context.close();
  });
});
