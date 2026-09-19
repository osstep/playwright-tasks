import { test, expect } from '@playwright/test';

test.describe('Практика работы с page.evaluate()', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/evaluate');
  });

  test('Получение текстового содержимого элемента', async ({ page }) => {
    const counterValue = await page.evaluate(() => {
      return document.getElementById('counter')?.textContent;
    });
    expect(counterValue).toBe('0');

    await page.click('#increment');

    const updatedValue = await page.evaluate((selector) => {
      return document.querySelector(selector)?.textContent;
    }, '#counter');
    expect(updatedValue).toBe('1');
  });

  test('Модификация DOM через evaluate', async ({ page }) => {
    const initialContent = await page.locator('#dynamic-content').innerText();
    expect(initialContent).toContain('Исходное содержимое');

    await page.evaluate(() => {
      const div = document.getElementById('dynamic-content');

      if (div) {
        div.innerHTML = '<h3>Новое содержимое</h3><p>Сгенерировано в evaluate()</p>';
      }
    });

    await expect(page.locator('#dynamic-content h3')).toHaveText('Новое содержимое');
  });

  test('Работа с комплексными объектами', async ({ page }) => {
    await page.click('#create-user');

    const userData = await page.evaluate(() => {
      const userCard = document.querySelector('.user-card');
      if (!userCard) return null;

      return {
        title: userCard.querySelector('h3')?.textContent,
        date: userCard.querySelector('p')?.textContent,
        color: window.getComputedStyle(userCard).backgroundColor,
      };
    });

    expect(userData).toEqual({
      title: expect.stringContaining('Пользователь #'),
      date: expect.stringContaining('Дата создания:'),
      color: 'rgba(0, 0, 0, 0)', // прозрачный фон
    });
  });

  test('Получение информации о браузере', async ({ page }) => {
    const browserInfo = await page.evaluate(() => {
      return {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        screenWidth: screen.width,
        screenHeight: screen.height,
        documentTitle: document.title,
      };
    });

    console.log('Информация о браузере:', browserInfo);

    expect(browserInfo.userAgent).toContain('Mozilla');
    expect(browserInfo.documentTitle).toBe('Практика page.evaluate()');
    expect(browserInfo.screenWidth).toBeGreaterThan(0);
  });

  test('Обработка ошибок в evaluate', async ({ page }) => {
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

    expect(result).toBeNull();
  });

  test('Сравнение с обычными методами Playwright', async ({ page }) => {
    const playwrightValue = await page.locator('#counter').innerText();

    const evaluateValue = await page.evaluate(() => {
      return document.getElementById('counter')?.textContent;
    });

    expect(playwrightValue).toBe(evaluateValue);

    console.time('Standard method');
    await page.locator('#counter').innerText();
    console.timeEnd('Standard method');

    console.time('Evaluate method');
    await page.evaluate(() => document.getElementById('counter')?.textContent);
    console.timeEnd('Evaluate method');
  });
});
