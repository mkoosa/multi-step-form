import Common from "./Common.esm.js";

const NEXT_BTN_DESKTOP_ID = "nextBtnDeskTop";

export default class NextBtn extends Common {
  constructor() {
      super();
      this.bindElements();
    }
    bindElements() {
        this.element = this.bindToElement(NEXT_BTN_DESKTOP_ID);
    };
}



