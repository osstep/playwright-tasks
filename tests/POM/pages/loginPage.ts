import { Locator, Page } from '@playwright/test';

// Твоя задача реализовать все нужные методы в классе, чтобы тесты успешно выполнялись
// В самих тестах никаких изменений вносить не надо
// В классе нужно реализовать следующие методы
// async navigate() to https://osstep.github.io/login
// async fillUsername(username: string)
// async fillPassword(password: string)
// async clickLogin()
// async login(username: string, password: string)
// async getErrorMessage()
// async isErrorMessageVisible()
// Если не понятно по названию метода, что он должен выполнять, можно заглянуть в шпарганку

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-btn');
    this.errorMessage = page.locator('#error-message');
  }

  async navigate() {
    throw new Error('TODO(student): реализуйте navigate()');
  }

  async fillUsername(_username: string) {
    throw new Error('TODO(student): реализуйте fillUsername(username)');
  }

  async fillPassword(_password: string) {
    throw new Error('TODO(student): реализуйте fillPassword(password)');
  }

  async clickLogin() {
    throw new Error('TODO(student): реализуйте clickLogin()');
  }

  async login(_username: string, _password: string) {
    throw new Error('TODO(student): реализуйте login(username, password)');
  }

  async getErrorMessage() {
    throw new Error('TODO(student): реализуйте getErrorMessage()');
  }

  async isErrorMessageVisible() {
    throw new Error('TODO(student): реализуйте isErrorMessageVisible()');
  }
}
