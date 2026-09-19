import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://osstep.github.io/assertion_tohavetext');
});

test('1. Проверка точного соответствия текста', async ({ page }) => {
  const exactText = page.locator('#exact-text');

  await expect(exactText).toHaveText('This text must match exactly, including punctuation! (100%)');
  await expect(exactText).not.toHaveText(
    'THIS text must match exactly, including punctuation! (100%)',
  );
});

test('2. Проверка работы счетчика', async ({ page }) => {
  const counterElement = page.locator('#counter');
  const incrementButton = page.locator('#increment');
  const resetButton = page.locator('#reset');

  await expect(counterElement).toHaveText('0');
  await incrementButton.click();
  await expect(counterElement).toHaveText('1');

  await resetButton.click();
  await expect(counterElement).toHaveText('0');
});

test('3. Проверка карточки пользователя', async ({ page }) => {
  const username = page.locator('#username');
  const userEemail = page.locator('#user-email');
  const userStatus = page.locator('#user-status');
  const activateUserButton = page.locator('#activate-user');

  await expect(username).toHaveText('user_guest');
  await expect(userEemail).toHaveText('guest@example.com');
  await expect(userStatus).toHaveText('Inactive');

  await activateUserButton.click();

  await expect(username).toHaveText('user_active');
  await expect(userEemail).toHaveText('active.user@example.com');
  await expect(userStatus).toHaveText('Active');
});

test('4. Проверка форматированного текста', async ({ page }) => {
  const formattedText = page.locator('#formatted-text');
  await expect(formattedText).toHaveText(
    'Text   with   extra   spaces   and\n        line\n        breaks',
  );
});

test('5. Проверка динамического списка', async ({ page }) => {
  const itemsList = page.locator('#items-list');
  const addItemButton = page.locator('#add-item');
  const clearListButton = page.locator('#clear-list');

  await expect(itemsList).toHaveText('First item\nSecond item');

  await addItemButton.click();
  await expect(itemsList).toHaveText('First item\nSecond item\nItem 3');

  await clearListButton.click();
  await expect(itemsList).toHaveText('Empty list');
});
