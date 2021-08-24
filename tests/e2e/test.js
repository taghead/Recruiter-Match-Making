const puppeteer = require('puppeteer');
const firebaseConfig = require('../../firebase.json');

const browserArgs = {
    headless: false,
    // slowMo: 10
}

// Defines
const baseUrl = "http://localhost:"+firebaseConfig.emulators.hosting.port;

// Global Data
const recruiterEmail = "recruiter@company.com";
const recruiterPassword = "123123TA123123";

// Global References
const loginBtn = '[data-target="modal-login"]';
const emailInput = 'input[type="email"]';
const passwordInput = 'input[type="password"]';
const roleDropdown = 'select[id="role"';
const signUpBtn = 'button[id="sign-up"]';
const signUpBtnRecruiterRole = 'employer';
const recruiterAccountDetailsBtn = '[id="account-details-icon"]'
const recruiterAccountDetailsEmail = '[id="user-title"]';
const recruiterAccountDetailsEmailID = recruiterAccountDetailsEmail.split("\"")[1];
const recruiterAccountDetailsInputUsername = '[id="user-name"]'; 
const recruiterAccountDetailsInputCompany = '[id="user-comp"]';
const recruiterAccountDetailsInputLocation = '[id="user-loc"]';
const recruiterAccountDetailsUpdateBtn = 'button[id="user-update-btn"]';

describe('Recruiter', () => {
    let browser;
    let page;
    
    beforeAll(async () => {
        browser = await puppeteer.launch(browserArgs);
        page = await browser.newPage();
    });

    it('should be signed up', async () => {
        await page.goto(baseUrl);

        await page.click(loginBtn);
        await page.type(emailInput, recruiterEmail);
        await page.type(passwordInput, recruiterPassword);
        await page.select(roleDropdown, signUpBtnRecruiterRole);
        await page.click(signUpBtn);

        await page.waitForSelector(recruiterAccountDetailsBtn);
        await page.click(recruiterAccountDetailsBtn);

        await page.waitForFunction(
            `document.getElementById('${recruiterAccountDetailsEmailID}').innerText.includes('${recruiterEmail}')`
        );

        const loggedInAs = await page.$eval(recruiterAccountDetailsEmail, e => e.innerHTML);
        expect(loggedInAs).toBe(recruiterEmail);
    });

    it('added account details', async () => {
        await page.type(recruiterAccountDetailsInputUsername, 'John F Kenny'); 
        await page.type(recruiterAccountDetailsInputCompany, 'Federal Kenny');
        await page.type(recruiterAccountDetailsInputLocation, 'America, Sanos');
        await page.click(recruiterAccountDetailsUpdateBtn);

    });

    // it('should be logged out', async () => {
        
    // });

    // it('should be logged in', async () => {
        
    // });

    //afterAll(() => browser.close());
});