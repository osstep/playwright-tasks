import { test, expect } from '@playwright/test';

test.describe('Базовые тесты для getByLabel()', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_getbylabel');
  });

  test('Найти текстовое поле по label', async ({ page }) => {
    const username = page.getByLabel('Имя пользователя');
    await username.fill('test_user');
    await expect(username).toHaveValue('test_user');
  });

  test('Найти email поле по label', async ({ page }) => {
    const email = page.getByLabel('Электронная почта');
    await expect(email).toHaveAttribute('placeholder', 'example@mail.com');
  });
});

test.describe('Тесты для чекбоксов и радиокнопок', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_getbylabel');
  });

  test('Работа с чекбоксами', async ({ page }) => {
    const musicCheckbox = page.getByLabel('Музыка');
    await expect(musicCheckbox).toBeChecked();
    await musicCheckbox.uncheck();
    await expect(musicCheckbox).not.toBeChecked();
  });

  test('Работа с радиокнопками', async ({ page }) => {
    const femaleRadio = page.getByLabel('Женский');
    await expect(femaleRadio).toBeChecked();

    await page.getByLabel('Мужской').check();
    await expect(femaleRadio).not.toBeChecked();
  });
});

test.describe('Сложные случаи для getByLabel()', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_getbylabel');
  });

  test('Найти поле по тексту внутри label', async ({ page }) => {
    const phone = page.getByLabel('Телефон');
    await expect(phone).toHaveAttribute('placeholder', '+7 (XXX) XXX-XX-XX');
  });

  test('Найти элемент с aria-labelledby', async ({ page }) => {
    const address = page.getByLabel('Адрес доставки');
    await expect(address).toBeVisible();
  });

  test('Найти элемент c скрытым label', async ({ page }) => {
    const search = page.getByLabel('Поиск');
    await expect(search).toHaveAttribute('placeholder', 'Поиск...');
  });
});
