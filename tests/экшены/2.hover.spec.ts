import { test, expect } from '@playwright/test';

test.describe('Базовые hover-эффекты', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/action_hover');
  });

  // Тест 1: Проверка логгирования hover событий
  // 1. Навести курсор на элемент
  // 2. Проверить что событие залогировано
  // 3. Убрать курсор
  // 4. Проверить что событие ухода также залогировано
  test('Hover события логируются', async ({ page }) => {
    const hoverBox = page.getByText('Наведи на меня');

    await hoverBox.hover();
    await expect(page.locator('#hover-log')).toContainText('Наведение на простой блок');

    await page.mouse.move(0, 0);
    await expect(page.locator('#hover-log')).toContainText('Уход с простого блока');
  });
});

test.describe('Всплывающие подсказки', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/action_hover');
  });

  // Тест 1: Проверка появления подсказки
  // 1. Найти элемент с подсказкой по тексту
  // 2. Проверить что подсказка изначально не видима
  // 3. Выполнить hover на элементе
  // 4. Проверить что подсказка стала видимой
  // 5. Проверить текст подсказки
  test('Подсказка появляется при hover', async ({ page }) => {
    const tooltipTrigger = page.getByText('Наведи чтобы увидеть подсказку');
    const tooltip = page.getByText('Это текст подсказки');

    // Проверяем что подсказка изначально скрыта
    await expect(tooltip).toBeHidden();

    // Наводим курсор
    await tooltipTrigger.hover();

    // Проверяем появление подсказки
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toHaveText('Это текст подсказки');
  });

  // Тест 2: Проверка позиционирования подсказки
  // 1. Найти элемент с подсказкой
  // 2. Получить его координаты
  // 3. Выполнить hover
  // 4. Проверить что подсказка появляется над элементом
  test('Подсказка правильно позиционируется', async ({ page }) => {
    const tooltipTrigger = page.getByText('Наведи чтобы увидеть подсказку');
    const tooltip = page.getByText('Это текст подсказки');

    const box = await tooltipTrigger.boundingBox();
    await tooltipTrigger.hover();

    const tooltipBox = await tooltip.boundingBox();
    if (tooltipBox && box) {
      // Проверяем что подсказка выше основного элемента
      expect(tooltipBox.y).toBeLessThan(box.y);

      // Проверяем центрирование по горизонтали
      expect(Math.abs(tooltipBox.x + tooltipBox.width / 2 - (box.x + box.width / 2))).toBeLessThan(
        2,
      );
    }
  });
});

test.describe('Выпадающие меню', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/action_hover');
  });

  // Тест 1: Проверка открытия подменю
  // 1. Найти пункт меню по тексту "Меню 1"
  // 2. Проверить что подменю изначально скрыто
  // 3. Выполнить hover на пункте меню
  // 4. Проверить что подменю стало видимым
  // 5. Проверить наличие всех пунктов подменю
  test('Hover открывает подменю', async ({ page }) => {
    const menuItem = page.getByText('Меню 1 Подменю 1.1 Подменю');
    const submenu = page.getByText('Подменю 1.1');

    // Проверяем что подменю скрыто
    await expect(submenu).toBeHidden();

    // Наводим курсор
    await menuItem.hover();

    // Проверяем что подменю появилось
    await expect(submenu).toBeVisible();
    await expect(page.getByText('Подменю 1.2')).toBeVisible();
  });

  // Тест 2: Проверка перехода между меню
  // 1. Навести курсор на "Меню 1" и проверить подменю
  // 2. Переместить курсор на "Меню 2"
  // 3. Проверить что подменю "Меню 1" скрылось
  // 4. Проверить что подменю "Меню 2" появилось
  test('Переход между пунктами меню', async ({ page }) => {
    const menuItem1 = page.getByText('Меню 1 Подменю 1.1 Подменю');
    const menuItem2 = page.getByText('Меню 2 Подменю');
    const submenu1 = page.getByText('Подменю 1.1');
    const submenu2 = page.getByText('Подменю 2.1');

    // Наводим на первое меню
    await menuItem1.hover();
    await expect(submenu1).toBeVisible();

    // Переходим на второе меню
    await menuItem2.hover();
    await expect(submenu1).toBeHidden();
    await expect(submenu2).toBeVisible();
  });
});
