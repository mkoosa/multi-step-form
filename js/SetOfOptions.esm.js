import Common from "./Common.esm.js";

const OPTION_ELEMENT_CLASS = ".option";
const OPTION_COST_ELEMENT_CLASS = '.option__cost';
const ACTIVE_CLASS = "active";

export class SetOfOptions extends Common {
  constructor(ELEMENT_ID, OPTION_ELEMENT, OPTION_COST) {
    super(ELEMENT_ID);
    this.getOptionCostElements();
    this.options = document.querySelectorAll(OPTION_ELEMENT);
    this.costs = document.querySelectorAll(OPTION_COST);
    this.change = true;
    this.setListeners();
  }
  
  setListeners() {
    this.options.forEach((option) =>
    option.addEventListener("click", (e) => {
      console.log(e.target);
      console.log("choose option");
      this.selectOption(e);
    })
    );
  }
  
  getOptionCostElements() {
    this.optionsCost = document.querySelectorAll(OPTION_COST_ELEMENT_CLASS);
  };

  selectOption = (e) => {
    const option = e.target.closest(OPTION_ELEMENT_CLASS);
    if (this.change) {
      this.removeClass(e);
      option.classList.add(ACTIVE_CLASS);
      
    } else {
      option.classList.add(ACTIVE_CLASS);
      
    };
  };

  removeClass(e) {
    let activeEl = e.target;
    this.options.forEach((option) => option.classList.remove(ACTIVE_CLASS));
    activeEl.classList.add(ACTIVE_CLASS);
  }
}
