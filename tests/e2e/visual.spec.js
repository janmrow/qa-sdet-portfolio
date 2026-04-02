const { test, expect } = require('@playwright/test');

test.describe('Visual Regression', () => {
  test('homepage visual integrity', async ({ page }) => {
    await page.goto('/');

    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('homepage-desktop.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
      mask: [page.locator('.tech-tags')],
      animations: 'disabled'
    });
  });
});
