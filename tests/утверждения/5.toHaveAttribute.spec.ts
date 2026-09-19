import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://osstep.github.io/assertion_tohaveattribute');
});

test('1. Проверка атрибутов основной кнопки', async ({ page }) => {
  const sendButton = page.getByRole('button', { name: 'Отправить' });
  const switchButton = page.getByRole('button', { name: 'Переключить атрибуты' });

  await expect(sendButton).toHaveAttribute('data-action', 'submit');
  await expect(sendButton).toHaveAttribute('title', 'Основная кнопка');

  await switchButton.click();

  await expect(sendButton).toHaveAttribute('data-action', 'cancel');
  await expect(sendButton).toHaveAttribute('title', 'Отмена действия');
});

test('2. Проверка отключения кнопки', async ({ page }) => {
  const sendButton = page.getByRole('button', { name: 'Отправить' });
  const offButton = page.getByRole('button', { name: 'Отключить кнопку' });

  await expect(sendButton).not.toHaveAttribute('disabled');

  await offButton.click();
  await expect(sendButton).toHaveAttribute('disabled');
  await expect(sendButton).toHaveAttribute('disabled', '');

  await offButton.click();
  await expect(sendButton).not.toHaveAttribute('disabled');
});

test('3. Проверка атрибутов изображения', async ({ page }) => {
  const image = page.getByAltText('Аватар пользователя');

  await expect(image).toHaveAttribute('src', 'user.jpg');
  await expect(image).toHaveAttribute('alt', 'Аватар пользователя');
  await expect(image).toHaveAttribute('width', '200');
});

test('4. Проверка атрибутов формы', async ({ page }) => {
  const userName = page.locator('#username');
  const email = page.locator('#email');
  const activateButton = page.getByRole('button', { name: 'Активировать email' });

  await expect(userName).toHaveAttribute('required');
  await expect(userName).toHaveAttribute('minlength', '3');
  await expect(email).toHaveAttribute('disabled');

  await activateButton.click();

  await expect(email).not.toHaveAttribute('disabled');
  await expect(email).toHaveAttribute('placeholder', 'Введите ваш email');
});

test('5. Проверка data-атрибутов', async ({ page }) => {
  const container = page.getByText('Контейнер с data-атрибутами');
  const updateButton = page.getByRole('button', { name: 'Обновить data-атрибуты' });

  await expect(container).toHaveAttribute('data-role', 'container');
  await expect(container).toHaveAttribute('data-visible', 'true');
  await expect(container).toHaveAttribute('data-user-id', '12345');

  await updateButton.click();
  await expect(container).toHaveAttribute('data-role', 'container');
  await expect(container).toHaveAttribute('data-visible', 'false');
  await expect(container).not.toHaveAttribute('data-user-id', '12345');

  await updateButton.click();
  await expect(container).toHaveAttribute('data-visible', 'true');
});
