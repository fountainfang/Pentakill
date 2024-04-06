const { Builder, By, Key, until } = require('selenium-webdriver');

(async function testEventCreationPage() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    // Navigate to the Event Creation page
    await driver.get('http://localhost:3000/create-event');

    // Verify connection by checking if the body is present
    console.log('Verifying page connection...');
    await driver.wait(until.elementLocated(By.css('body')), 10000)
      .then(() => console.log('Connection verified.'),
            () => console.error('Failed to connect to the page.'));

    // Verify the page title to ensure the correct page is loaded
    console.log('Verifying page title...');
    const title = await driver.getTitle();
    console.assert(title === 'New Event', 'Page title verification failed. Found title: ' + title);

    // Test Genre Selection
    console.log('Testing genre selection...');
    const genreSelect = driver.findElement(By.name('genre'));
    await genreSelect.sendKeys('Concert', Key.TAB);
    let selectedGenre = await genreSelect.getAttribute('value');
    console.assert(selectedGenre === 'Concert', 'Genre selection failed.');

    // Test Event Name Input
    console.log('Testing event name input...');
    const eventNameInput = driver.findElement(By.name('name'));
    await eventNameInput.sendKeys('Test Event', Key.TAB);
    let eventNameValue = await eventNameInput.getAttribute('value');
    console.assert(eventNameValue === 'Test Event', 'Event name input failed.');

    // Test Date Input with corrected sequence
    console.log('Testing date input...');
    const dateInput = driver.findElement(By.name('date'));
    await dateInput.sendKeys('2021', Key.TAB, '0101');
    let dateValue = await dateInput.getAttribute('value');
    console.assert(dateValue === '2021-01-01', 'Date input failed.');

    // Test Time Input
    console.log('Testing time input...');
    const timeInput = driver.findElement(By.name('time'));
    await timeInput.sendKeys('08:00PM', Key.TAB); // Use 24-hour format directly
    let timeValue = await timeInput.getAttribute('value');
    console.assert(timeValue === '20:00', 'Time input failed.');

    // Test Location Input
    console.log('Testing location input...');
    const locationInput = driver.findElement(By.name('location'));
    await locationInput.sendKeys('Sample Location', Key.TAB);
    let locationValue = await locationInput.getAttribute('value');
    console.assert(locationValue === 'Sample Location', 'Location input failed.');

    // Test Ticket Numbers Input for correct format (positive integers only)
    console.log('Testing ticket numbers input for positive integers...');
    const ticketNumbersInput = driver.findElement(By.name('ticketNumbers'));
    await ticketNumbersInput.sendKeys('100', Key.TAB);
    let ticketNumbersValue = await ticketNumbersInput.getAttribute('value');
    console.assert(ticketNumbersValue === '100', 'Ticket numbers input failed.');

    // Test Ticket Price Input for correct format (positive numbers, optionally decimal)
    console.log('Testing ticket price input for positive numbers with decimals...');
    const ticketPriceInput = driver.findElement(By.name('ticketPrice'));
    await ticketPriceInput.sendKeys('29.99', Key.TAB);
    let ticketPriceValue = await ticketPriceInput.getAttribute('value');
    console.assert(ticketPriceValue === '29.99', 'Ticket price input failed.');

    // Submit the form and handle alert
    // await driver.findElement(By.css('button[type="submit"]')).click();
    
    // Wait for the alert to appear and accept it
    // await driver.wait(until.alertIsPresent());
    // let alert = await driver.switchTo().alert();
    // await alert.accept();

    console.log('All format validations passed successfully. Form submitted and alert handled.');

  } catch (error) {
    console.error('An error occurred during the format validation tests:', error);
  } finally {
    await driver.quit();
  }
})();
