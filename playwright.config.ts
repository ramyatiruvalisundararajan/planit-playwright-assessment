import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  

  reporter: [['list'], ['allure-playwright']],

  use: {
    baseURL: 'http://jupiter.cloud.planittesting.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: true,
  },

  projects: [
    {
      name: 'chromium',
      use: Object.assign({}, devices['Desktop Chrome'], {
        headless: false,
        slowMo: 1500,
      }),
    },
    {
      name: 'firefox',
      use: Object.assign({}, devices['Desktop Firefox'], {
        headless: false,
        slowMo: 500,
      }),
    },
    {
      name: 'webkit',
      use: Object.assign({}, devices['Desktop Safari'], {
        headless: false,
        slowMo: 500,
      }),
    },
  ],
});
