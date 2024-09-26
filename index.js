// Import the required libraries
const puppeteer = require('puppeteer');
require('dotenv').config();

// Configuration
const faucetUrl = 'http://www.freenanofaucet.com/';
const refreshRate = 900000; // 900 seconds in milliseconds
const nanoAddress = process.env.NANO_ADDRESS;

// Main function to run the bot
(async () => {
  console.log('Starting Nano Generator Bot...');
  let attempt = 0;

  // Launch Puppeteer browser
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  while (true) {
    try {
      attempt++;
      console.log(`Number of tries: ${attempt}`);
      
      // Navigate to the faucet URL
      await page.goto(faucetUrl, { waitUntil: 'networkidle2' });

      // Find the input field and enter the Nano address
      await page.type('#nanoAddr', nanoAddress);

      // Find the button and click
      await page.click('#getNano');

      // Wait for the refresh rate before trying again
      console.log(`Waiting for ${refreshRate / 1000} seconds before next attempt...`);
      await page.waitForTimeout(refreshRate);
    } catch (error) {
      console.error(`Error on attempt ${attempt}:`, error);
    }
  }
})();
