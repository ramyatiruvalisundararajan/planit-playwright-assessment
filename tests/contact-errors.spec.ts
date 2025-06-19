import { test, expect } from '@playwright/test';
import { BASE_URL, generateTestData } from '../utils/constants';
import { HomePage } from '../pages/HomePage';
import { ContactPage } from '../pages/ContactPage';

test('Verify error messages are shown then disappear', async ({ page }) => {
  await page.goto(BASE_URL);
  const home = new HomePage(page);
  await home.contactLink.click();

  const contact = new ContactPage(page);
  await expect(contact.submitBtn).toBeVisible();
  await contact.submitBtn.click();

  await expect(contact.forenameErr).toBeVisible();
  await expect(contact.emailErr).toBeVisible();
  await expect(contact.messageErr).toBeVisible();

  const testData = generateTestData(0);

  await contact.fillMandatoryFields(
    testData.forename,
    testData.email,
    testData.message
  );

  await page.waitForTimeout(2000);

  await expect(contact.forenameErr).toBeHidden();
  await expect(contact.emailErr).toBeHidden();
  await expect(contact.messageErr).toBeHidden();

  await page.waitForTimeout(2000);
});
