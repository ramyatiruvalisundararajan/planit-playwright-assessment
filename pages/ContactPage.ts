import { Page, Locator } from '@playwright/test';

export class ContactPage {
  readonly forenameInput: Locator;
  readonly emailInput: Locator;
  readonly messageInput: Locator;
  readonly submitBtn: Locator;
  readonly successMsg: Locator;
  readonly forenameErr: Locator;
  readonly emailErr: Locator;
  readonly messageErr: Locator;

  constructor(public page: Page) {
    this.forenameInput = page.locator('#forename');
    this.emailInput = page.locator('#email');
    this.messageInput = page.locator('#message');
    this.submitBtn = page.locator('a.btn-contact.btn.btn-primary');
    this.successMsg = page.locator('.alert-success');
    this.forenameErr = page.locator('#forename-err');
    this.emailErr = page.locator('#email-err');
    this.messageErr = page.locator('#message-err');
  }
  async fillMandatoryFields(forename: string, email: string, message: string) {
    await this.forenameInput.fill(forename);
    await this.emailInput.fill(email);
    await this.messageInput.fill(message);
  }
  
}
