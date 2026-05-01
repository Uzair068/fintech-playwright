import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  retries: process.env.CI ? 1 : 0, // retry once if running in CI
  workers: 1,
  timeout: 30000,

  reporter: [['html', { open: 'always' }], ['list']],

  use: {
    baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',
    headless: process.env.CI ? true : false, // hide browser in CI
    launchOptions: {
      slowMo: 600,          // ← Slows down Playwright operations by 100ms (great for learning)
    },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },
    {
      name: 'api',
      testMatch: /.*api.*\.spec\.ts/,
    },
  ],
});