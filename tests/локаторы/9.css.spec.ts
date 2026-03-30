import { test, expect } from '@playwright/test';

test.describe('Продвинутые CSS-селекторы', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_css');
  });

  test('Комбинированные условия поиска', async ({ page }) => {
    // 1. Найти карточку товара, которая:
    //    - Имеет класс featured
    //    - Содержит текст "Смартфон"
    //    - Цена меньше 50 000 ₽
    const featuredSmartphone = page.locator(
      '.product-card.featured:has-text("Смартфон") .price-value',
    );
    await expect(featuredSmartphone).toHaveText('49 999');

    // 2. Найти кнопку в форме, которая:
    //    - Является прямой дочерней элементом формы
    //    - Имеет класс btn и submit-btn
    //    - Не disabled
    const submitButton = page.locator('[data-todo="submitButton"]'); // TODO(student): замените на корректный локатор
      await expect(submitButton).toBeEnabled();
  });
});

test.describe('Динамический контент с условиями', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_css');
  });

  test('Фильтрация динамических элементов', async ({ page }) => {
    // 1. Дождаться появления динамической кнопки, которая:
    //    - Имеет класс disabled
    //    - Содержит текст "Недоступно"
    //    - Не имеет атрибута type="submit"
    const dynamicButton = page.locator('[data-todo="dynamicButton"]'); // TODO(student): замените на корректный локатор
      await expect(dynamicButton).toBeVisible({ timeout: 2000 });

    // 2. Найти динамический товар, который:
    //    - Цена меньше 10 000 ₽
    //    - Не является рекомендуемым (featured)
    const cheapProduct = page.locator('[data-todo="cheapProduct"]'); // TODO(student): замените на корректный локатор
      await expect(cheapProduct).toHaveText('9 999');
  });

  test('Комбинации с :has и :not', async ({ page }) => {
    // 1. Найти все карточки, которые:
    //    - Не имеют класс sold-out
    //    - Содержат кнопку с текстом "В корзину"
    const availableProducts = page.locator('[data-todo="availableProducts"]'); // TODO(student): замените на корректный локатор
      await expect(availableProducts).toHaveCount(2);

    // 2. Найти ячейки таблицы, которые:
    //    - В строках с активными пользователями
    //    - Не являются ячейками с email
    const activeUserCells = page.locator('[data-todo="activeUserCells"]'); // TODO(student): замените на корректный локатор
      await expect(activeUserCells).toHaveCount(3); // ID, Имя, Статус
  });
});
