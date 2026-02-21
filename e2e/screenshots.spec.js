const { test, expect } = require('@playwright/test');

async function cleanUI(page) {
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

        const ionContent = document.querySelector('ion-content');
        if (ionContent) {
            ionContent.style.setProperty('--background', 'var(--ion-color-secondary)', 'important');
        }

        // Force background to secondary color defined in variables.scss (#423451)
        document.body.style.setProperty('background', '#423451', 'important');
        document.documentElement.style.setProperty('background', '#423451', 'important');
    });
}

test.describe('Capture App Screenshots', () => {

    test('intro screen', async ({ page }) => {
        await page.goto('/intro');
        await page.waitForTimeout(2000);
        await cleanUI(page);
        await page.screenshot({ path: 'docs/images/intro.png' });
    });

    test('home screen', async ({ page }) => {
        await page.goto('/intro');
        await page.waitForTimeout(1000);

        // Skip intro
        await page.evaluate(() => {
            const slides = document.querySelector('ion-slides');
            if (slides) slides.slideTo(4);
        });
        const startButton = page.locator('ion-button', { hasText: /START/i });
        await startButton.click();
        await expect(page).toHaveURL(/\/home/);
        await page.waitForTimeout(2000);

        await cleanUI(page);
        await page.screenshot({ path: 'docs/images/home.png' });
    });

    test('side menu', async ({ page }) => {
        await page.goto('/intro');
        await page.waitForTimeout(1000);
        await page.evaluate(() => {
            const slides = document.querySelector('ion-slides');
            if (slides) slides.slideTo(4);
        });
        await page.locator('ion-button', { hasText: /START/i }).click();
        await expect(page).toHaveURL(/\/home/);

        // Open menu
        await page.locator('app-header ion-button').click();
        await page.waitForTimeout(1000);

        await cleanUI(page);
        await page.screenshot({ path: 'docs/images/menu.png' });
    });

    test('memory game', async ({ page }) => {
        await page.goto('/intro');
        await page.waitForTimeout(1000);
        await page.evaluate(() => {
            const slides = document.querySelector('ion-slides');
            if (slides) slides.slideTo(4);
        });
        await page.locator('ion-button', { hasText: /START/i }).click();
        await expect(page).toHaveURL(/\/home/);

        // Go to memory game
        await page.locator('app-header ion-button').click();
        await page.locator('ion-item', { hasText: /Memory Game/i }).click();
        await expect(page).toHaveURL(/\/memory-cards/);
        await page.waitForTimeout(2000);

        await cleanUI(page);
        await page.screenshot({ path: 'docs/images/memory.png' });
    });

    test('endings modal', async ({ page }) => {
        await page.goto('/intro');
        await page.waitForTimeout(1000);
        await page.evaluate(() => {
            const slides = document.querySelector('ion-slides');
            if (slides) slides.slideTo(4);
        });
        await page.locator('ion-button', { hasText: /START/i }).click();
        await expect(page).toHaveURL(/\/home/);

        // Open modal
        await page.locator('app-header ion-button').click();
        await page.locator('ion-item', { hasText: /Article based on Endings/i }).click();
        await expect(page.locator('ion-modal')).toBeVisible();
        await page.waitForTimeout(1000);

        await cleanUI(page);
        await page.screenshot({ path: 'docs/images/endings.png' });
    });
});
