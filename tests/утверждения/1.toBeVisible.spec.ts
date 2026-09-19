import { test, expect } from '@playwright/test';

test.describe('Тестирование видимости элементов с toBeVisible()', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/assertion_tobevisible');
  });

  test('Базовый тест видимости элемента', async ({ page }) => {
    const constVisibleElement = page.locator('#always-visible');

    await expect(constVisibleElement).toBeVisible();
    await expect(constVisibleElement).toHaveText('Всегда видимый элемент');
  });

  test('Тест элементов с разными типами скрытия', async ({ page }) => {
    const hiddenDisplayElement = page.locator('#toggle-display');
    const hiddenVisibilityElement = page.locator('#toggle-visibility');
    const hiddenOpacityElement = page.locator('#toggle-opacity');

    await expect(hiddenDisplayElement).not.toBeVisible();
    await expect(hiddenDisplayElement).toHaveCSS('display', 'none');

    await expect(hiddenVisibilityElement).not.toBeVisible();
    await expect(hiddenVisibilityElement).toHaveCSS('visibility', 'hidden');

    await expect(hiddenOpacityElement).toBeVisible();
    await expect(hiddenOpacityElement).toHaveCSS('opacity', '0');
  });

  test('Тест изменения видимости элементов', async ({ page }) => {
    const displayElement = page.locator('#show-display');
    const visibilityElement = page.locator('#show-visibility');
    const opacityElement = page.locator('#show-opacity');

    await displayElement.click();
    await expect(page.locator('#toggle-display')).toBeVisible();
    await expect(page.locator('#toggle-display')).toHaveCSS('display', 'block');

    await visibilityElement.click();
    await expect(page.locator('#toggle-visibility')).toBeVisible();
    await expect(page.locator('#toggle-visibility')).toHaveCSS('visibility', 'visible');

    await opacityElement.click();
    await expect(page.locator('#toggle-opacity')).toBeVisible();
    await expect(page.locator('#toggle-opacity')).toHaveCSS('opacity', '1');
  });

  test('Тест элемента с задержкой появления', async ({ page }) => {
    const delayedElement = page.locator('#delayed-element');
    const showDelayedButton = page.locator('#show-delayed');

    await expect(delayedElement).not.toBeVisible();

    await showDelayedButton.click();

    await expect(delayedElement).toBeVisible({ timeout: 3000 });
    await expect(delayedElement).toHaveText('Элемент с задержкой появления');
  });
});
