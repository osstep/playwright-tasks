import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://osstep.github.io/assertion_tocontaintext');
});

test('1. Проверка статического текста', async ({ page }) => {
  const staticText = page.locator('#static-text');

  await expect(staticText).toContainText('static text block');
  await expect(staticText).toContainText('important information');
  await expect(staticText).not.toContainText('dynamic content');
});

test('2. Проверка динамически изменяемого текста', async ({ page }) => {
  const dynamicText = page.locator('#dynamic-text');
  const changetextButton = page.locator('#change-text');
  const addPart = page.locator('#add-part');

  await expect(dynamicText).toContainText('Initial dynamic text');

  await changetextButton.click();
  await expect(dynamicText).toContainText('Text was changed at');

  await addPart.click();
  await expect(dynamicText).toContainText('(additional part)');
});

test('3. Проверка списка элементов', async ({ page }) => {
  const itemList = page.locator('#item-list');
  const addItemButton = page.locator('#add-item');

  await expect(itemList).toContainText('Item 1: Basic');
  await expect(itemList).toContainText('Intermediate');

  await addItemButton.click();

  await expect(itemList).toContainText('New added item');
});

test('4. Проверка скрытого/отображаемого текста', async ({ page }) => {
  const hiddenContent = page.locator('#hidden-content');
  const toggleTextButton = page.locator('#toggle-text');

  await expect(hiddenContent).not.toBeVisible();

  await toggleTextButton.click();

  await expect(hiddenContent).toContainText('special content');
  await expect(hiddenContent).toContainText('hidden but now is visible');
});

test('5. Проверка частичного совпадения в длинном тексте', async ({ page }) => {
  const partialText = page.locator('#partial-text');

  await expect(partialText).toContainText('quick brown fox');
  await expect(partialText).toContainText('lazy dog');
  await expect(partialText).toContainText('all letters of the English alphabet');
  await expect(partialText).not.toContainText('all letters of the Russian alphabet');
});
