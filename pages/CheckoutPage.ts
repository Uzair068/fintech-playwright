import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly zipCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly successMessage: Locator;
  readonly orderTotal: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.zipCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.successMessage = page.locator('[data-test="complete-header"]');
    this.orderTotal = page.locator('[data-test="total-label"]');
  }

  async fillShippingDetails(
    firstName: string,
    lastName: string,
    zipCode: string
  ) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.zipCodeInput.fill(zipCode);
    await this.continueButton.click();
  }

  async getOrderTotal(): Promise<string> {
    return (await this.orderTotal.textContent()) || '';
  }

  async completeOrder() {
    await this.finishButton.click();
  }

  async expectOrderSuccess() {
    await expect(this.successMessage).toHaveText('Thank you for your order!');
  }
}