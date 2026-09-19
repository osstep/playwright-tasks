import { test, expect } from '@playwright/test';

test.describe('Заполнение базовых полей формы', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/action_fill');
  });

  // Тест 1: Заполнение текстового поля
  test('Заполнение текстового поля', async ({ page }) => {
    const usernameField = page.getByLabel('Имя пользователя');
    await usernameField.fill('Иван Иванов');
    await expect(usernameField).toHaveValue('Иван Иванов');
  });

  // Тест 2: Заполнение email с валидацией
  test('Заполнение email с валидацией', async ({ page }) => {
    const emailField = page.getByPlaceholder('example@mail.com');
    const errorFeedback = page.getByText('Введите корректный email');

    await emailField.fill('testInvalid.ru');
    await emailField.blur(); // Триггерим валидацию
    await expect(errorFeedback).toBeVisible();

    await emailField.fill('testCorrect@mail.ru');
    await emailField.blur(); // Триггерим валидацию
    await expect(errorFeedback).toBeHidden();
  });
});

test.describe('Заполнение специальных типов полей', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/action_fill');
  });

  // Тест 1: Заполнение textarea
  test('Заполнение многострочного текста', async ({ page }) => {
    const bioField = page.getByLabel('Краткая биография');
    const longText = 'Меня зовут Иван.\nЯ работаю тестировщиком.\nЛюблю автоматизацию.';

    await bioField.fill(longText);
    await expect(bioField).toHaveValue(longText);
  });

  // Тест 2: Заполнение числового поля
  test('Заполнение числового поля', async ({ page }) => {
    const ageField = page.getByLabel('Возраст');

    await ageField.fill('30');
    await expect(ageField).toHaveValue('30');
  });
});

test.describe('Валидация и сложные сценарии заполнения', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/action_fill');
  });

  // Тест 1: Заполнение с проверкой паттерна
  test('Валидация телефона по паттерну', async ({ page }) => {
    const phoneField = page.getByLabel('Телефон');
    const errorFeedback = page.getByText('Требуется 10 цифр');

    await phoneField.fill('123456789');
    await expect(errorFeedback).toBeVisible();

    await phoneField.fill('0123456789');
    await expect(errorFeedback).toBeHidden();
  });

  // Тест 2: Постепенное заполнение с clear()
  test('Постепенное заполнение с очисткой', async ({ page }) => {
    const cardField = page.getByLabel('Кредитная карта');

    await cardField.fill('1234');
    await expect(cardField).toHaveValue('1234');

    await cardField.clear();
    await expect(cardField).toHaveValue('');

    await cardField.fill('1234 5678 9012 3456');
    await expect(cardField).toHaveValue('1234 5678 9012 3456');
  });
});
