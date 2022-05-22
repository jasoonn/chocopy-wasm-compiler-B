// @ts-nocheck
import * as webdriver from 'selenium-webdriver';
import "mocha";
import { expect } from "chai";
import { doesNotMatch } from 'assert';
import {Options} from 'selenium-webdriver/chrome'
require('chromedriver');


export async function assertPrint(source: string, expected: Array<string>, driver: any) {
    //Show to debug
    //await driver.manage().window().maximize();
    //Send and run user-code
    await driver.findElement(webdriver.By.id("user-code")).sendKeys(source);
    await driver.findElement(webdriver.By.id("run")).click(); 
    //Check output length is equal to expected
    let vars = await driver.findElements(webdriver.By.xpath("//*[@id=\"output\"]/pre"));
    expect(vars.length).to.deep.eq(expected.length+1);
    //Retrieve output as array
    let results = [];
    for (let i=1; i<expected.length+1; i++) {
        results.push(await driver.findElement(webdriver.By.xpath(`//*[@id=\"output\"]/pre[${i}]`)).getText());
    }
    expect(expected).to.deep.eq(results);
}

// Assert an error gets thrown at runtime
// export function assertFail(name: string, source: string) {
//     //Show to debug
//     await driver.manage().window().maximize();
    
// }

// async function example(){
//     let driver = await new webdriver.Builder().forBrowser("chrome").build();
//     await driver.get("http://127.0.0.1:8080/index.html");
//     await(assertPrint(`
// print(123)
// print(456)`, ["123", "456"], driver));
// }
// example();


describe("PA3 browser tests", () => {
    var driver;
    beforeEach(async function () {
        this.timeout(0);
        const opts = new Options();
        opts.addArguments('--headless', '--no-sandbox')
        driver = await new webdriver.Builder().forBrowser("chrome").setChromeOptions(opts).build();
        await driver.get("http://127.0.0.1:1234/index.html");
        
    });
    afterEach(async function () {
        await driver.quit();
    });

    it('Simple testing', async function () {
        await(assertPrint(`
print(123)
print(456)`, ["123", "456"], driver));
    });

});