import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

// NO beforeEach login needed anymore!
// storageState handles it automatically

test.describe('Full E2E Checkout Flow', () => {

  test('TC001: add one product and complete checkout', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Goes straight to products — already logged in!
    await page.goto('/inventory.html');
    await productsPage.expectOnProductsPage();

    await productsPage.addProductToCart('Sauce Labs Backpack');
    const cartCount = await productsPage.getCartCount();
    expect(cartCount).toBe('1');
    console.log('✅ Product added to cart');

    await productsPage.goToCart();
    await cartPage.expectItemInCart('Sauce Labs Backpack');
    await cartPage.proceedToCheckout();

    await checkoutPage.fillShippingDetails('Uzair', 'Khan', '400001');
    const total = await checkoutPage.getOrderTotal();
    expect(total).toContain('Total:');

    await checkoutPage.completeOrder();
    await checkoutPage.expectOrderSuccess();
    console.log('✅ Order completed!');
  });

  test('TC002: add multiple products and verify cart count', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await page.goto('/inventory.html');
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.addProductToCart('Sauce Labs Bike Light');
    await productsPage.addProductToCart('Sauce Labs Bolt T-Shirt');

    const cartCount = await productsPage.getCartCount();
    expect(cartCount).toBe('3');
    console.log('✅ 3 products in cart');
  });

  test('TC003: sort products low to high price', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await page.goto('/inventory.html');
    await productsPage.sortBy('lohi');

    const firstProduct = productsPage.productItems.first();
    const price = await firstProduct
      .locator('.inventory_item_price')
      .textContent();

    expect(price).toBe('$7.99');
    console.log('✅ Sort working:', price);
  });

});