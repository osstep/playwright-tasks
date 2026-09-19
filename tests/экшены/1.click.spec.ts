import { test, expect } from '@playwright/test';

test.describe('Базовые действия с кликами', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/action_click');
  });

  // Тест 1: Проверка обычного клика по кнопке
  test('Обычный клик по кнопке увеличивает счетчик', async ({ page }) => {
    const button = page.getByText('Кликни меня', { exact: true });
    await button.click();
    await expect(page.getByText('Результат: 1 кликов')).toBeVisible();
    await button.click();
    await button.click();
    await expect(page.getByText('Результат: 3 кликов')).toBeVisible();
  });

  // Тест 2: Проверка двойного клика
  test('Двойной клик увеличивает специальный счетчик', async ({ page }) => {
    const dblClickArea = page.locator('#dblclick-area'); // Локатор для счетчика
    await dblClickArea.dblclick();
    await expect(dblClickArea).toContainText('1');
    await dblClickArea.dblclick();
    await expect(dblClickArea).toContainText('2');
  });
});

test.describe('Действия с правой кнопкой мыши', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/action_click');
  });

  // Тест 1: Проверка контекстного меню
  test('Правый клик открывает контекстное меню', async ({ page }) => {
    const rightClickArea = page.getByText('Кликни правой кнопкой');
    await rightClickArea.click({ button: 'right' });

    const contextMenu = page.getByText('Копировать').first();
    await expect(contextMenu).toBeVisible();

    await contextMenu.click();
    await expect(page.getByText('Выбрано: Копировать')).toBeVisible();
  });

  // Тест 2: Проверка позиции контекстного меню
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
  test('Клик в конкретных координатах регистрирует позицию', async ({ page }) => {
    const clickArea = page.getByText('Кликни в любом месте');
    await clickArea.click({
      button: 'left',
      position: {
        x: 50,
        y: 100,
      },
    });
    await expect(page.getByText(/Позиция?/)).toHaveText(/^Позиция: \(\d+, \d+\)$/);
  });

  // Тест 2: Удержание кнопки
  test('Удержание кнопки изменяет статус', async ({ page }) => {
    const holdButton = page.getByText('Удерживай меня');

    await holdButton.dispatchEvent('mousedown');
    await expect(page.getByText('Статус: нажата')).toBeVisible();

    await page.waitForTimeout(1000);
    await holdButton.dispatchEvent('mouseup');
    await expect(page.getByText('Статус: отпущена')).toBeVisible();
  });
});
