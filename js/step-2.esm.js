import Common from "./Common.esm.js";
import Switch from "./Switcher.esm.js";
import NextBtn from "./NextBtn.esm.js";
import Costs from "./Costs.esm.js";
import SetOptions from "./SetOptions.esm.js";

const SWITCHER_ID = "switcherId";
const ARCADE_COST_ID = "arcade";
const ADVANCED_COST_ID = "advanced";
const PRO_COST_ID = "pro";
const WRAPPER_ID = "wrapper";
const ELEMENT_ID = "optionsId";
const OPTION_ELEMENT_CLASS = ".option";
const OPTION_COST_CLASS = ".option__cost";
const NEXT_STEP = "/html/step-3.html";

export class Plans extends Common {
  constructor(elementId) {
    super(elementId);
    this.setOptions = new SetOptions(
      ELEMENT_ID,
      OPTION_ELEMENT_CLASS,
      OPTION_COST_CLASS
    );
    this.nextBtn = new NextBtn();
    console.log(this.nextBtn);
    this.costs = new Costs(OPTION_COST_CLASS);
    let _switcher = new Switch(SWITCHER_ID);
    this.getSwitcher = () => _switcher;
    this.bindToElements();
    this.setPrices();
    this.setListeners();
    this.next = false;
  }

  bindToElements() {
    this.arcadeCost = this.bindToElement(ARCADE_COST_ID);
    this.advancedCost = this.bindToElement(ADVANCED_COST_ID);
    this.proCost = this.bindToElement(PRO_COST_ID);
    this.switcher = this.getSwitcher();
  }

  setPrices() {
    this.costs.setPrice(this.switcher.selectedOption.monthly);
  }

  setListeners() {
    this.switcher.box.addEventListener("click", () => this.setPrices());
    this.setOptions.options.forEach((option) =>
      option.addEventListener("click", () => this.isAllowedNextStep())
    );
  }

  isAllowedNextStep() {
    this.next = this.setOptions.activeClass();
    this.next ? this.nextBtn.setListener(NEXT_STEP) : false;
  }

}

const plans = new Plans(WRAPPER_ID);
