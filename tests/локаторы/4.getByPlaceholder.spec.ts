import { test, expect } from '@playwright/test';

test.describe('Базовые тесты для getByPlaceholder()', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_getplaceholder');
  });

  test('Найти и заполнить поле по placeholder', async ({ page }) => {
    const nameInput = page.getByPlaceholder('Введите ваше имя');
    await nameInput.fill('Иван Иванов');
    await expect(nameInput).toHaveValue('Иван Иванов');
  });

  test('Найти поле по части placeholder', async ({ page }) => {
    const emailInput = page.getByPlaceholder('example@', { exact: false });
    await expect(emailInput).toHaveAttribute('type', 'email');
  });
});

test.describe('Сложные случаи для getByPlaceholder()', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_getplaceholder');
  });

  test('Найти textarea по многострочному placeholder', async ({ page }) => {
    const textarea = page.getByPlaceholder('Введите ваш комментарий здесь... ');
    await expect(textarea).toBeVisible();
  });

  test('Найти поле с пробелами в placeholder', async ({ page }) => {
    const spacedInput = page.getByPlaceholder('  Поле с пробелами в начале  ');
    await expect(spacedInput).toBeVisible();
  });

  test('Работа с динамическими полями', async ({ page }) => {
    const dynamicInput = page.getByPlaceholder('Динамическое поле 1');
    await expect(dynamicInput).toBeVisible({ timeout: 2000 });
  });
});
