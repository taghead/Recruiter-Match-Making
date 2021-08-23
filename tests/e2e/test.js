const puppeteer = require('puppeteer');

('Recruiter Sign-Up', async () => {
    const browser = await puppeteer.launch({
                headless: false,
                slowMo: 10
            });

    const page = await browser.newPage();

    await page.goto('http://localhost:5000');
    await page.click('[data-target="modal-login"]');
    await page.type('input[type="email"]', "recruiter@company.com");
    await page.type('input[type="password"]', "123123TA123123");
    await page.select('select[id="role"', 'employer');
    // await page.click('button[id="sign-up"]');
    await page.click('button[id="login"]');
    page.waitForSelector('div[class="collapsible-header"]').then(() => {
        const loggedInAs = page.$eval('a[id="account-details"]', el => el.textContent);
        expect(loggedInAs).toBe('recruiter@company.com');
    })
    .catch((err) => {
        console.log(err);
    });

    // await page.screenshot({ path: 'example.png' });
    // await browser.close();
  })();