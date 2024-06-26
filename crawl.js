const puppeteer = require('puppeteer');
(async () => {
    const browser =  await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://cloud.eais.go.kr/');
    await page.click('selector-for-issuance-button');
    await page.type('input-selector', '경기도 고양시 일산동구 강석로 152 강촌마을아파트 제701동 제2층 제202호 [마두동 796]')
    await browser.close();
})()