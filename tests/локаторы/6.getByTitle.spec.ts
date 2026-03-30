import { test, expect } from '@playwright/test';

test.describe('Базовые тесты для getByTitle()', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_getbytitle');
  });

  // Задание 1: Найди элемент с точным title "Это простая подсказка"
  // Проверь что это span-элемент с классом tooltip
  test('Найти элемент по точному title', async ({ page }) => {
    const tooltip = page.locator('[data-todo="tooltip"]'); // TODO(student): замените на корректный локатор
      await expect(tooltip).toBeVisible();
    await expect(tooltip).toHaveClass('tooltip');
    await expect(tooltip).toHaveText('Наведи на меня');
  });

  // Задание 2: Найди кнопку с подсказкой и проверь её текст
  test('Найти кнопку по title', async ({ page }) => {
    const button = page.locator('[data-todo="button"]'); // TODO(student): замените на корректный локатор
      await expect(button).toBeVisible();
    await expect(button).toHaveText('Нажми меня');
  });
});
test.describe('Тесты для ссылок и специальных случаев', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_getbytitle');
  });

  // Задание 1: Найди ссылку "Главная" по title и проверь её атрибуты
  test('Найти ссылку по title', async ({ page }) => {
    const homeLink = page.locator('[data-todo="homeLink"]'); // TODO(student): замените на корректный локатор
      await expect(homeLink).toBeVisible();
    await expect(homeLink).toHaveAttribute('href', '#');
    await expect(homeLink).toHaveClass('link-with-title');
  });

  // Задание 2: Найди аббревиатуру HTML по title и проверь её расшифровку
  test('Найти аббревиатуру по title', async ({ page }) => {
    const htmlAbbr = page.locator('[data-todo="htmlAbbr"]'); // TODO(student): замените на корректный локатор
      await expect(htmlAbbr).toBeVisible();
    await expect(htmlAbbr).toHaveText('HTML');
  });
});

test.describe('Сложные случаи и динамический контент', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_getbytitle');
  });

  // Задание 1: Найди элемент с title содержащим пробелы в начале и конце
  test('Найти элемент с title с пробелами', async ({ page }) => {
    const spacedTitle = page.locator('[data-todo="spacedTitle"]'); // TODO(student): замените на корректный локатор
      await expect(spacedTitle).toBeVisible();
    await expect(spacedTitle).toHaveText(/Элемент с подсказкой/);
  });

  // Задание 2: Найди динамически добавленную кнопку по title
  test('Найти динамически добавленный элемент', async ({ page }) => {
    const dynamicButton = page.locator('[data-todo="dynamicButton"]'); // TODO(student): замените на корректный локатор
      await expect(dynamicButton).toBeVisible({ timeout: 2000 });
    await expect(dynamicButton).toHaveText('Новая кнопка');
  });

  // Задание 3: Найди изображение по title и проверь его размеры
  test('Найти изображение по title', async ({ page }) => {
    const image = page.locator('[data-todo="image"]'); // TODO(student): замените на корректный локатор
      await expect(image).toBeVisible();
  });
});
