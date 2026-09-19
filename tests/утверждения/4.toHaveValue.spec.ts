import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://osstep.github.io/assertion_tohavevalue');
});

test('1. Проверка начальных значений полей', async ({ page }) => {
  const userName = page.getByLabel('Имя пользователя');
  const email = page.getByLabel('Электронная почта');
  const phone = page.getByLabel('Телефон');
  const comment = page.getByLabel('Комментарии');
  const area = page.getByLabel('Страна');

  await expect(userName).toHaveValue('Гость');
  await expect(email).toHaveValue('');
  await expect(phone).toHaveValue('+7');
  await expect(comment).toHaveValue('');
  await expect(area).toHaveValue('ru');
});

test('2. Проверка изменения значений полей', async ({ page }) => {
  const userName = page.getByLabel('Имя пользователя');
  const email = page.getByLabel('Электронная почта');
  const phone = page.getByLabel('Телефон');
  const comment = page.getByLabel('Комментарии');
  const area = page.getByLabel('Страна');

  await userName.fill('Алексей');
  await email.fill('alex@example.com');
  await phone.fill('+7 (123) 456-78-90');
  await comment.fill('Тестовый комментарий');
  await area.selectOption('kz');

  await expect(userName).toHaveValue('Алексей');
  await expect(email).toHaveValue('alex@example.com');
  await expect(phone).toHaveValue('+7 (123) 456-78-90');
  await expect(comment).toHaveValue('Тестовый комментарий');
  await expect(area).toHaveValue('kz');
});

test('3. Проверка сброса формы', async ({ page }) => {
  const userName = page.getByLabel('Имя пользователя');
  const email = page.getByLabel('Электронная почта');
  const phone = page.getByLabel('Телефон');
  const comment = page.getByLabel('Комментарии');
  const area = page.getByLabel('Страна');
  const resetButton = page.getByRole('button', { name: 'Сбросить' });

  await userName.fill('Петр');
  await email.fill('test@test.ru');
  await phone.fill('+7 (123) 456-78-90');
  await comment.fill('dasdasd');
  await area.selectOption('ru');

  await resetButton.click();

  await expect(userName).toHaveValue('Гость');
  await expect(email).toHaveValue('');
  await expect(phone).toHaveValue('+7');
  await expect(comment).toHaveValue('');
  await expect(area).toHaveValue('ru');
});

test('4. Проверка обновления данных', async ({ page }) => {
  const userName = page.getByLabel('Имя пользователя');
  const email = page.getByLabel('Электронная почта');
  const comment = page.getByLabel('Комментарии');
  const updateDataButton = page.getByRole('button', { name: 'Обновить данные' });
  const output = page.locator('.output');

  await userName.fill('Мария');
  await email.fill('maria@mail.ru');
  await comment.fill('Важный комментарий');

  await updateDataButton.click();

  await expect(output).toContainText('Мария');
  await expect(output).toContainText('maria@mail.ru');
  await expect(output).toContainText('Важный комментарий');
});

test('5. Проверка пустых значений', async ({ page }) => {
  const userName = page.getByLabel('Имя пользователя');
  const phone = page.getByLabel('Телефон');
  const email = page.getByLabel('Электронная почта');
  const comment = page.getByLabel('Комментарии');
  const area = page.getByLabel('Страна');

  await userName.clear();
  await phone.clear();
  await area.selectOption('');

  await expect(userName).toHaveValue('');
  await expect(phone).toHaveValue('');
  await expect(area).toHaveValue('');
  await expect(email).toHaveValue('');
  await expect(comment).toHaveValue('');
});
