const { test, expect } = require('@playwright/test');

test.describe('App Navigation', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/intro');
        // Wait for hydration
        await page.waitForTimeout(1000);

        // Slide to the end
        await page.evaluate(() => {
            const slides = document.querySelector('ion-slides');
            if (slides) slides.slideTo(4);
        });

        // Wait for and click the START button
        const startButton = page.locator('ion-button', { hasText: /START/i });
        await expect(startButton).toBeVisible();
        await startButton.click();

        // Wait for the home page to load
        await expect(page).toHaveURL(/\/home/);
        await expect(page.locator('app-header')).toBeVisible({ timeout: 15000 });
    });

    test('should open the side menu and navigate to Memory Game', async ({ page }) => {
        // Already on /home thanks to beforeEach

        // Open the side menu
        // Ensure home page is fully loaded
        await expect(page.locator('app-header ion-button')).toBeVisible({ timeout: 15000 });
        const menuButton = page.locator('app-header ion-button');
        await menuButton.click();

        // The menu is side="end", wait for it to be visible
        const menu = page.locator('ion-menu[menuId="first"]');
        await expect(menu).toBeVisible();

        // Click on Memory Game link in the menu
        const memoryGameLink = page.locator('ion-item', { hasText: /Memory Game/i });
        await expect(memoryGameLink).toBeVisible();
        await memoryGameLink.click();

        // Should be on the memory cards page
        await expect(page).toHaveURL(/\/memory-cards/);
        await expect(page.locator('#board')).toBeVisible();
    });

    test('should open the Article based on Endings modal', async ({ page }) => {
        // Already on /home thanks to beforeEach

        // Open menu
        await expect(page.locator('app-header ion-button')).toBeVisible({ timeout: 15000 });
        await page.locator('app-header ion-button').click();

        // Click on Endings link
        const endingsLink = page.locator('ion-item', { hasText: /Article based on Endings/i });
        await endingsLink.click();

        // A modal should appear
        const modal = page.locator('ion-modal');
        await expect(modal).toBeVisible();

        // Should see a table with rules (or at least some content in the modal)
        // Check the modal's specific header
        await expect(modal.locator('ion-header')).toContainText(/endings/i);

        // Close the modal
        // Targeting the close button specifically and forcing it due to Ionic's shadow DOM overlays
        const closeButton = modal.locator('ion-button').filter({ has: page.locator('ion-icon[name="close"]') });
        await closeButton.click({ force: true });

        await expect(modal).not.toBeVisible();
    });

    test('should allow interaction with article buttons on home page', async ({ page }) => {
        // Already on /home thanks to beforeEach

        // Check for der, die, das buttons to be present
        // Using locator with text directly for Ionic custom elements
        const derBtn = page.locator('ion-button:has-text("Der")');
        const dieBtn = page.locator('ion-button:has-text("Die")');
        const dasBtn = page.locator('ion-button:has-text("Das")');

        await expect(derBtn).toBeVisible({ timeout: 20000 });
        await expect(dieBtn).toBeVisible();
        await expect(dasBtn).toBeVisible();

        // Click one to ensure it's interactive
        await derBtn.click();
    });

});
