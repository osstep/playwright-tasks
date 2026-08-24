import { test, expect } from '@playwright/test';

test.describe('Поиск элементов по роли "button"', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_getbyrole');
  });

  // Задание 1: Найди кнопку "Основное действие" используя getByRole с указанием роли и текста
  // После нахождения кнопки проверь что она видима и имеет класс primary-btn
  test('Найти основную кнопку по роли и тексту', async ({ page }) => {
    const primaryButton = page.getByRole('button', { name: 'Основное действие' });
    await expect(primaryButton).toBeVisible();
    await expect(primaryButton).toHaveClass(/primary-btn/);
  });

  // Задание 2: Найди неактивную кнопку используя getByRole с указанием disabled состояния
  // Проверь что кнопка видима и действительно disabled
  test('Найти неактивную кнопку по роли и состоянию', async ({ page }) => {
    const disabledButton = page.getByRole('button', {
      name: 'Неактивная кнопка',
      disabled: true,
    });
    await expect(disabledButton).toBeVisible();
    await expect(disabledButton).toBeDisabled();
  });

  // Задание 3: Найди элемент div с ролью button (не настоящую кнопку)
  // Проверь что элемент видим и содержит текст "Div как кнопка"
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

  // Задание 1: Найди поле "Имя пользователя" по роли textbox и связанному label
  // Заполни поле текстом "тестовый_пользователь" и проверь значение
  test('Найти поля формы по их ролям', async ({ page }) => {
    const usernameInput = page.getByRole('textbox', { name: 'Имя пользователя' });
    await expect(usernameInput).toBeVisible();
    await usernameInput.fill('testik');
    await expect(usernameInput).toHaveValue('testik');
  });

  // Задание 2: Найди чекбокс "Подписаться на рассылку" по роли checkbox
  // Проверь что он не выбран, затем выбери его и проверь снова
  test('Найти чекбоксы по роли checkbox', async ({ page }) => {
    const newsletterCheckbox = page.getByRole('checkbox', { name: 'Подписаться на рассылку' });
    await expect(newsletterCheckbox).toBeVisible();
    await expect(newsletterCheckbox).not.toBeChecked();
    await newsletterCheckbox.check();
    await expect(newsletterCheckbox).toBeChecked();
  });

  // Задание 3: Заполни форму и отправь её:
  // 1. Найди и заполни поле имени
  // 2. Найди и заполни поле пароля
  // 3. Найди и выбери страну из выпадающего списка
  // 4. Найди и нажми кнопку отправки
  test('Заполнить и отправить форму', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Имя пользователя' }).fill('тест');
    await page.getByRole('textbox', { name: 'Пароль' }).fill('пароль123');
    await page.getByRole('combobox', { name: 'Страна' }).selectOption('ru');
    await page.getByRole('button', { name: 'Отправить' }).click();
  });
});

test.describe('Поиск вкладок и уведомлений по ролям', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_getbyrole');
  });

  // Задание 1: Работа с вкладками
  // 1. Найди вкладку "Настройки" по роли tab
  // 2. Проверь что она не выбрана (aria-selected="false")
  // 3. Кликни на вкладку
  // 4. Проверь что она стала выбранной
  // 5. Найди содержимое вкладки по роли tabpanel и проверь его видимость
  test('Переключение между вкладками', async ({ page }) => {
    const settingsTab = page.getByRole('tab', { name: 'Настройки' });
    await expect(settingsTab).toHaveAttribute('aria-selected', 'false');
    await settingsTab.click();
    await expect(settingsTab).toHaveAttribute('aria-selected', 'true');
  });

  // Задание 2: Проверка уведомлений
  // 1. Найди все уведомления на странице по роли alert
  // 2. Отфильтруй уведомление с текстом "Успех!"
  // 3. Проверь что оно видимо и имеет класс alert-success
  test('Проверить уведомления на странице', async ({ page }) => {
    const successAlert = page.getByRole('alert').filter({ hasText: 'Успех!' });
    await expect(successAlert).toBeVisible();
    await expect(successAlert).toHaveClass(/alert-success/);
  });
});
