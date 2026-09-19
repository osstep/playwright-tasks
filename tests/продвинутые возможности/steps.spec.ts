import { test, expect } from '@playwright/test';

test.describe('Тестирование формы регистрации', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/steps');
  });

  test('Проверка полного цикла регистрации', async ({ page }) => {
    // Тест проверяет полный цикл работы с формой:
    // 1. Начальное состояние
    // 2. Негативные сценарии
    // 3. Успешную регистрацию
    // 4. Проверку профиля
    // 5. Выход из системы

    await test.step('ПРЕДУСЛОВИЯ: Проверить начальное состояние формы', async () => {
      await expect(page.locator('#username')).toHaveValue('');
      await expect(page.locator('#email')).toHaveValue('');
      await expect(page.locator('#password')).toBeEmpty();
      await expect(page.locator('#error-message')).toBeHidden();
      await expect(page.locator('#success-message')).toBeHidden();
      await expect(page.locator('#profile-section')).toBeHidden();
    });

    await test.step('ШАГ 1: Попытка регистрации с пустыми полями', async () => {
      await page.getByRole('button', { name: 'Зарегистрироваться' }).click();

      await expect(page.locator('#error-message')).toBeVisible();
      await expect(page.locator('#error-message')).toHaveText(
        'Все поля обязательны для заполнения',
      );
      await expect(page.locator('#success-message')).toBeHidden();
    });

    await test.step('ШАГ 2: Попытка регистрации с некорректными данными', async () => {
      await page.locator('#username').fill('Chizhick');
      await page.locator('#email').fill('Chizhickmail.ru');
      await page.locator('#password').fill('123');

      await page.getByRole('button', { name: 'Зарегистрироваться' }).click();
      await expect(page.locator('#error-message')).toBeVisible();
      await expect(page.locator('#error-message')).toHaveText(
        'Пароль должен быть не менее 6 символов',
      );
    });

    await test.step('ШАГ 3: Успешная регистрация', async () => {
      await page.locator('#username').fill('Chizhick');
      await page.locator('#email').fill('Chizhick@mail.ru');
      await page.locator('#password').fill('123456789Abc!');

      await page.getByRole('button', { name: 'Зарегистрироваться' }).click();
      await expect(page.locator('#error-message')).toBeHidden();
      await expect(page.locator('#error-message')).not.toHaveText(
        'Все поля обязательны для заполнения',
      );
      await expect(page.locator('#success-message')).toBeVisible();
      await expect(page.locator('#success-message')).toContainText('Регистрация завершена!');
      await expect(page.locator('#profile-section')).toBeVisible();
    });

    await test.step('ШАГ 4: Проверка данных профиля', async () => {
      await expect(page.locator('#profile-username')).toHaveText('Chizhick');
      await expect(page.locator('#profile-email')).toHaveText('Chizhick@mail.ru');
    });

    await test.step('ШАГ 5: Выход из системы', async () => {
      await page.getByRole('button', { name: 'Выйти' }).click();

      await expect(page.locator('#username')).toHaveValue('');
      await expect(page.locator('#email')).toHaveValue('');
      await expect(page.locator('#password')).toBeEmpty();
      await expect(page.locator('#error-message')).toBeHidden();
      await expect(page.locator('#success-message')).toBeHidden();
      await expect(page.locator('#profile-section')).toBeHidden();
    });
  });

  // Демонстрационный тест
  test.describe('Параметризованные тесты регистрации', () => {
    const testCases = [
      {
        title: 'Короткий пароль (5 символов)',
        data: { username: 'user1', email: 'user1@test.com', password: '12345' },
        expectedError: 'Пароль должен быть не менее 6 символов',
      },
    ];

    for (const testCase of testCases) {
      test(testCase.title, async ({ page }) => {
        await test.step('ЗАПОЛНЕНИЕ: Ввести тестовые данные', async () => {
          await page.locator('#username').fill(testCase.data.username);
          await page.locator('#email').fill(testCase.data.email);
          await page.locator('#password').fill(testCase.data.password);
        });

        await test.step('ДЕЙСТВИЕ: Отправить форму', async () => {
          await page.getByRole('button', { name: 'Зарегистрироваться' }).click();
        });

        await test.step('ПРОВЕРКА: Сообщение об ошибке', async () => {
          await expect(page.locator('#error-message')).toBeVisible();
          await expect(page.locator('#error-message')).toContainText(testCase.expectedError);
        });
      });
    }
  });

  // Демонстрационный тест
  test('Вложенные шаги с группами проверок', async ({ page }) => {
    await test.step('ГРУППА: Проверки валидации формы', async () => {
      await test.step('ПУСТЫЕ ПОЛЯ: Отправка пустой формы', async () => {
        await page.getByRole('button', { name: 'Зарегистрироваться' }).click();
        await expect(page.locator('#error-message')).toHaveText(/Все поля обязательны/);
      });

      await test.step('ЧАСТИЧНО ЗАПОЛНЕННАЯ: Только имя пользователя', async () => {
        await page.locator('#username').fill('partialuser');
        await page.getByRole('button', { name: 'Зарегистрироваться' }).click();
        await expect(page.locator('#error-message')).toHaveText(/Все поля обязательны/);
      });
    });

    await test.step('ГРУППА: Проверки успешных сценариев', async () => {
      await test.step('КОРРЕКТНЫЕ ДАННЫЕ: Полное заполнение формы', async () => {
        await page.locator('#username').fill('validuser');
        await page.locator('#email').fill('valid@example.com');
        await page.locator('#password').fill('validpassword123');
        await page.getByRole('button', { name: 'Зарегистрироваться' }).click();
        await expect(page.locator('#success-message')).toBeVisible();
      });
    });
  });
});
