const { test, expect } = require('@playwright/test');

test.describe('App Navigation', () => {

    test('should navigate from intro to home', async ({ page }) => {
        await page.goto('/intro');

        // Slide to the end or click through slides
        // The explorer used slides.slideTo(4) which is effective
        await page.evaluate(() => {
            const slides = document.querySelector('ion-slides');
            if (slides) slides.slideTo(4);
        });

        // Wait for the START button on the last slide
        const startButton = page.locator('ion-button', { hasText: /START/i });
        await expect(startButton).toBeVisible();
        await startButton.click();

        // Should be on the home page
        await expect(page).toHaveURL(/\/home/);
        await expect(page.locator('ion-card')).toBeVisible();
    });

    test('should open the side menu and navigate to Memory Game', async ({ page }) => {
        await page.goto('/home');

        // Open the side menu
        // The menu button is an ion-button with an ellipsis icon
        const menuButton = page.locator('ion-button').filter({ has: page.locator('ion-icon[name="ellipsis-vertical-outline"]') });
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
        await expect(page.locator('ion-grid')).toBeVisible();
    });

    test('should open the Article based on Endings modal', async ({ page }) => {
        await page.goto('/home');

        // Open menu
        await page.locator('ion-button').filter({ has: page.locator('ion-icon[name="ellipsis-vertical-outline"]') }).click();

        // Click on Endings link
        const endingsLink = page.locator('ion-item', { hasText: /Article based on Endings/i });
        await endingsLink.click();

        // A modal should appear
        const modal = page.locator('ion-modal');
        await expect(modal).toBeVisible();

        // Should see a table with rules (or at least some content in the modal)
        // The modal content might be inside a different component but let's look for common indicators
        await expect(page.locator('ion-header')).toContainText(/endings/i);

        // Close the modal
        // Targeting the close icon specifically
        const closeIcon = page.locator('ion-icon[name="close"]');
        await closeIcon.click();

        await expect(modal).not.toBeVisible();
    });

    test('should allow interaction with article buttons on home page', async ({ page }) => {
        await page.goto('/home');

        // Check for der, die, das buttons to be present
        // Using a generous timeout for initial app load and data fetch
        const derBtn = page.getByRole('button', { name: /^Der$/i });
        const dieBtn = page.getByRole('button', { name: /^Die$/i });
        const dasBtn = page.getByRole('button', { name: /^Das$/i });

        await expect(derBtn).toBeVisible({ timeout: 20000 });
        await expect(dieBtn).toBeVisible();
        await expect(dasBtn).toBeVisible();

        // Click one to ensure it's interactive
        await derBtn.click();
    });

});
