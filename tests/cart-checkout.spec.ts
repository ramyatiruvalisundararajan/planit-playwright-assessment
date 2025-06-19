import { test } from '@playwright/test';
import { BASE_URL } from '../utils/constants';
import { HomePage } from '../pages/HomePage';
import { ShopPage } from '../pages/ShopPage';
import { CartPage } from '../pages/CartPage';

test('Verify cart subtotal and total with formatted prices', async ({ page }) => {
  await page.goto(BASE_URL);

  const home = new HomePage(page);
  await home.shopLink.click();

  const shop = new ShopPage(page);
  const cart = new CartPage(page);

  const products = [
    { name: 'Stuffed Frog', qty: 2 },
    { name: 'Fluffy Bunny', qty: 5 },
    { name: 'Valentine Bear', qty: 3 },
  ];

  for (const product of products) {
    await shop.buyProduct(product.name, product.qty);
  }

  await shop.goToCart();

  let expectedTotal = 0;

  for (const product of products) {
    const price = await cart.getProductPrice(product.name);
    const subtotal = price * product.qty;
    expectedTotal += subtotal;

    await cart.verifyProductPrice(product.name, price);
    await cart.verifyProductSubtotal(product.name, subtotal);
  }

  await cart.verifyTotal(expectedTotal);
});
