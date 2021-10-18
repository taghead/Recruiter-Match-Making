require('dotenv').config();
const puppeteer = require('puppeteer');
const firebaseConfig = require('../../firebase.json');

// Browser Arguments
let browserHeadlessArg = true;

if ( process.env.DISABLE_HEADLESS_TESTS.toLowerCase() == 'true' ){
    browserHeadlessArg = false;
}

const browserArgs = {
    headless: browserHeadlessArg,
    slowMo: process.env.SLOW_SPEED_TESTS
}

// Defines
const baseUrl = "http://localhost:"+firebaseConfig.emulators.hosting.port;

// Global Data
const recruiterEmail = "recruiter@company.com";
const recruiterPassword = "123123TA123123";
const recruiterUserName = 'John F Kenny';
const recruiterCompany = 'Federal Kenny';
const recruiterLocation = 'America, Sanos';

const recruiterJobListingName = "Worker Needed - Pizza Cook";
const recruiterJobListingDescription = "Must be able to make pizzas";
const recruiterJobListingSkills = ["Cook","Cleaning","Cashiering"];

// Global References
const loginModalBtn = '[data-target="modal-login"]';
const loginOrLogoutButton = '[id="login"]';
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
const recruiterAccountDetailsInputEmail = '[id="user-email]"';
const recruiterAccountDetailsInputEmailID = recruiterAccountDetailsInputEmail.split("\"")[1];
const recruiterAccountDetailsUpdateBtn = 'button[id="user-update-btn"]';
const recruiterCreateJobModalBtn = '[data-target="modal-create"]';
const recruiterCreateJobDetailsInputName = '[id="job-name"]';
const recruiterCreateJobDetailsInputDescription = '[id="description"]';
const recruiterCreateJobDetailsInputSkills = '[id="skills-input"]';
const recruiterCreateJobDetailsInputSkillsElement = '[id="skills"]';
const recruiterCreateJobDetailsInputSkillsBtn = '[id="create-job-listing"]';
const recruiterPageJobList = '[id="job-list"]';

describe('Recruiter', () => {
    let browser;
    let page;
    
    beforeAll(async () => {
        browser = await puppeteer.launch(browserArgs);
        page = await browser.newPage();
    });

    it('should be signed up', async () => {
        await page.goto(baseUrl);

        await page.click(loginModalBtn);
        await page.type(emailInput, recruiterEmail);
        await page.type(passwordInput, recruiterPassword);
        await page.select(roleDropdown, signUpBtnRecruiterRole);
        await page.click(signUpBtn);

        await page.waitForTimeout(1000);

        await page.waitForSelector(recruiterAccountDetailsBtn);
        await page.waitForTimeout(1000);
        await page.click(recruiterAccountDetailsBtn);

        await page.waitForFunction(
            `document.getElementById('${recruiterAccountDetailsEmailID}').innerText.includes('${recruiterEmail}')`
        );

        const loggedInAs = await page.$eval(recruiterAccountDetailsEmail, e => e.innerHTML);
        expect(loggedInAs).toBe(recruiterEmail);
    }, 20000);

    it('added account details', async () => {
        await page.type(recruiterAccountDetailsInputUsername, recruiterUserName); 
        await page.type(recruiterAccountDetailsInputCompany, recruiterCompany);
        await page.type(recruiterAccountDetailsInputLocation, recruiterLocation);
        await page.click(recruiterAccountDetailsUpdateBtn);

        await page.waitForTimeout(1000);
        await page.click(recruiterAccountDetailsBtn);
        
        await page.waitForFunction(
            `document.getElementById('${recruiterAccountDetailsInputUsernameID}').value.includes('${recruiterUserName}')`
        );

        const userNameIs = await page.$eval(recruiterAccountDetailsInputUsername, e => e.value);
        expect(userNameIs).toBe(recruiterUserName);

        const userCompanyIs = await page.$eval(recruiterAccountDetailsInputCompany, e => e.value);
        expect(userCompanyIs).toBe(recruiterCompany);

        const userLocationIs = await page.$eval(recruiterAccountDetailsInputLocation, e => e.value);
        expect(userLocationIs).toBe(recruiterLocation);

    }, 6000);

    it('should be logged out', async () => {
        // Close Account Details
        await page.click(recruiterAccountDetailsUpdateBtn);
        await page.waitForTimeout(1000);
        
        // Cick logout
        await page.waitForTimeout(1000);
        await page.waitForSelector(loginOrLogoutButton);
        await page.click(loginOrLogoutButton);

        // Wait for page to update as it logs out
        await page.waitForTimeout(1000);
        await page.waitForSelector(loginModalBtn);
        
        // Check if logged out
        const loginStatus = await page.$eval(loginModalBtn, e => e.innerText);
        expect(loginStatus).toBe('Login');

    }, 6000);

    it('should be signed in with existing credentials', async () => {
        await page.click(loginModalBtn);
        await page.type(emailInput, recruiterEmail);
        await page.type(passwordInput, recruiterPassword);
        await page.select(roleDropdown, signUpBtnRecruiterRole);
        await page.click(loginOrLogoutButton);

        await page.waitForTimeout(1000);
        await page.waitForSelector(recruiterAccountDetailsBtn);
        await page.click(recruiterAccountDetailsBtn);
        await page.waitForTimeout(2000);

        await page.waitForFunction(
            `document.getElementById('${recruiterAccountDetailsInputUsernameID}').value.includes('${recruiterUserName}')`
        );

        const userNameIs = await page.$eval(recruiterAccountDetailsInputUsername, e => e.value);
        expect(userNameIs).toBe(recruiterUserName);

        const userCompanyIs = await page.$eval(recruiterAccountDetailsInputCompany, e => e.value);
        expect(userCompanyIs).toBe(recruiterCompany);

        const userLocationIs = await page.$eval(recruiterAccountDetailsInputLocation, e => e.value);
        expect(userLocationIs).toBe(recruiterLocation);
    }, 6000);

    it('should be able to create job listing', async () => {
        await page.click(recruiterAccountDetailsBtn);
        await page.waitForTimeout(1000);
        await page.click(recruiterCreateJobModalBtn);
        await page.waitForTimeout(1000);

        await page.type(recruiterCreateJobDetailsInputName, recruiterJobListingName);
        await page.type(recruiterCreateJobDetailsInputDescription, recruiterJobListingDescription);

        for ( i in recruiterJobListingSkills ) {
            await page.type(recruiterCreateJobDetailsInputSkills, recruiterJobListingSkills[i]);
            await page.waitForTimeout(1000);
            page.click(`${recruiterCreateJobDetailsInputSkillsElement} > ul`);
            await page.waitForTimeout(1000);
        }

        page.click(recruiterCreateJobDetailsInputSkillsBtn);

        await page.waitForTimeout(10000);
        const jobIsListed = await page.$eval(recruiterPageJobList, e => e.innerHTML);
        expect(jobIsListed.match(recruiterJobListingName)[0])
            .toBe(recruiterJobListingName);

    }, 40000);

    afterAll(() => {
        if ( process.env.PERSISTANT_BROWSER_TESTS.toLowerCase() != 'true' ) {
            browser.close();
        }
    });
});