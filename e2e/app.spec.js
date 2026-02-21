const { test, expect } = require('@playwright/test');

test.describe('Intro Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/intro');
        // Wait for the app to settle
        await page.waitForTimeout(2000);
    });

    test('should display the correct intro title', async ({ page }) => {
        // Wait for the intro content to be visible
        const heading = page.locator('ion-slide.swiper-slide-active h1');
        await expect(heading).toBeVisible({ timeout: 10000 });
        await expect(heading).toContainText(/Artikel Welt/i);
    });

    test('should have multiple slides', async ({ page }) => {
        const slides = page.locator('ion-slide');
        await expect(slides).toHaveCount(5);
    });

    test('capture clean screenshot', async ({ page }) => {
        // Remove glowing frame / gradient
        await page.evaluate(() => {
            const elements = document.querySelectorAll('*');
            for (const el of elements) {
                const style = window.getComputedStyle(el);
                if (style.backgroundImage.includes('gradient') || style.background.includes('gradient')) {
                    el.style.backgroundImage = 'none';
                    el.style.background = 'var(--ion-color-secondary)';
                }
                if (style.boxShadow && style.boxShadow !== 'none') {
                    el.style.boxShadow = 'none';
                }
            }

            // Specifically target ion-content and root background
            const ionContent = document.querySelector('ion-content');
            if (ionContent) {
                ionContent.style.setProperty('--background', 'var(--ion-color-secondary)', 'important');
            }

            // Force background to secondary color defined in variables.scss (#423451)
            document.body.style.setProperty('background', '#423451', 'important');
            document.documentElement.style.setProperty('background', '#423451', 'important');
        });

        // Take screenshot and save to the docs directory
        await page.screenshot({ path: 'docs/images/screenshot.png', fullPage: true });
    });
});
