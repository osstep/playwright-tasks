import { test, expect } from '@playwright/test';

test('filter', async ({ page }) => {
  await page.goto('https://osstep.github.io/locators/locator_filter');
  const list = page.getByRole('list', { name: 'Fruits list' });
  const items = list.getByRole('listitem');
  const bananaItem = items.filter({ hasText: /Banana$/ });
  await bananaItem.click();
});

test('card filter', async ({ page }) => {
  await page.goto('https://osstep.github.io/locators/locator_filter');
  const productsSection = page.getByRole('region', { name: 'Products' });
  const productCard = productsSection.getByRole('article');
  const availableProduct = productCard
    .filter({ has: page.getByRole('heading', { name: 'Product 1' }) })
    .filter({ has: page.getByRole('button', { name: 'Buy' }) });
  await availableProduct.getByRole('button', { name: 'Buy' }).click();
});

test('task list', async ({ page }) => {
  await page.goto('https://osstep.github.io/locators/locator_filter');
  const taskItems = page.getByRole('list', { name: 'Tasks list' }).getByRole('listitem');
  await taskItems
    .filter({ hasText: '2023' })
    .filter({ has: page.getByTestId('icon-check') })
    .click();
});

test('table filter', async ({ page }) => {
  await page.goto('https://osstep.github.io/locators/locator_filter');
  const table = page.getByRole('table', { name: 'Orders table' });
  const row = table.getByRole('row');
  const completedRow = row.filter({ has: page.getByRole('cell', { name: 'Completed' }) });
  await completedRow.getByRole('button', { name: 'Details' }).click();
});
