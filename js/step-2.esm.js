import Common from "./Common.esm.js";
import Switch from "./Switcher.esm.js";
import NextBtn from "./NextBtn.esm.js";
import Costs from "./Costs.esm.js";
import SetOptions from "./SetOptions.esm.js";
import User from "./User.esm.js";
import Storage from "./Storage.esm.js";

const SWITCHER_ID = "switcherId";
const ARCADE_COST_ID = "arcade";
const ADVANCED_COST_ID = "advanced";
const PRO_COST_ID = "pro";
const WRAPPER_ID = "wrapper";
const ELEMENT_ID = "optionsId";
const OPTION_ELEMENT_CLASS = ".option";
const OPTION_COST_CLASS = ".option__cost";
const NEXT_STEP = "/html/step-3.html";
const key = 'user';

export class Plans extends Common {
  constructor(elementId) {
    super(elementId);
    this.setOptions = new SetOptions(
      ELEMENT_ID,
      OPTION_ELEMENT_CLASS,
      OPTION_COST_CLASS
    );
    this.nextBtn = new NextBtn();
    this.costs = new Costs(OPTION_COST_CLASS);
    let _switcher = new Switch(SWITCHER_ID);
    this.getSwitcher = () => _switcher;
    this.bindToElements();
    this.setPrices();
    this.setListeners();
  }

  bindToElements() {
    this.arcadeCost = this.bindToElement(ARCADE_COST_ID);
    this.advancedCost = this.bindToElement(ADVANCED_COST_ID);
    this.proCost = this.bindToElement(PRO_COST_ID);
    this.switcher = this.getSwitcher();
  }

  setPrices() {
    this.costs.setPrice(this.switcher.selectedOption.month);
    this.setOptions.removeClass();
  }

  setListeners() {
    this.switcher.box.addEventListener("click", () => this.setPrices());
    this.setOptions.options.forEach((option) =>
      option.addEventListener("click", (e) => this.nextStep(e))
    );
  }

  createObjKeys(e) {
    const name = this.setOptions.matchOptionElement(e);
    const obj = this.switcher.selectedOption;
    const period = Object.keys(obj)
      .filter((k) => obj[k])
      .join();
    this.createUser(name, period);
  }

  createUser(name, period) {
    this.user = new User(name, period);
    this.save(key, this.user.options)
  }

  nextStep(e) {
    this.createObjKeys(e);
    this.next = this.setOptions.activeClass();
    this.next ? this.nextBtn.setListener(NEXT_STEP) : false;
  }

  save(key, value) {
    let storage = new Storage()
    storage.createStorage(key, value)
  }
}

const plans = new Plans(WRAPPER_ID);
