import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://osstep.github.io/assertion_tohavevalue');
});

test('1. Проверка начальных значений полей', async ({ page }) => {
  // Задание: Проверить начальные значения всех полей формы
  // 1. Найти поле "Имя пользователя" по лейблу и проверить значение "Гость"
  // 2. Найти поле "Электронная почта" и проверить что оно пустое
  // 3. Найти поле "Телефон" и проверить значение "+7"
  // 4. Найти поле "Комментарии" и проверить что оно пустое
  // 5. Найти выпадающий список "Страна" и проверить значение "ru"

  await expect(page.getByLabel('Имя пользователя:')).toHaveValue('Гость');
  await expect(page.getByLabel('Электронная почта:')).toHaveValue('');
  await expect(page.getByLabel('Телефон:')).toHaveValue('+7');
  await expect(page.getByLabel('Комментарии:')).toHaveValue('');
  await expect(page.getByLabel('Страна:')).toHaveValue('ru');
});

test('2. Проверка изменения значений полей', async ({ page }) => {
  // Задание: Проверить обновление значений полей
  // 1. Заполнить поле "Имя пользователя" значением "Алексей"
  // 2. Заполнить поле "Электронная почта" значением "alex@example.com"
  // 3. Заполнить поле "Телефон" значением "+7 (123) 456-78-90"
  // 4. Заполнить поле "Комментарии" значением "Тестовый комментарий"
  // 5. Выбрать в списке "Страна" значение "Казахстан" (kz)
  // 6. Проверить что все поля содержат новые значения

  await page.getByLabel('Имя пользователя:').fill('Алексей');
  await page.getByLabel('Электронная почта:').fill('alex@example.com');
  await page.getByLabel('Телефон:').fill('+7 (123) 456-78-90');
  await page.getByLabel('Комментарии:').fill('Тестовый комментарий');
  await page.getByLabel('Страна:').selectOption('kz');

  await expect(page.getByLabel('Имя пользователя:')).toHaveValue('Алексей');
  await expect(page.getByLabel('Электронная почта:')).toHaveValue('alex@example.com');
  await expect(page.getByLabel('Телефон:')).toHaveValue('+7 (123) 456-78-90');
  await expect(page.getByLabel('Комментарии:')).toHaveValue('Тестовый комментарий');
  await expect(page.getByLabel('Страна:')).toHaveValue('kz');
});

test('3. Проверка сброса формы', async ({ page }) => {
  // Задание: Проверить сброс значений формы к начальным
  // 1. Изменить поле "Имя пользователя" на "Петр"
  // 2. Изменить поле "Электронная почта" на "test@test.ru"
  // 3. Выбрать в списке "Страна" значение "Беларусь" (by)
  // 4. Нажать кнопку "Сбросить"
  // 5. Проверить что поле "Имя пользователя" содержит "Гость"
  // 6. Проверить что поле "Электронная почта" пустое
  // 7. Проверить что поле "Телефон" содержит "+7"
  // 8. Проверить что список "Страна" содержит значение "ru"

  await page.getByLabel('Имя пользователя:').fill('Петр');
  await page.getByLabel('Электронная почта:').fill('test@test.ru');
  await page.getByLabel('Страна:').selectOption('by');

  await page.getByRole('button', { name: 'Сбросить' }).click();

  await expect(page.getByLabel('Имя пользователя:')).toHaveValue('Гость');
  await expect(page.getByLabel('Электронная почта:')).toHaveValue('');
  await expect(page.getByLabel('Телефон:')).toHaveValue('+7');
  await expect(page.getByLabel('Страна:')).toHaveValue('ru');
});

test('4. Проверка обновления данных', async ({ page }) => {
  // Задание: Проверить отображение введенных данных
  // 1. Заполнить поле "Имя пользователя" значением "Мария"
  // 2. Заполнить поле "Электронная почта" значением "maria@mail.ru"
  // 3. Заполнить поле "Комментарии" значением "Важный комментарий"
  // 4. Нажать кнопку "Обновить данные"
  // 5. Проверить что в блоке вывода содержится текст с введенными данными

  await page.getByLabel('Имя пользователя:').fill('Мария');
  await page.getByLabel('Электронная почта:').fill('maria@mail.ru');
  await page.getByLabel('Комментарии:').fill('Важный комментарий');

  await page.getByRole('button', { name: 'Обновить данные' }).click();

  const output = await page.locator('#output').textContent();
  expect(output).toContain('Мария');
  expect(output).toContain('maria@mail.ru');
  expect(output).toContain('Важный комментарий');
});

test('5. Проверка пустых значений', async ({ page }) => {
  // Задание: Проверить обработку пустых значений
  // 1. Очистить поле "Имя пользователя"
  // 2. Очистить поле "Телефон"
  // 3. Выбрать пустое значение в списке "Страна"
  // 4. Проверить что поле "Имя пользователя" пустое
  // 5. Проверить что поле "Телефон" пустое
  // 6. Проверить что список "Страна" содержит пустое значение
  // 7. Проверить что изначально пустое поле "Электронная почта" осталось пустым

  await page.getByLabel('Имя пользователя:').fill('');
  await page.getByLabel('Телефон:').fill('');
  await page.getByLabel('Страна:').selectOption('');

  await expect(page.getByLabel('Имя пользователя:')).toHaveValue('');
  await expect(page.getByLabel('Телефон:')).toHaveValue('');
  await expect(page.getByLabel('Страна:')).toHaveValue('');
  await expect(page.getByLabel('Электронная почта:')).toHaveValue('');
});
