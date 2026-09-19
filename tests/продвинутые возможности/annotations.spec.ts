import { test, expect } from '@playwright/test';

test.describe('Раздел с аннотациями', () => {
  // 1. slow - увеличивает таймаут для медленных тестов. Добавь аннотацию slow для медленного тесты
  test('Медленная загрузка раздела', async ({ page }) => {
    test.slow();

    await page.goto('https://osstep.github.io/annotations');
    const slowSection = page.locator('#slow-section');
    await slowSection.waitFor({ state: 'visible' });
    await expect(slowSection).toBeVisible();
  });

  // 2. skip - пропуск теста с указанием причины. Используй аннотацию skip для пропуска теста
  test('Форма оплаты (еще не реализована)', async ({ page, browserName }) => {
    test.skip(browserName === 'chromium', 'Не работают кнопки оплаты');

    await page.goto('https://osstep.github.io/annotations');
    await expect(page.getByRole('button', { name: 'Оплатить' })).toBeDisabled();
  });

  // 3. fixme - пометить временно падающий тест. Используй аннотацию fixme чтобы пометить нестабильный тест
  test.fixme('Нестабильная функция', async ({ page }) => {
    await page.goto('https://osstep.github.io/annotations');
    await page.getByRole('button', { name: 'Активировать' }).click();
    await expect(page.locator('#unstable-result')).toBeVisible();
  });

  // 4. only - запустить только этот тест. Используй аннотацию only чтобы запустить только этот тест
  test.only('Новая функция в разработке', async ({ page }) => {
    await page.goto('https://osstep.github.io/annotations');

    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe('Функция в разработке!');
      await dialog.dismiss();
    });

    await page.getByRole('button', { name: 'Попробовать' }).click();
  });

  // 5. fail - ожидаемо падающий тест. Этот тест падает, пометь его как падающий с помощью аннотации fail
  test.fail('Тест с ожидаемым падением', async ({ page }) => {
    await page.goto('https://osstep.github.io/annotations');
    await expect(page.locator('#non-existent-element')).toBeVisible();
  });
});

// 7. Условное выполнение тестов
test.describe('Платформо-зависимые тесты', () => {
  // Пропустить в Firefox
  test('Тест только для Chromium', async ({ browserName }) => {
    test.skip(browserName === 'firefox', 'Не поддерживается в Firefox');
    // Тестовый код...
  });

  // Запускать только в headless режиме
  test('Тест для headless режима', async ({ headless }) => {
    test.fixme(!headless, 'Требуется headless режим');
    // Тестовый код...
  });
});

// 8. Аннотации с параметрами
test.describe('Параметризованные тесты', () => {
  const users = [
    { role: 'admin', expected: true },
    { role: 'user', expected: false },
  ];

  for (const user of users) {
    test(`Проверка доступа для ${user.role} @role-${user.role}`, () => {
      // Тест с параметрами...
    });
  }
});
