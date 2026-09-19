import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://osstep.github.io/assertion_tohaveclass');
});

test('1. Проверка начальных классов элементов', async ({ page }) => {
  const boxOne = page.locator('#box1');
  const boxTwo = page.locator('#box2');
  const boxThree = page.locator('#box3');

  await expect(boxOne).toHaveClass(/active/);
  await expect(boxOne).not.toHaveClass(/error/);
  await expect(boxTwo).toHaveClass(/error/);
  await expect(boxThree).toHaveClass(/hidden/);
});

test('2. Проверка переключения классов box1', async ({ page }) => {
  const boxOne = page.locator('#box1');
  const changeBox1Button = page.getByRole('button', { name: 'Переключить box1' });

  await expect(boxOne).toHaveClass(/active/);

  await changeBox1Button.click();
  await expect(boxOne).toHaveClass(/error/);
  await expect(boxOne).not.toHaveClass(/active/);

  await changeBox1Button.click();
  await expect(boxOne).not.toHaveClass(/error/);
  await expect(boxOne).toHaveClass(/active/);
});

test('3. Проверка показа/скрытия элемента', async ({ page }) => {
  const boxThree = page.locator('#box3');
  const changeBox3Button = page.getByRole('button', { name: 'Показать/скрыть box3' });

  await expect(boxThree).toHaveClass(/hidden/);

  await changeBox3Button.click();
  await expect(boxThree).not.toHaveClass(/hidden/);

  await changeBox3Button.click();
  await expect(boxThree).toHaveClass(/hidden/);
});

test('4. Проверка классов карточки пользователя', async ({ page }) => {
  const cartUser = page.locator('#user-card');
  const nextToPremiumButton = page.getByRole('button', { name: 'Перейти на Премиум' });
  const cancelButton = page.getByRole('button', { name: 'Отметить как просроченный' });

  await expect(cartUser).not.toHaveClass(/premium/);

  await nextToPremiumButton.click();
  await expect(cartUser).toHaveClass(/premium/);

  await cancelButton.click();
  await expect(cartUser).toHaveClass(/premium/);
  await expect(cartUser).toHaveClass(/expired/);
  //---проверка рандомности расположения классов а не строго друг за другом
  await expect(cartUser).toHaveClass(/premium.*expired|expired.*premium/);
});

test('5. Проверка элемента с несколькими классами', async ({ page }) => {
  const multiClassElement = page.locator('#multi-class');
  const changeClassButton = page.getByRole('button', { name: 'Изменить классы' });

  await expect(multiClassElement).toHaveClass(/box/);
  await expect(multiClassElement).toHaveClass(/warning/);
  await expect(multiClassElement).toHaveClass(/large/);
  await expect(multiClassElement).toHaveClass(/rounded/);

  await changeClassButton.click();
  await expect(multiClassElement).toHaveClass(/error/);
  await expect(multiClassElement).not.toHaveClass(/large/);
  await expect(multiClassElement).toHaveClass(/rounded/);
  await expect(multiClassElement).toHaveClass(/box/);
});
