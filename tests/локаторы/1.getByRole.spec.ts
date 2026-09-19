import { test, expect } from '@playwright/test';

test.describe('Поиск элементов по роли "button"', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_getbyrole');
  });

  test('Найти основную кнопку по роли и тексту', async ({ page }) => {
    const primaryButton = page.getByRole('button', { name: 'Основное действие' });
    await page.getByRole('button', { name: 'Основное действие' }).click();
    await expect(primaryButton).toBeVisible();
    await expect(primaryButton).toHaveClass(/primary-btn/);
  });

  test('Найти неактивную кнопку по роли и состоянию', async ({ page }) => {
    const disabledButton = page.getByRole('button', { name: 'Неактивная кнопка', disabled: true });
    await expect(disabledButton).toBeVisible();
    await expect(disabledButton).toBeDisabled();
  });

  test('Найти div с ролью кнопки', async ({ page }) => {
    const divButton = page.getByRole('button', { name: 'Div как кнопка' });
    await expect(divButton).toBeVisible();
    await expect(divButton).toHaveText('Div как кнопка');
  });
});

test.describe('Поиск элементов форм по ролям', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_getbyrole');
  });

  test('Найти поля формы по их ролям', async ({ page }) => {
    const usernameInput = page.getByRole('textbox', { name: 'Имя пользователя' });
    await expect(usernameInput).toBeVisible();
    await usernameInput.fill('тестовый_пользователь');
    await expect(usernameInput).toHaveValue('тестовый_пользователь');
  });

  test('Найти чекбоксы по роли checkbox', async ({ page }) => {
    const newsletterCheckbox = page.getByRole('checkbox', {
      name: 'Подписаться на рассылку',
    });
    await expect(newsletterCheckbox).toBeVisible();
    await expect(newsletterCheckbox).not.toBeChecked();
    await newsletterCheckbox.check();
    await expect(newsletterCheckbox).toBeChecked();
  });

  test('Заполнить и отправить форму', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Имя пользователя' }).fill('userName');
    await page.getByRole('textbox', { name: 'Пароль' }).fill('password');
    await page.getByRole('combobox', { name: 'Страна' }).selectOption('ru');
    await page.getByRole('button', { name: 'Отправить' }).click();
  });
});

test.describe('Поиск вкладок и уведомлений по ролям', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_getbyrole');
  });

  test('Переключение между вкладками', async ({ page }) => {
    const settingsTab = page.getByRole('tab', { name: 'Настройки' });
    await expect(settingsTab).toHaveAttribute('aria-selected', 'false');
    await settingsTab.click();
    await expect(settingsTab).toHaveAttribute('aria-selected', 'true');
    const settingsPanel = page.getByRole('tabpanel');
    await expect(settingsPanel).toBeVisible();
  });

  test('Проверить уведомления на странице', async ({ page }) => {
    const successAlert = page.getByRole('alert').filter({ hasText: 'Успех!' });
    await expect(successAlert).toBeVisible();
    await expect(successAlert).toHaveClass(/alert-success/);
  });
});
