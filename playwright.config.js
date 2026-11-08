import { defineConfig, devices } from '@playwright/test';

// Smoke tests: every simulation must load and run without JavaScript errors.
export default defineConfig({
    testDir: 'tests',
    fullyParallel: true,
    forbidOnly: Boolean(process.env.CI),
    reporter: process.env.CI ? 'github' : 'list',
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 800 } },
        },
    ],
});
