import { assert } from "chai"
import Browser from "../../framework/browser/Browser.js"
import { mainConfig } from "../../framework/configs/main.wdio.conf.js"
import MainPage from "../pageObjects/MainPage.js"
import DynamicControlsPage from "../pageObjects/DynamicControlsPage.js"
import data from "../testData/data.json" assert { type: "json" }

describe("Jenkins parameters test", function () {
  it("Checks that string passed as a parameter from Jenkins matches with a string from test data", async function () {
    await Browser.openUrl(mainConfig.baseUrl)
    await MainPage.clickNavigationLink("Dynamic Controls")
    console.log(mainConfig.inputString)

    await DynamicControlsPage.clickEnableButton()
    assert.isTrue(await DynamicControlsPage.isInputFieldEnabled(), "Input is not enabled")

    await DynamicControlsPage.inputTextIntoInputField(mainConfig.inputString)
    assert.strictEqual(await DynamicControlsPage.getInputFieldValue(), data.inputString, "Strings are not equal")
  })
})
