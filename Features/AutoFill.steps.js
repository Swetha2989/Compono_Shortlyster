const { Given, When, Then, BeforeAll, AfterAll, setDefaultTimeout } = require("@cucumber/cucumber");
const { assert, expect } = require("chai");
const { chromium, firefox } = require("playwright");
const dotenv = require("dotenv");

dotenv.config();
async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

setDefaultTimeout(50* 1000);

/********************
 * launch browser
 ********************/
BeforeAll(async function(){

    global.browser = await chromium.launch({
        // args: ["--disable-dev-shm-usage"] ,// Suggested configuration to run Playwright test in CI env,
        headless: false,
        slowMo:50
    });

    global.context = await browser.newContext( { ignoreHTTPSErrors: true } )
    global.page = await context.newPage({ ignoreHTTPSErrors: true })
})

/********************
 * Close the browser
 ********************/
AfterAll(async function (){
    await global.browser.close();
})
/********************
 * Preconditions
 ********************/
Given('the candidate is able to access the profile page', async function () {
    this.page = page;
    await this.page.goto(process.env.BASE_URL);
    await this.page.type('input[name=email]', process.env.TEST_USERNAME)    
    await this.page.type('input[name=password]', process.env.TEST_PASSWORD)
    await this.page.press('input[name=password]','Enter');
    console.log("Given URL:")
    console.log(await this.page.url())
  });

/********************
 * User performs actoin
 ********************/
  When('the candidate clicks on upload CV with prefill option', async function () {
    this.page = page;
    await this.page.click("#cv >> text=Upload your CV");
    await this.page.setInputFiles('input[name="cv-upload"]', '/Users/swethachevuru/Documents/Swetha/Swetha Chevuru_CV.docx');
  });

/******************************
 * Validate the output
 *****************************/
  Then('the candidate should be able to see {string}', async function (expectedString) {
    this.page = page;
    await this.page.waitForSelector('text=Your CV has been uploaded, and your profile has been prefilled!');
    let actualString = await this.page.$eval('data-test-id=upload-dialog', node => node.innerText);
    expect(actualString, 'Not as Expected').to.include(expectedString)
  });

 