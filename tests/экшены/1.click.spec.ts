import { test, expect } from '@playwright/test';

test.describe('Базовые действия с кликами', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/action_click');
  });

  // Тест 1: Проверка обычного клика по кнопке
  // 1. Найти кнопку по тексту "Кликни меня" используя getByText
  // 2. Выполнить клик методом click()
  // 3. Проверить что счетчик кликов увеличился
  // 4. Повторить клики и проверки
  test('Обычный клик по кнопке увеличивает счетчик', async ({ page }) => {
    const button = page.getByText('Кликни меня', { exact: true });
    await button.click();
    await expect(page.getByText('Результат: 1 кликов')).toBeVisible();

    await button.click();
    await button.click();
    await expect(page.getByText('Результат: 3 кликов')).toBeVisible();
  });

  // Тест 2: Проверка двойного клика
  // 1. Найти область для двойного клика по test-id (если бы он был) или по тексту
  // 2. Выполнить двойной клик методом dblclick()
  // 3. Проверить что счетчик двойных кликов увеличился
  // 4. Повторить для проверки инкремента
  test('Двойной клик увеличивает специальный счетчик', async ({ page }) => {
    const dblClickArea = page.locator('#dblclick-area'); // Локатор для счетчика
    await dblClickArea.dblclick();
    await expect(dblClickArea).toContainText('1');
  });
});

test.describe('Действия с правой кнопкой мыши', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/action_click');
  });

  // Тест 1: Проверка контекстного меню
  // 1. Найти область для правого клика по тексту
  // 2. Выполнить правый клик с параметром { button: 'right' }
  // 3. Проверить появление меню по visibility
  // 4. Кликнуть на пункт меню "Копировать"
  // 5. Проверить текст подтверждения
  test('Правый клик открывает контекстное меню', async ({ page }) => {
    const rightClickArea = page.getByText('Кликни правой кнопкой');
    await rightClickArea.click({ button: 'right' });

    const contextMenu = page.getByText('Копировать').first();
    await expect(contextMenu).toBeVisible();

    await contextMenu.click();
    await expect(page.getByText('Выбрано: Копировать')).toBeVisible();
  });

  // Тест 2: Проверка позиции контекстного меню
  // 1. Найти область для правого клика
  // 2. Получить координаты элемента
  // 3. Кликнуть в центре элемента правой кнопкой
  // 4. Проверить что меню появилось
  test('Контекстное меню появляется в месте клика', async ({ page }) => {
    const rightClickArea = page.getByText('Кликни правой кнопкой');
    const box = await rightClickArea.boundingBox();
    if (box) {
      await rightClickArea.click({
        button: 'right',
        position: {
          x: box.width / 2,
          y: box.height / 2,
        },
      });
    }
    await expect(page.getByText('Копировать').first()).toBeVisible();
  });
});

test.describe('Продвинутые техники кликов', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/action_click');
  });

  // Тест 1: Клик по координатам с проверкой позиции
  // 1. Найти область для клика по тексту
  // 2. Кликнуть в конкретных координатах (50, 100)
  // 3. Проверить что координаты зарегистрированы
  test('Клик в конкретных координатах регистрирует позицию', async ({ page }) => {
    const clickArea = page.getByText('Кликни в любом месте');
    await clickArea.click({ position: {
      x: 50,
      y: 100
      }
    });

    await expect(page.getByText(/Позиция?/)).toHaveText(/^Позиция: \(\d+, \d+\)$/);
  });

  // Тест 2: Удержание кнопки
  // 1. Найти кнопку по тексту
  // 2. Имитировать событие mousedown
  // 3. Проверить изменение статуса
  // 4. Имитировать mouseup после задержки
  // 5. Проверить обновление статуса
  test('Удержание кнопки изменяет статус', async ({ page }) => {
    const holdButton = page.getByText('Удерживай меня');

    await holdButton.dispatchEvent('mousedown');
    await expect(page.getByText('Статус: нажата')).toBeVisible();

    await page.waitForTimeout(1000);
    await holdButton.dispatchEvent('mouseup');
    await expect(page.getByText('Статус: отпущена')).toBeVisible();
  });
});
