const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

(async function testOrderConfirmationPage() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        console.log('Step 1: Opening the page...');
        await driver.get('http://localhost:3000/confirmation/1');

        console.log('Step 2: Waiting for the page to load...');
        await driver.wait(until.titleIs('Order Confirmation Page'), 10000); // Waits up to 10 seconds

        console.log('Step 3: Verifying the page title...');
        let title = await driver.getTitle();
        assert.strictEqual(title, 'Order Confirmation Page');

        console.log('Step 4: Verifying the presence of the event title and order confirmation message...');
        let eventTitleElement = await driver.findElement(By.css('h3'));
        let eventTitleText = await eventTitleElement.getText();
        assert.ok(eventTitleText.includes('Order Confirmed!'), 'Event title and order confirmation message not found on the page');

        console.log('Step 5: Verifying the presence of the event location icon...');
        let locationIcon = await driver.findElement(By.css('svg[data-testid="LocationOnIcon"]')); // Assuming you add `data-testid="LocationOnIcon"` to the icon component
        assert.ok(locationIcon, 'Event location icon element not found on the page');

        console.log('Step 6: Verifying the presence of the share event button...');
        let shareButton = await driver.findElement(By.xpath("//button[contains(.,'Share Event')]"));
        assert.ok(shareButton, 'Share event button element not found on the page');

        console.log('Step 7: Verifying the presence of the leave feedback button...');
        let feedbackButton = await driver.findElement(By.xpath("//button[contains(.,'Leave Feedback')]"));
        assert.ok(feedbackButton, 'Leave feedback button element not found on the page');

        console.log('All UI tests passed successfully!');
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        await driver.quit();
    }
})();
