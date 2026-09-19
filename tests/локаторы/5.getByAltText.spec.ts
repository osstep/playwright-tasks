import { test, expect } from '@playwright/test';

test.describe('Базовые тесты для getByAltText()', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_getbyalttext');
  });

  test('Найти изображение по точному alt-тексту', async ({ page }) => {
    const landscapeImage = page.getByAltText('Красивый пейзаж с горами и озером');
    await expect(landscapeImage).toBeVisible();
  });

  test('Найти логотип компании', async ({ page }) => {
    const logo = page.getByAltText('Логотип компании ТехноКорп');
    await expect(logo).toBeVisible();
    await expect(logo).toHaveJSProperty('width', 150);
  });
});

test.describe('Тесты для динамических изображений', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_getbyalttext');
  });

  test('Найти динамически загруженное изображение', async ({ page }) => {
    const dynamicImage = page.getByAltText('Динамически загруженное изображение');
    await expect(dynamicImage).toBeVisible({ timeout: 2000 });
  });

  test('Найти все иконки по частичному alt-тексту', async ({ page }) => {
    const icons = page.getByAltText('иконка');
    await expect(icons).toHaveCount(2);
    await expect(icons.first()).toBeVisible();
  });
});
