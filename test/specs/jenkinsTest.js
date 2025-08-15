import { assert } from "chai";
import Browser from "../../framework/browser/Browser.js";
import { mainConfig } from "../../framework/configs/main.wdio.conf.js";
import MainPage from "../pageObjects/MainPage.js";
import DynamicControlsPage from "../pageObjects/DynamicControlsPage.js";
import data from "../testData/data.json" assert { type: "json" };
import AllureReporter from "@wdio/allure-reporter";

describe("Jenkins parameters test", function () {
  it("Checks that string passed as a parameter from Jenkins matches with a string from test data", async function () {
    AllureReporter.addStep("Open base heroku url");
    await Browser.openUrl(mainConfig.baseUrl);

    AllureReporter.addStep("Click on dynamic controls nav link");
    await MainPage.clickNavigationLink("Dynamic Controls");
    console.log(mainConfig.inputString);

    AllureReporter.addStep("Click enable button");
    await DynamicControlsPage.clickEnableButton();

    AllureReporter.addStep("Assert if input is enabled");
    assert.isTrue(await DynamicControlsPage.isInputFieldEnabled(), "Input is not enabled");

    AllureReporter.addStep("Input string that passed from Jenkins");
    await DynamicControlsPage.inputTextIntoInputField(mainConfig.inputString);

    AllureReporter.addStep("Assert that strings are equal");
    assert.strictEqual(await DynamicControlsPage.getInputFieldValue(), data.inputString, "Strings are not equal");
  });
});
