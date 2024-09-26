// src/nanoGenerator.js
const puppeteer = require('puppeteer');
const config = require('./config');

(async () => {
    const browser = await puppeteer.launch({ headless: true }); // Set headless to false for debugging
    const page = await browser.newPage();
    await page.goto("http://" + config.url);

    let i = 0;
    try {
        while (true) {
            i += 1;
            // Type the Nano address into the input field
            await page.type('#nanoAddr', config.nanoAddress);
            // Click the button to get Nano
            await page.click('#getNano');
            console.log('Number of tries:', i);

            // Wait for the specified refresh rate
            await page.waitForTimeout(config.refreshRate * 1000);
            // Go back to the previous page
            await page.goBack();
        }
    } catch (error) {
        console.error('Error occurred:', error);
    } finally {
        await browser.close(); // Ensure the browser is closed when done
    }
})();
