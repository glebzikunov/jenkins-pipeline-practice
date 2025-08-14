import BasePage from "../../framework/page/BasePage.js"
import { Button, Input, Label } from "../../framework/elements/index.js"

class DynamicControlsPage extends BasePage {
  constructor() {
    super(new Label('//h4[text()="Dynamic Controls"]', "Dynamic Controls Label"), "Dynamic Controls Page")

    this.enableButton = new Button('//button[@onClick="swapInput()"]', "Enable Button")
    this.inputField = new Input('//input[@type="text"]', "Input Field")
  }

  async clickEnableButton() {
    await this.enableButton.click()
  }

  async isInputFieldEnabled() {
    return await this.inputField.state().waitForEnabled()
  }

  async inputTextIntoInputField(text) {
    await this.inputField.typeText(text)
  }

  async getInputFieldValue() {
    return await this.inputField.getValue()
  }
}

export default new DynamicControlsPage()
