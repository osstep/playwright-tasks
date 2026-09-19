import { test, expect } from '@playwright/test';

test.describe('Параметризованные тесты формы входа', () => {
  const loginTestCases = [
    {
      username: 'admin',
      password: 'admin123',
      expected: 'Успешный вход!',
    },
    {
      username: '',
      password: 'anypassword',
      expected: 'Все поля обязательны',
    },
    {
      username: 'testuser',
      password: '123',
      expected: 'Пароль должен быть не менее 6 символов',
    },
  ];

  loginTestCases.forEach(({ username, password, expected }) => {
    test(`Тестирование входа с: ${username}, ${password}`, async ({ page }) => {
      await page.goto('https://osstep.github.io/parametrize');

      await test.step(`Заполнение формы`, async () => {
        await page.getByRole('textbox', { name: 'Имя пользователя' }).fill(username);
        await page.getByRole('textbox', { name: 'Пароль' }).fill(password);
      });

      await test.step(`Нажатие на кнопку входа`, async () => {
        await page.getByRole('button', { name: 'Войти' }).click();
      });

      await test.step(`Проверяем сообщение и классы сообщения`, async () => {
        const messageSystem = page.locator('#message');

        await expect(messageSystem).toBeVisible();
        await expect(messageSystem).toHaveText(expected);

        const successMessage = await messageSystem.textContent();
        if (successMessage === 'Успешный вход!') {
          await expect(messageSystem).toHaveClass('success');
        } else {
          await expect(messageSystem).toHaveClass('error');
        }
      });
    });
  });
});

test.describe('Параметризованные тесты калькулятора', () => {
  const calculatorTestCases = [
    { a: 5, b: 3, operation: 'add', expected: 8 },
    { a: 10, b: 0, operation: 'add', expected: 10 },
    { a: 4, b: 5, operation: 'multiply', expected: 20 },
  ];

  calculatorTestCases.forEach(({ a, b, operation, expected }) => {
    test(`Проверка калькулятора со значениям ${a} и ${b} и операцией ${operation}`, async ({
      page,
    }) => {
      await page.goto('https://osstep.github.io/parametrize');

      await test.step(`Ввод значений`, async () => {
        const numOneInput = page.locator('#num1');
        const numTwoInput = page.locator('#num2');

        await numOneInput.fill(a.toString());
        await numTwoInput.fill(b.toString());
      });

      await test.step(`Выбор операции`, async () => {
        const addButton = page.locator('#add-btn');
        const multiplyButton = page.locator('#multiply-btn');

        if (operation === 'add') {
          await addButton.click();
        }
        if (operation === 'multiply') {
          await multiplyButton.click();
        }
      });

      await test.step('Проверка результата', async () => {
        const resultText = page.locator('#result');

        await expect(resultText).toHaveText(`Результат: ${expected}`);
      });
    });
  });
});
