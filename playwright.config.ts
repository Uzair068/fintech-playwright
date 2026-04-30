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
    headless: false,        // ← You'll SEE the browser open (great for learning)
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});