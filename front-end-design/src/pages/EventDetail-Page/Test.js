const { Builder, By, until } = require('selenium-webdriver');

async function testEventDetails() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Replace with the actual URL where your EventDetails component is served
        await driver.get('http://localhost:3000/event/0'); // Example URL

        // Wait for the event title to be loaded and visible
        const eventTitle = await driver.wait(until.elementLocated(By.className('event-title')), 10000);
        console.log('Event title is present.');

        // Check for the presence of other event details
        const eventDate = await driver.findElement(By.className('event-date')).getText();
        console.log('Event date is:', eventDate);

        const description = await driver.findElement(By.className('description')).getText();
        if (description.includes('Join us for an unforgettable night')) {
            console.log('Event description is correct.');
        }

        // Assert the "Buy Ticket" button is present and clickable
        const buyTicketButton = await driver.findElement(By.className('buy-ticket-button'));
        await driver.wait(until.elementIsEnabled(buyTicketButton), 5000);
        console.log('"Buy Ticket" button is present and clickable.');

        // Optionally, click the "Buy Ticket" button to test its functionality
        // buyTicketButton.click();
        // Additional checks after button click can be implemented here

    } finally {
        await driver.quit();
    }
}

testEventDetails().then(() => console.log('Test completed.'));
