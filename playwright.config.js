import { defineConfig, devices } from '@playwright/test'
const preview = 'npm run preview -- --outDir test-build --host 127.0.0.1 --port 4173 --strictPort'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  workers: 2,
  reporter: 'list',
  use: { baseURL: 'http://127.0.0.1:4173', trace: 'retain-on-failure' },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'phone', use: { ...devices['iPhone 13'], defaultBrowserType: 'chromium' } },
  ],
  webServer: {
    command: process.env.PLAYWRIGHT_PREBUILT === '1'
      ? preview
      : `npm run build -- --outDir test-build && ${preview}`,
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: false,
    timeout: 120_000,
  },
})
