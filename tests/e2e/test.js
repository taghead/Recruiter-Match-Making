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
const logoutBtn = '[id="login"]';
const emailInput = 'input[type="email"]';
const passwordInput = 'input[type="password"]';
const roleDropdown = 'select[id="role"';
const signUpBtn = 'button[id="sign-up"]';
const signUpBtnRecruiterRole = 'employer';
const recruiterAccountDetailsBtn = '[id="account-details-icon"]'
const recruiterAccountDetailsEmail = '[id="user-title"]';
const recruiterAccountDetailsEmailID = recruiterAccountDetailsEmail.split("\"")[1];
const recruiterAccountDetailsInputUsername = '[id="user-name"]'; 
const recruiterAccountDetailsInputUsernameID = recruiterAccountDetailsInputUsername.split("\"")[1]; 
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
        const userName = 'John F Kenny';
        const company = 'Federal Kenny';
        const location = 'America, Sanos';

        await page.type(recruiterAccountDetailsInputUsername, userName); 
        await page.type(recruiterAccountDetailsInputCompany, company);
        await page.type(recruiterAccountDetailsInputLocation, location);
        await page.click(recruiterAccountDetailsUpdateBtn);

        await page.waitForTimeout(1000);
        await page.click(recruiterAccountDetailsBtn);
        
        await page.waitForFunction(
            `document.getElementById('${recruiterAccountDetailsInputUsernameID}').value.includes('${userName}')`
        );

        const userNameIs = await page.$eval(recruiterAccountDetailsInputUsername, e => e.value);
        expect(userNameIs).toBe(userName);

        const userCompanyIs = await page.$eval(recruiterAccountDetailsInputCompany, e => e.value);
        expect(userCompanyIs).toBe(company);

        const userLocationIs = await page.$eval(recruiterAccountDetailsInputLocation, e => e.value);
        expect(userLocationIs).toBe(location);

    });

    it('should be logged out', async () => {
        // Close Account Details
        await page.click(recruiterAccountDetailsUpdateBtn);
        await page.waitForTimeout(1000);
        
        // Cick logout
        await page.waitForTimeout(1000);
        await page.waitForSelector(logoutBtn);
        await page.click(logoutBtn);

        // Wait for page to update as it logs out
        await page.waitForTimeout(1000);
        await page.waitForSelector(loginBtn);
        
        // Check if logged out
        const loginStatus = await page.$eval(loginBtn, e => e.innerHTML);
        expect(loginStatus).toBe('Login');

    });

    // it('should be logged in', async () => {
        
    // });

    afterAll(() => browser.close());
});