import { test, expect } from '@playwright/test';

test.describe('Работа с базовыми чекбоксами', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/action_check');
  });

  // Тест 1: Проверка и снятие отметки с чекбокса
  test('Изменение состояния чекбокса', async ({ page }) => {
    const newsletterCheckbox = page.getByLabel('Подписаться на рассылку');
    const status = page.locator('#newsletter-status');

    await expect(newsletterCheckbox).not.toBeChecked();
    await newsletterCheckbox.check();
    await await expect(newsletterCheckbox).toBeChecked();
    await expect(status).toHaveText('Подписаны');
    await expect(status).toHaveClass(/checked/);

    await newsletterCheckbox.uncheck();
    await expect(newsletterCheckbox).not.toBeChecked();
    await expect(status).toHaveText('Не подписаны');
  });

  // Тест 2: Проверка обязательного чекбокса
  test('Работа с обязательным чекбоксом', async ({ page }) => {
    const termsCheckbox = page.getByLabel('Я принимаю условия соглашения');

    await expect(termsCheckbox).toHaveAttribute('required', '');
    await termsCheckbox.check();
    await expect(termsCheckbox).toBeChecked();
  });
});

test.describe('Сложные сценарии работы с check()', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/action_check');
  });

  // Тест 1: Работа с кастомными элементами
  test('Работа с кастомным чекбоксом после скролла', async ({ page }) => {
    const agreeCheckbox = page.getByLabel('Я прочитал и согласен с условиями');
    const tosContainer = page.locator('.tos-container');

    await tosContainer.scrollIntoViewIfNeeded();
    await agreeCheckbox.check();
    await expect(agreeCheckbox).toBeChecked();
  });

  // Тест 2: Динамически добавляемые чекбоксы
  test('Работа с динамически добавленными чекбоксами', async ({ page }) => {
    const dynamicCheckbox1 = page.getByLabel('Динамический чекбокс 1');
    const dynamicCheckbox2 = page.getByLabel('Динамический чекбокс 2');

    await expect(dynamicCheckbox1).toBeVisible({ timeout: 2000 });
    await expect(dynamicCheckbox2).toBeChecked();

    await dynamicCheckbox1.check();
    await expect(dynamicCheckbox1).toBeChecked();
    await expect(dynamicCheckbox2).toBeChecked();
  });
});

test.describe('Комплексное тестирование формы с чекбоксами', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/action_check');
  });

  // Тест: Полное заполнение формы
  test('Полное заполнение формы с проверкой состояний', async ({ page }) => {
    // Чекбоксы
    const checkBoxMailing = page.getByLabel('Подписаться на рассылку');
    const checkBoxAgreement = page.getByLabel('Я принимаю условия соглашения');
    const checkBoxInteresSport = page.getByLabel('Спорт');
    const checkBoxInteresKino = page.getByLabel('Кино');
    const checkBoxInteresMusic = page.getByLabel('Музыка');
    const checkBoxdelivery = page.getByLabel('Почта России');
    const checkBoxConditionsUse = page.getByLabel('Я прочитал и согласен с условиями');

    await checkBoxMailing.check();
    await checkBoxAgreement.check();

    await checkBoxInteresSport.check();
    await checkBoxInteresKino.check();
    await checkBoxInteresMusic.uncheck();

    await checkBoxdelivery.check();

    // Кастомный элемент
    await page.locator('.tos-container').scrollIntoViewIfNeeded();
    await checkBoxConditionsUse.check();

    await expect(page.getByLabel('Подписаться на рассылку')).toBeChecked();
    await expect(page.getByLabel('Почта России')).toBeChecked();
    await expect(page.getByLabel('Спорт')).toBeChecked();
    await expect(page.getByLabel('Музыка')).not.toBeChecked();
  });
});
