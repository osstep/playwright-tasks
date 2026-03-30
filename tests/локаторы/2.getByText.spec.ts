import { test, expect } from '@playwright/test';

test.describe('Базовые тесты для getByText()', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_getbytext');
  });

  // Задание 1: Найди параграф с точным текстом "Это обычный параграф текста для поиска"
  // Проверь что элемент видим на странице
  test('Найти элемент по точному тексту', async ({ page }) => {
    const paragraph = page.locator('[data-todo="paragraph"]'); // TODO(student): замените на корректный локатор
      await expect(paragraph).toBeVisible();
  });

  // Задание 2: Найди span-элемент с текстом "Текст внутри span"
  // Проверь что элемент существует
  test('Найти span по тексту', async ({ page }) => {
    const spanElement = page.locator('[data-todo="spanElement"]'); // TODO(student): замените на корректный локатор
      await expect(spanElement).toBeVisible();
  });
});

test.describe('Поиск по частичному совпадению', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_getbytext');
  });

  // Задание 1: Найди элемент содержащий подстроку "важную информацию"
  // Проверь что элемент имеет класс partial-match
  test('Найти по частичному совпадению', async ({ page }) => {
    const partialText = page.locator('[data-todo="partialText"]'); // TODO(student): замените на корректный локатор
      await expect(partialText).toBeVisible();
    await expect(partialText).toHaveClass('partial-match');
  });

  // Задание 2: Найди элемент списка содержащий слово "Специальный"
  // Проверь что это действительно элемент списка (li)
  test('Найти элемент списка по части текста', async ({ page }) => {
    const listItem = page.locator('[data-todo="listItem"]'); // TODO(student): замените на корректный локатор
      await expect(listItem).toBeVisible();
  });
});

test.describe('Сложные случаи поиска по тексту', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_getbytext');
  });

  // Задание 1: Найди вложенный текст внутри span
  // Проверь что span находится внутри параграфа
  test('Найти вложенный текст', async ({ page }) => {
    const nestedSpan = page.locator('[data-todo="nestedSpan"]'); // TODO(student): замените на корректный локатор
      await expect(nestedSpan).toBeVisible();
    await expect(nestedSpan).toHaveText('вложенным текстом');
    const parent = await nestedSpan.locator('..');
    await expect(parent).toHaveText(/Параграф с вложенным текстом внутри/);
  });

  // Задание 2: Дождись появления динамического текста и найди его
  // Проверь что текст появился через 1 секунду
  test('Работа с динамическим контентом', async ({ page }) => {
    const dynamicText = page.locator('[data-todo="dynamicText"]'); // TODO(student): замените на корректный локатор
      await expect(dynamicText).toBeVisible({ timeout: 2000 });
  });

  // Задание 3: Найди текст с множественными пробелами
  // Используй регулярное выражение для поиска
  test('Найти текст с пробелами', async ({ page }) => {
    const spacedText = page.locator('[data-todo="spacedText"]'); // TODO(student): замените на корректный локатор
      await expect(spacedText).toBeVisible();
  });
});
