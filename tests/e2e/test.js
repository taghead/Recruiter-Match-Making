const puppeteer = require('puppeteer');

const browserArgs = {
    // headless: false,
    // slowMo: 10
}

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
const accountDetailsBtn = 'a[id="account-details-icon"]'

describe('Recruiter', () => {
    beforeAll(async () => {
    });
    
    it('recruiter should be signed up', async () => {
        const browser = await puppeteer.launch(browserArgs);
        const page = await browser.newPage();
        await page.goto('http://localhost:5000');

        await page.click(loginBtn);
        await page.type(emailInput, recruiterEmail);
        await page.type(passwordInput, recruiterPassword);
        await page.select(roleDropdown, signUpBtnRecruiterRole);
        await page.click(signUpBtn);

        await page
            .waitForSelector(accountDetailsBtn)
            .then(() => page.click(accountDetailsBtn));

        await page.waitForFunction(
            `document.getElementById('user-title').innerText.includes("recruiter@company.com")`,
          );

        const loggedInAs = await page.$eval('[id="user-title"]', e => e.innerHTML);
        expect(loggedInAs).toBe(recruiterEmail);

        browser.close();
    });
});