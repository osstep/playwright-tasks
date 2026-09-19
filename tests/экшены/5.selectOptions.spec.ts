import { test, expect, Locator } from '@playwright/test';

test.describe('Работа с базовыми select элементами', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/action_selectOptions');
  });

  // Тест 1: Выбор одиночной опции по значению
  test('Выбор страны по значению', async ({ page }) => {
    const countrySelect = page.getByLabel('Страна');
    await expect(countrySelect).toHaveValue('');

    await countrySelect.selectOption('ru');
    await expect(countrySelect).toHaveValue('ru');
    await expect(page.locator('#country-feedback')).toHaveText('Выбрано: Россия');
  });

  // Тест 2: Выбор одиночной опции по тексту
  test('Выбор страны по тексту', async ({ page }) => {
    const countrySelect = page.getByLabel('Страна');
    await countrySelect.selectOption('de');

    await expect(countrySelect).toHaveValue('de');
    await expect(page.locator('#country-feedback')).toHaveText('Выбрано: Германия');
  });
});

test.describe('Работа с select multiple', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/action_selectOptions');
  });
  // Хелпер для получения всех выбранных значений без evaluate
  const getSelectedValues = async (locator: Locator) => {
    const checkedOptions = await locator.locator('option:checked').all();
    return Promise.all(checkedOptions.map((option) => option.getAttribute('value')));
  };
  // Тест 1: Выбор нескольких опций по значению
  test('Множественный выбор по значениям', async ({ page }) => {
    const languagesSelect = page.getByLabel('Языки программирования');

    await languagesSelect.selectOption(['js', 'py']);

    const selectedOptions = await getSelectedValues(languagesSelect);
    expect(selectedOptions).toEqual(['js', 'py']);
    await expect(page.locator('#languages-feedback')).toHaveText('Выбрано: JavaScript, Python');
  });
});

test.describe('Продвинутые сценарии работы с select', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/action_selectOptions');
  });

  // Тест 1: Выбор из группированных опций
  test('Выбор из группированных опций', async ({ page }) => {
    const carBrandSelect = page.getByLabel('Марка автомобиля');

    await carBrandSelect.selectOption('Toyota');
    await expect(carBrandSelect).toHaveValue('toyota');
  });

  // Тест 2: Работа с динамически добавленными select
  test('Динамически добавленный select', async ({ page }) => {
    const dynamicSelect = page.getByLabel('Динамический select');
    await expect(dynamicSelect).toBeVisible({ timeout: 2000 });

    await dynamicSelect.selectOption('opt2');
    await expect(dynamicSelect).toHaveValue('opt2');
  });
});
