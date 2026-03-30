import { test, expect } from '@playwright/test';

test.describe('Практика работы с page.evaluate()', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/evaluate');
  });

  test('Получение текстового содержимого элемента', async ({ page }) => {
    // Базовое использование evaluate для получения данных

    // ШАГ 1: Получить текущее значение счетчика counter через evaluate
    // Для это используй document.getElementById('counter')?.textContent
    const counterValue = 'TODO(student): добавьте page.evaluate(...)';

    // ПРОВЕРКА: Значение счетчика равно "0" при загрузке
    expect(counterValue).toBe('0');

    // ШАГ 2: Кликаем на кнопку увеличения
    await page.click('#increment');

    // ШАГ 3: Получаем обновленное значение через evaluate с параметром
    const updatedValue = 'TODO(student): добавьте page.evaluate(...)';

    // ПРОВЕРКА: Значение увеличилось на 1
    expect(updatedValue).toBe('1');
  });

  test('Модификация DOM через evaluate', async ({ page }) => {
    // Тест показывает как изменять DOM-структуру

    // ШАГ 1: Проверяем исходное содержимое
    const initialContent = await page.locator('#dynamic-content').innerText();
    expect(initialContent).toContain('Исходное содержимое');

    // ШАГ 2: Модифицируем содержимое через evaluate - нужно с помощью evaluate добавить новой содержимое для элемента
    // <h3>Новое содержимое</h3><p>Сгенерировано в evaluate()</p>
    // Используй innerHTML
    throw new Error(
      'TODO(student): добавьте page.evaluate() для обновления innerHTML у #dynamic-content',
    );

    // ПРОВЕРКА: Содержимое изменилось
    await expect(page.locator('#dynamic-content h3')).toHaveText('Новое содержимое');
  });

  // ЭТО ДЕМОНСТРАЦИОННЫЙ ТЕСТ
  test('Работа с комплексными объектами', async ({ page }) => {
    // Тест демонстрирует передачу и возврат объектов

    // ШАГ 1: Создаем пользователя через UI (нажать на кнопку Создать пользователя)
    await page.click('#create-user');

    // ШАГ 2: Получаем данные пользователя через evaluate и возвращает в виде объекта
    const userData = await page.evaluate(() => {
      const userCard = document.querySelector('.user-card');
      if (!userCard) return null;

      return {
        title: userCard.querySelector('h3')?.textContent,
        date: userCard.querySelector('p')?.textContent,
        color: window.getComputedStyle(userCard).backgroundColor,
      };
    });

    // ПРОВЕРКА: Данные пользователя корректны
    expect(userData).toEqual({
      title: expect.stringContaining('Пользователь #'),
      date: expect.stringContaining('Дата создания:'),
      color: 'rgba(0, 0, 0, 0)', // прозрачный фон
    });
  });

  // ЭТО ДЕМОНСТРАЦИОННЫЙ ТЕСТ
  test('Получение информации о браузере', async ({ page }) => {
    // Тест демонстрирует доступ к объектам браузера

    // ШАГ 1: Получаем данные через evaluate
    const browserInfo = await page.evaluate(() => {
      return {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        screenWidth: screen.width,
        screenHeight: screen.height,
        documentTitle: document.title,
      };
    });

    // ШАГ 2: Выводим информацию для отладки
    console.log('Информация о браузере:', browserInfo);

    // ПРОВЕРКА: Данные получены корректно
    expect(browserInfo.userAgent).toContain('Mozilla');
    expect(browserInfo.documentTitle).toBe('Практика page.evaluate()');
    expect(browserInfo.screenWidth).toBeGreaterThan(0);
  });

  // ЭТО ДЕМОНСТРАЦИОННЫЙ ТЕСТ
  test('Обработка ошибок в evaluate', async ({ page }) => {
    // Тест показывает обработку ошибок

    // ШАГ 1: Пытаемся получить несуществующий элемент
    const result = await page.evaluate(() => {
      try {
        const element = document.getElementById('non-existent-element');
        if (!element) throw new Error('Элемент не найден');
        return element.textContent;
      } catch (error) {
        console.error('Ошибка в evaluate:', error.message);
        return null;
      }
    });

    // ПРОВЕРКА: Обработка ошибки сработала
    expect(result).toBeNull();
  });

  // ЭТО ДЕМОНСТРАЦИОННЫЙ ТЕСТ
  test('Сравнение с обычными методами Playwright', async ({ page }) => {
    // Тест показывает разницу между evaluate и стандартными методами

    // ШАГ 1: Получаем значение счетчика стандартным способом
    const playwrightValue = await page.locator('#counter').innerText();

    // ШАГ 2: Получаем значение через evaluate
    const evaluateValue = await page.evaluate(() => {
      return document.getElementById('counter')?.textContent;
    });

    // ПРОВЕРКА: Значения одинаковые
    expect(playwrightValue).toBe(evaluateValue);

    // ШАГ 3: Измеряем производительность
    console.time('Standard method');
    await page.locator('#counter').innerText();
    console.timeEnd('Standard method');

    console.time('Evaluate method');
    await page.evaluate(() => document.getElementById('counter')?.textContent);
    console.timeEnd('Evaluate method');
  });
});
