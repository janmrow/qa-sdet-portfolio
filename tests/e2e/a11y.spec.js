const { test, expect } = require('@playwright/test');
const { AxeBuilder } = require('@axe-core/playwright');

test.describe('Accessibility audit', () => {
  test('homepage should not have any automatically detectable accessibility issues', async ({
    page
  }) => {
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
