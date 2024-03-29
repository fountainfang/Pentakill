const { Builder, By, Key, until } = require('selenium-webdriver');

const onSubmit = (e) => {
    e.preventDefault();
    console.log({ username, password });
    props.authActions.asyncsetUserObj({ username, password })
        .then(res => {
            if (res && res.data && res.data.status === 200) {
                console.log(res.data);
                console.log(res.data.status);
                navigate('/userprofile', { state: { userData: res.data } });
            } else {
                alert('Login failed! Please check your credentials.');
            }
        })
        .catch(error => {
            console.error('An error occurred:', error);
            alert('An error occurred while logging in. Please try again later.');
        });
};

async function signInTest() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://localhost:3000/signin'); // Replace 'http://your_website_url' with the actual URL of your website

        // Wait for the form to load
        await driver.wait(until.elementLocated(By.tagName('form')), 10000);

        // Find the username input field and enter username
        await driver.findElement(By.name('username')).sendKeys('test1');

        // Find the password input field and enter password
        await driver.findElement(By.name('password')).sendKeys('aaa');

        // Find and click the login button
        await driver.findElement(By.className('btn-primary')).click();

        // Wait for the page to load after login
        await driver.wait(until.urlContains('/userprofile'), 10000);

        // Assert that the user has been navigated to the user profile page
        const currentUrl = await driver.getCurrentUrl();
        await driver.wait(until.urlContains('/userprofile'), 20000);

        if (currentUrl.includes('/userprofile')) {
            console.log('Login test passed!');
        } else {
            console.log('Login test failed!');
        }
    } finally {
        // Close the browser
        await driver.quit();
    }
}

// Run the test
signInTest();
