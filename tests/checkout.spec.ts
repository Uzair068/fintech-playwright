import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
// Ensure the CheckoutPage file exists or correct the path if necessary
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Full E2E Checkout Flow', () => {

  // This runs before EACH test — logs in fresh every time
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/.*inventory/);
  });

  test('TC001: add one product and complete checkout', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Step 1 — Verify on products page
    await productsPage.expectOnProductsPage();

    // Step 2 — Add product to cart
    await productsPage.addProductToCart('Sauce Labs Backpack');

    // Step 3 — Verify cart badge shows 1
    const cartCount = await productsPage.getCartCount();
    expect(cartCount).toBe('1');
    console.log('✅ Product added to cart');

    // Step 4 — Go to cart
    await productsPage.goToCart();

    // Step 5 — Verify product is in cart
    await cartPage.expectItemInCart('Sauce Labs Backpack');
    const itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBe(1);
    console.log('✅ Cart verified');

    // Step 6 — Proceed to checkout
    await cartPage.proceedToCheckout();

    // Step 7 — Fill shipping details
    await checkoutPage.fillShippingDetails('Uzair', 'Khan', '400001');

    // Step 8 — Check order total is shown
    const total = await checkoutPage.getOrderTotal();
    console.log('Order total:', total);
    expect(total).toContain('Total:');

    // Step 9 — Complete the order
    await checkoutPage.completeOrder();

    // Step 10 — Verify success
    await checkoutPage.expectOrderSuccess();
    console.log('✅ Order completed successfully!');
  });

  test('TC002: add multiple products and verify cart count', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.addProductToCart('Sauce Labs Bike Light');
    await productsPage.addProductToCart('Sauce Labs Bolt T-Shirt');

    const cartCount = await productsPage.getCartCount();
    expect(cartCount).toBe('3');
    console.log('✅ 3 products added to cart');
  });

  test('TC003: sort products low to high price', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.sortBy('lohi');

    // First product should be cheapest
    const firstProduct = productsPage.productItems.first();
    const price = await firstProduct
      .locator('.inventory_item_price')
      .textContent();

    console.log('Cheapest product price:', price);
    expect(price).toBe('$7.99');
    console.log('✅ Sort working correctly');
  });

});