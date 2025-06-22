import { test, expect } from '@playwright/test';
import { BASE_URL, generateTestData } from '../utils/constants';
import { HomePage } from '../pages/HomePage';
import { ContactPage } from '../pages/ContactPage';

for (let i = 1; i <= 5; i++) {
  test(`Successful contact form submission - Run ${i}`, async ({ page }) => {
    const testData = generateTestData(i);

    await page.goto(BASE_URL);

    const home = new HomePage(page);
    await home.contactLink.click();

    const contact = new ContactPage(page);
    await expect(contact.submitBtn).toBeVisible();

    await contact.fillMandatoryFields(
      testData.forename,
      testData.email,
      testData.message
    );

    await contact.submitBtn.click();
    await expect(contact.successMsg).toBeVisible({ timeout: 10000 });
    await expect(contact.successMsg).toHaveText(
      new RegExp(`Thanks ${testData.forename}, we appreciate your feedback`, 'i'),
      { timeout: 10000 }
    );

    await page.waitForTimeout(1000); // Optional visual pause
  });
}
