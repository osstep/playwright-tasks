import { test, expect } from '@playwright/test';

test.describe('Базовые тесты для getByText()', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_getbytext');
  });

  test('Найти элемент по точному тексту', async ({ page }) => {
    const paragraph = page.getByText('Это обычный параграф текста для поиска');
    await expect(paragraph).toBeVisible();
  });

  test('Найти span по тексту', async ({ page }) => {
    const spanElement = page.getByText('Текст внутри span');
    await expect(spanElement).toBeVisible();
  });
});

test.describe('Поиск по частичному совпадению', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_getbytext');
  });

  test('Найти по частичному совпадению', async ({ page }) => {
    const partialText = page.getByText('важную информацию', { exact: false });
    await expect(partialText).toBeVisible();
    await expect(partialText).toHaveClass('partial-match');
  });

  test('Найти элемент списка по части текста', async ({ page }) => {
    const listItem = page.getByText('Специальный');
    await expect(listItem).toBeVisible();
  });
});

test.describe('Сложные случаи поиска по тексту', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_getbytext');
  });

  test('Найти вложенный текст', async ({ page }) => {
    const nestedSpan = page.getByText('вложенным текстом');
    await expect(nestedSpan).toBeVisible();
    await expect(nestedSpan).toHaveText('вложенным текстом');
    const parent = await nestedSpan.locator('..');
    await expect(parent).toHaveText(/Параграф с вложенным текстом внутри/);
  });

  test('Работа с динамическим контентом', async ({ page }) => {
    const dynamicText = page.getByText('Динамически загруженный текст');
    await expect(dynamicText).toBeVisible({ timeout: 2000 });
  });

  test('Найти текст с пробелами', async ({ page }) => {
    const spacedText = page.getByText(/Текст с\s+множественными\s+пробелами/);
    await expect(spacedText).toBeVisible();
  });
});
