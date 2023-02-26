import Common from "./Common.esm.js";
const OPTION_ELEMENT_CLASS = ".option";
const OPTION_COST_ELEMENT_CLASS = ".option__cost";
const ACTIVE_CLASS = "active";
export default class SetOptions extends Common {
  constructor(ELEMENT_ID, OPTION_ELEMENT, OPTION_COST) {
    super(ELEMENT_ID);
    this.getOptionCostElements();
    this.options = document.querySelectorAll(OPTION_ELEMENT);
    this.costs = document.querySelectorAll(OPTION_COST);
    this.visibility = true;
    this.setListeners();
  }

  setListeners() {
    this.options.forEach((option) =>
      option.addEventListener("click", (e) => {
        this.selectOption(e);
      })
    );
  }

  getOptionCostElements() {
    this.optionsCost = document.querySelectorAll(OPTION_COST_ELEMENT_CLASS);
  }

  selectOption = (e) => {
    const option = e.target.closest(OPTION_ELEMENT_CLASS);
    this.addClass(option, this.visibility);
  };

  addClass(element, target) {
    if (target) {
      this.removeClass();
      element.classList.add(ACTIVE_CLASS);
    } else {
      element.classList.add(ACTIVE_CLASS);
    };
  }

  removeClass() {
    this.options.forEach((option) => option.classList.remove(ACTIVE_CLASS));
  }
  
  matchOptionElement(e) {
    const element = e.target.closest('.option').getAttribute("data-name");
    return element    
  }
}
