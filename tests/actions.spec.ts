import {test, expect} from "@playwright/test";

test('fill form and testorder', async ({page}) => {
    await page.goto('https://osstep.github.io/locators/actions');
    await page.getByLabel('Name').fill('Ivan Ivanov');
    await page.getByLabel('Email').fill('123@gmail.com');
    await page.getByLabel('Country').selectOption('US');
    await page.getByLabel('I accept the terms').check();
    await page.getByLabel('Express delivery').check();

    //зашрузка файла

    await page.getByLabel('Invoice file').setInputFiles('tests/files/test1.png');

    const product = page.getByRole('article', {name: /Product 1/});
    await product.hover();
    await product.getByRole('button', {name: 'Add to cart'}).click();
    await expect(page.getByTestId('order-total')).toHaveText('$199.99');

    await product.dragTo(page.getByText('Drop product here'))

})
