import { Page, Locator, expect } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly productItems: Locator;
  readonly cartIcon: Locator;
  readonly cartBadge: Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('.title');
    this.productItems = page.locator('.inventory_item');
    this.cartIcon = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
  }

  async addProductToCart(productName: string) {
    // Find the product by name, then click its Add to Cart button
    const product = this.page
      .locator('.inventory_item')
      .filter({ hasText: productName });

    await product
      .getByRole('button', { name: 'Add to cart' })
      .click();
  }

  async getCartCount(): Promise<string> {
    return (await this.cartBadge.textContent()) || '0';
  }

  async goToCart() {
    await this.cartIcon.click();
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(option);
  }

  async expectOnProductsPage() {
    await expect(this.pageTitle).toHaveText('Products');
  }
}