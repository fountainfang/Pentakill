const { Builder, By, Key, until } = require('selenium-webdriver');

(async function testUserProfile() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Navigate to the UserProfile page
        await driver.get('http://localhost:3000/#/userprofile');

        // Verify connection by checking if the body is present
        console.log('Verifying page connection...');
        await driver.wait(until.elementLocated(By.css('body')), 10000)
            .then(() => console.log('Connection verified.'),
                () => console.error('Failed to connect to the page.'));

        // Verify the page title to ensure the correct page is loaded
        console.log('Verifying page title...');
        const title = await driver.getTitle();
        console.assert(title === 'UserProfile', 'Page title verification failed. Found title: ' + title);



        // Test Edit button presence
        console.log('Testing Edit button presence...');
        const editButton = await driver.findElement(By.css('button.MuiButtonBase-root'));
        console.assert(await editButton.isDisplayed(), 'Edit button not found.');



        console.log('All tests passed successfully.');
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        await driver.quit();
    }
})();
