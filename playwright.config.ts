import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  retries: 0,
  workers: 1,
  timeout: 30000,

  reporter: [['html', { open: 'always' }], ['list']],

  use: {
    baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',
    headless: false,
    launchOptions: {
      slowMo: 600,          // ← Slows down Playwright operations by 100ms (great for learning)
    },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  projects: [
    // Step 1: Login and save session
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },

    // Step 2: Run UI tests WITH saved session
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'], // always run setup first
    },

    // Step 3: API tests (no browser needed)
    {
      name: 'api',
      testMatch: /.*api.*\.spec\.ts/,
    },
  ],
});