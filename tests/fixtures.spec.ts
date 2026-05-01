// Import from fixtures instead of @playwright/test
import { test, expect } from '../fixtures';

test.describe('Tests Using Fixtures - Much Cleaner!', () => {

  test('TC001: checkout with fixtures', async ({ 
    page,
    productsPage,  // ← injected automatically!
    cartPage,      // ← injected automatically!
    checkoutPage   // ← injected automatically!
  }) => {
    // No need to write: const productsPage = new ProductsPage(page)
    // Fixtures do it for you automatically

    await page.goto('/inventory.html');

    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.goToCart();

    await cartPage.expectItemInCart('Sauce Labs Backpack');
    await cartPage.proceedToCheckout();

    await checkoutPage.fillShippingDetails('Uzair', 'Khan', '400001');
    await checkoutPage.completeOrder();
    await checkoutPage.expectOrderSuccess();

    console.log('✅ Cleaner test using fixtures!');
  });

});