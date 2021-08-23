const puppeteer = require('puppeteer');

(async () => {
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
    await page.click('button[id="sign-up"]');

    // await page.screenshot({ path: 'example.png' });
    // await browser.close();
  })();