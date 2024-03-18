const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

(async function testPageNotFound() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Open the page
        await driver.get('http://localhost:3000/#/notfound');

        // Wait for the page to load
        await driver.wait(until.titleIs('Page Not Found'));

        // Verify the page title
        let title = await driver.getTitle();
        assert.strictEqual(title, 'Page Not Found');

        // Verify the presence of the 404 text
        let notFoundText = await driver.findElement(By.tagName('h1')).getText();
        assert.strictEqual(notFoundText, '404');

        // Verify the presence of the image
        let image = await driver.findElement(By.tagName('img'));
        assert.strictEqual(await image.isDisplayed(), true);

        // Verify the presence of the message text
        let messageText = await driver.findElement(By.tagName('p')).getText();
        assert.strictEqual(messageText, 'Page not found');

        console.log('All tests passed successfully!');
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        await driver.quit();
    }
})();
