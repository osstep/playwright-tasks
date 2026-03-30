import { Locator, Page } from '@playwright/test';

// Твоя задача реализовать все нужные методы в классе, чтобы тесты успешно выполнялись
// В самих тестах никаких изменений вносить не надо
// В классе нужно реализовать следующие методы
// async navigate() to 'https://osstep.github.io/cart
// async getItemCount(): Promise<number>
// async getItemByName(name: string): Promise<Locator>
// async removeItem(name: string): Promise<void>
// async getTotalPrice(): Promise<string | null>
// async goBackToProducts(): Promise<void>
// async isItemInCart(name: string): Promise<boolean>
// Если не понятно по названию метода, что он должен выполнять, можно заглянуть в шпарганку

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly cartTotal: Locator;
  readonly backLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('.cart-item');
    this.cartTotal = page.locator('#cart-total');
    this.backLink = page.locator('.back-link');
  }

  async navigate() {
    throw new Error("TODO(student): реализуйте navigate() на 'https://osstep.github.io/cart'");
  }

  async getItemCount(): Promise<number> {
    throw new Error('TODO(student): реализуйте getItemCount()');
  }

  async getItemByName(_name: string): Promise<Locator> {
    throw new Error('TODO(student): реализуйте getItemByName(name)');
  }

  async removeItem(_name: string): Promise<void> {
    throw new Error('TODO(student): реализуйте removeItem(name)');
  }

  async getTotalPrice(): Promise<string | null> {
    throw new Error('TODO(student): реализуйте getTotalPrice()');
  }

  async goBackToProducts(): Promise<void> {
    throw new Error('TODO(student): реализуйте goBackToProducts()');
  }

  async isItemInCart(_name: string): Promise<boolean> {
    throw new Error('TODO(student): реализуйте isItemInCart(name)');
  }
}
