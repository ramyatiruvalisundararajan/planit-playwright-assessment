import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly contactLink: Locator;
  readonly shopLink: Locator;
  readonly cartLink: Locator;

  constructor(public page: Page) {
    this.contactLink = page.locator('a[href$="contact"]');
    this.shopLink = this.page.getByRole('link', { name: 'Shop', exact: true });
    this.cartLink = page.locator('#nav-cart a');
  }
}

