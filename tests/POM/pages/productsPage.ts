import { Locator, Page } from '@playwright/test';

// Твоя задача реализовать все нужные методы в классе, чтобы тесты успешно выполнялись
// В самих тестах никаких изменений вносить не надо
// В классе нужно реализовать следующие методы
// async navigate()
// async getProductByName(name: string)
// async addProductToCart(name: string)
// async getCartCount()
// async goToCart()
// Если не понятно по названию метода, что он должен выполнять, можно заглянуть в шпарганку

export class ProductsPage {
  readonly page: Page;
  readonly productCards: Locator;
  readonly cartLink: Locator;
  readonly cartCount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productCards = page.locator('.product-card');
    this.cartLink = page.locator('#cart-link');
    this.cartCount = page.locator('#cart-count');
  }

  async navigate() {
    throw new Error('TODO(student): реализуйте navigate()');
  }

  async getProductByName(_name: string) {
    throw new Error('TODO(student): реализуйте getProductByName(name)');
  }

  async addProductToCart(_name: string) {
    throw new Error('TODO(student): реализуйте addProductToCart(name)');
  }

  async getCartCount() {
    throw new Error('TODO(student): реализуйте getCartCount()');
  }

  async goToCart() {
    throw new Error('TODO(student): реализуйте goToCart()');
  }
}
