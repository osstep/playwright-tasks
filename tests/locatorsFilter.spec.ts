import {test, expect} from "@playwright/test";

test('filter', async ({ page }) => {
  await page.goto(`https://osstep.github.io/locators/locator_filter`);
  const list = page.getByRole('list', { name: 'Fruits list' });
  const items = list.getByRole('listitem');
  const itemsBanana = items.filter({hasText: /^Banana$/})
  await itemsBanana.click();
})

test('card filter', async ({ page }) => {
  await page.goto(`https://osstep.github.io/locators/locator_filter`);
  const productSection = page.getByRole('region', { name: 'Products' });
  const productCards = productSection.getByRole('article');
  const availableProducts = productCards
      .filter({has: page.getByRole('heading', { name: 'Product 1' })})
      .filter({has: page.getByRole('button', { name: 'Buy' })})

  await availableProducts.getByRole('button', { name: 'Buy' }).click();

})

test('task list filter', async ({ page }) => {
  await page.goto(`https://osstep.github.io/locators/locator_filter`);
  const taskItems = page.getByRole('list', { name: 'Tasks list' })
      .getByRole('listitem');
  await taskItems
      .filter({hasText: '2023'})
      .filter({has: page.getByTestId('icon-pending')})
      .click();
})

test('table filter', async ({ page }) => {
  await page.goto(`https://osstep.github.io/locators/locator_filter`);
  const table = page.getByRole('table', { name: 'Orders table' });
  const rows = table.getByRole('row');
  const completedRow = rows.filter({has: page.getByRole('cell', { name: 'Completed' })});
  await completedRow.getByRole('button', { name: 'Details' }).click();
})
