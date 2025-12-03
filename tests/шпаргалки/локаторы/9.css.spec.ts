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
    const submitButton = page.locator('#registration-form > .btn.submit-btn:not([disabled])');
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
    const dynamicButton = page.locator(
      '#dynamic-content .btn.disabled:has-text("Недоступно"):not([type="submit"])',
    );
    await expect(dynamicButton).toBeVisible({ timeout: 2000 });

    // 2. Найти динамический товар, который:
    //    - Цена меньше 10 000 ₽
    //    - Не является рекомендуемым (featured)
    const cheapProduct = page.locator(
      '#dynamic-content .product-card:not(.featured) .price-value:has-text("9")',
    );
    await expect(cheapProduct).toHaveText('9 999');
  });

  test('Комбинации с :has и :not', async ({ page }) => {
    // 1. Найти все карточки, которые:
    //    - Не имеют класс sold-out
    //    - Содержат кнопку с текстом "В корзину"
    const availableProducts = page.locator(
      '.product-card:not(.sold-out):has(.btn:has-text("В корзину"))',
    );
    await expect(availableProducts).toHaveCount(2);

    // 2. Найти ячейки таблицы, которые:
    //    - В строках с активными пользователями
    //    - Не являются ячейками с email
    const activeUserCells = page.locator(
      '#user-table tr:has(.status-active) td:not(:nth-child(3))',
    );
    await expect(activeUserCells).toHaveCount(3); // ID, Имя, Статус
  });
});
