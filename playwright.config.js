// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './e2e',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',
    use: {
        baseURL: 'http://localhost:4200',
        trace: 'on-first-retry',
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Pixel 5'] },
        },
    ],
    webServer: {
        command: 'NODE_OPTIONS=--openssl-legacy-provider npm start',
        url: 'http://localhost:4200',
        reuseExistingServer: !process.env.CI,
        timeout: 120 * 1000,
    },
});
