import { Page, expect } from '@playwright/test';
import { formatPrice } from '../utils/constants';

export class CartPage {
  constructor(public page: Page) {}

  async getProductPrice(productName: string): Promise<number> {
    const row = this.page.locator('tr').filter({ hasText: productName });
    const priceText = await row.locator('td').nth(1).innerText();
    console.log(`Price text for ${productName}: "${priceText}"`);
    return this.parsePrice(priceText);
  }

  async getProductSubtotal(productName: string): Promise<number> {
    const row = this.page.locator('tr').filter({ hasText: productName });
    const subtotalText = await row.locator('td').nth(3).innerText();
    return this.parsePrice(subtotalText);
  }

  async getTotal(): Promise<number> {
    const totalText = await this.page.locator('strong.total').innerText();
    const match = totalText.match(/[\d,.]+/);
    return match ? parseFloat(match[0].replace(',', '')) : 0;
  }

  private parsePrice(priceText: string): number {
    return parseFloat(priceText.replace('$', '').replace(',', '').trim());
  }

  async verifyProductPrice(productName: string, expectedPrice: number) {
    const formatted = formatPrice(expectedPrice);
    const row = this.page.locator('tr').filter({ hasText: productName });
    await expect(row.locator('td').nth(1)).toContainText(formatted);
  }

  async verifyProductSubtotal(productName: string, expectedSubtotal: number) {
    const formatted = formatPrice(expectedSubtotal);
    const row = this.page.locator('tr').filter({ hasText: productName });
    await expect(row.locator('td').nth(3)).toContainText(formatted);
  }

  async verifyTotal(expectedTotal: number) {
    const totalText = await this.page.locator('strong.total').innerText();
    const match = totalText.match(/[\d,.]+/);
    if (!match) throw new Error('Total amount not found in page');

    const actualTotal = parseFloat(match[0].replace(',', ''));
    console.log(`Expected Total: ${expectedTotal.toFixed(2)}, Actual Total: ${actualTotal.toFixed(2)}`);

    const diff = Math.abs(actualTotal - expectedTotal);

    if (diff > 0.01) {
      throw new Error(`Total mismatch: expected ${expectedTotal}, got ${actualTotal}`);
    }
  }
}
