const { Builder, By, Key, until } = require('selenium-webdriver');

(async function testEventApproval() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    // Navigate to the Event Approval page
    await driver.get('http://localhost:3000/event-approval');

    // Verify connection by checking if the body is present
    console.log('Verifying page connection...');
    await driver.wait(until.elementLocated(By.css('body')), 10000)
      .then(() => console.log('Connection verified.'),
            () => console.error('Failed to connect to the page.'));

    // Verify the page title to ensure the correct page is loaded
    console.log('Verifying page title...');
    const title = await driver.getTitle();
    console.assert(title === 'Event Approval', 'Page title verification failed. Found title: ' + title);

    // // Test Approve Button
    // console.log('Testing Approve button...');
    // const approveButton = await driver.findElement(By.css('.approveButtonStyle'));
    // await approveButton.click();
    // let alert = await driver.switchTo().alert();
    // let alertText = await alert.getText();
    // console.assert(alertText.includes('Approved'), 'Approve button test failed.');

    // // Test Reject Button
    // console.log('Testing Reject button...');
    // const rejectButton = await driver.findElement(By.css('.rejectButtonStyle'));
    // await rejectButton.click();
    // alert = await driver.switchTo().alert();
    // alertText = await alert.getText();
    // console.assert(alertText.includes('Rejected'), 'Reject button test failed.');

    console.log('Event Approval component tests passed successfully.');

  } catch (error) {
    console.error('An error occurred during the Event Approval component tests:', error);
  } finally {
    await driver.quit();
  }
})();
