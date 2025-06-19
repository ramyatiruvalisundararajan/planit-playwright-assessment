import { Page } from '@playwright/test';

export class ShopPage {
  constructor(public page: Page) {}

  async buyProduct(productName: string, quantity: number) {
    const productCard = this.page.locator('.product').filter({ hasText: productName });
    const buyButton = productCard.locator('a:has-text("Buy")');
    for (let i = 0; i < quantity; i++) {
      await buyButton.click();
    }
  }

  async goToCart() {
    await this.page.locator('#nav-cart a').click();
  }
}
