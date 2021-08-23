const puppeteer = require('puppeteer');

const browserArgs = {
    headless: false,
    slowMo: 10
}

describe('Recruiter', () => {
    beforeAll(async () => {
        await page.goto('http://localhost:5000');
    });

    it('recruiter should be signed up', async () => {

        const browser = await puppeteer.launch(browserArgs);

        const page = await browser.newPage();

        await page.goto('http://localhost:5000');
        await page.click('[data-target="modal-login"]');
        await page.type('input[type="email"]', "recruiter@company.com");
        await page.type('input[type="password"]', "123123TA123123");
        await page.select('select[id="role"', 'employer');
        // await page.click('button[id="sign-up"]');
        
        await page.click('button[id="login"]');

        page
            .waitForSelector('a[id="account-details-icon"]')
            .then(() => page.click('a[id="account-details-icon"]'));

        page
            .waitForSelector('h4[id="user-title"]', 50)
            .then(() => {
                const loggedInAs = page.$eval('h4[id="user-title"]', el => console.log(el));
                expect(loggedInAs).toBe('recruiter@company.com');
            })

    });
});