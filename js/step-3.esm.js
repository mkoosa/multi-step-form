import Common from "./Common.esm.js";

const CHECKBOX_CLASS = ".css-checkbox";
const ACTIVE_CLASS = 'active';
const WRAPPER_ID = "wrapper";

class ThirdStep extends Common {
  constructor(elementId) {
      super(elementId);
      this.bindToElements();
      this.setListeners();
  }

  bindToElements() {
    this.checkBoxes = document.querySelectorAll(CHECKBOX_CLASS);
  }
  addClassToCheckBox() {}
  addClass(e) {
    e.target.classList.add(ACTIVE_CLASS)
  }

  setListeners() {
    this.checkBoxes.forEach((checkBox) =>
      checkBox.addEventListener("click", (e)=>this.addClass(e))
    );
  }
}

const thirdStep = new ThirdStep(WRAPPER_ID);
// console.log("🚀 ~ file: step-3.esm.js:18 ~ thirdStep", thirdStep)
