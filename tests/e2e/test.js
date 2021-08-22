// const puppeteer = require('puppeteer');

// test('test', async () => {
//     const browser = puppeteer.launch({
//         headless: false,
//         slowMo: 80,
//         args: ['--window-size=1920,1080']
//     });

//     const page = await browser.newPage();
// })

const puppeteer = require('puppeteer');

(async () => {
    const browser = puppeteer.launch({
        headless: false,
        slowMo: 80,
        args: ['--window-size=1920,1080']
    });

    //const page = await browser.newPage();

    // await page.goto('http://localhost:5000');
    //await page.screenshot({ path: 'example.png' });

    await browser.close();
})();