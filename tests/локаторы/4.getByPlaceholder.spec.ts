import { test, expect } from '@playwright/test';

test.describe('Базовые тесты для getByPlaceholder()', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_getplaceholder');
  });

  // Задание 1: Найди поле с placeholder "Введите ваше имя"
  // Заполни его текстом "Иван Иванов" и проверь значение
  test('Найти и заполнить поле по placeholder', async ({ page }) => {
    const nameInput = page.locator('[data-todo="nameInput"]'); // TODO(student): замените на корректный локатор
      await nameInput.fill('Иван Иванов');
    await expect(nameInput).toHaveValue('Иван Иванов');
  });

  // Задание 2: Найди email поле по частичному совпадению placeholder "example@"
  // Проверь что тип поля - email
  test('Найти поле по части placeholder', async ({ page }) => {
    const emailInput = page.locator('[data-todo="emailInput"]'); // TODO(student): замените на корректный локатор
      await expect(emailInput).toHaveAttribute('type', 'email');
  });
});

test.describe('Сложные случаи для getByPlaceholder()', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_getplaceholder');
  });

  // Задание 1: Найди textarea с многострочным placeholder
  // Проверь что это действительно textarea
  test('Найти textarea по многострочному placeholder', async ({ page }) => {
    const textarea = page.locator('[data-todo="textarea"]'); // TODO(student): замените на корректный локатор
      await expect(textarea).toBeVisible();
  });

  // Задание 2: Найди поле с пробелами в placeholder
  test('Найти поле с пробелами в placeholder', async ({ page }) => {
    const spacedInput = page.locator('[data-todo="spacedInput"]'); // TODO(student): замените на корректный локатор
      await expect(spacedInput).toBeVisible();
  });

  // Задание 3: Дождись появления динамического поля и найди его по placeholder
  test('Работа с динамическими полями', async ({ page }) => {
    const dynamicInput = page.locator('[data-todo="dynamicInput"]'); // TODO(student): замените на корректный локатор
      await expect(dynamicInput).toBeVisible({ timeout: 2000 });
  });
});
