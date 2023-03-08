import Common from "./Common.esm.js";
import Switch from "./Switcher.esm.js";
import NextBtn from "./NextBtn.esm.js";
import Costs from "./Costs.esm.js";
import SetOptions from "./SetOptions.esm.js";
import User from "./User.esm.js";
import Storage from "./Storage.esm.js";
import BackBtn from "./Back.esm.js";
import prices from "./index.js";

const SWITCHER_ID = "switcherId";
const ARCADE_COST_ID = "arcade";
const ADVANCED_COST_ID = "advanced";
const PRO_COST_ID = "pro";
const WRAPPER_ID = "wrapper";
const ELEMENT_ID = "optionsId";
const OPTION_ELEMENT_CLASS = ".option";
const OPTION_COST_CLASS = ".option__cost";
const NEXT_BTN_CLASS = ".next-btn";
const NEXT_STEP = "/html/step-3.html";
const BACK_BTN_CLASS = ".go-back";
const BACK_STEP = "/html/step-1.html";
const KEY = "user";
const MONTHLY_POS = "flex-end";
const YEARLY_POS = "flex-start";

export class Plans extends Common {
  constructor(elementId) {
    super(elementId);
    this.setOptions = new SetOptions(
      ELEMENT_ID,
      OPTION_ELEMENT_CLASS,
      OPTION_COST_CLASS
    );
    this.storage = new Storage();
    this.costs = new Costs(OPTION_COST_CLASS);
    this.switcher = new Switch(SWITCHER_ID);
    this.nextBtn = new NextBtn(NEXT_STEP, NEXT_BTN_CLASS);
    this.getSwitcher = () => _switcher;
    this.bindToElements();
    this.stepBack();
    this.setPrices();
    this.setListeners();
    this.isNextStepAllow();
  }

  stepBack() {
    this.backBtn = new BackBtn(BACK_STEP, BACK_BTN_CLASS, KEY);
    this.value = this.backBtn.value;
    if (!this.value) return;
    this.addClass(this.value);
    this.gestStorageValues();
  }

  gestStorageValues() {
    let values = this.storage.getItemFromStorage(KEY);
    this.matchValuesFromStorage(values);
  }

  matchValuesFromStorage(values) {
    let position = values.period === "year" ? YEARLY_POS : MONTHLY_POS;
    this.switcher.saveChoiceOption(position);
    this.switcherPosition(values);
    this.switcher.changeTextColor(this.switcher.box);
  }

  switcherPosition(values) {
    values.period === "year"
      ? (this.switcher.box.style.justifyContent = MONTHLY_POS)
      : (this.switcher.box.style.justifyContent = YEARLY_POS);
  }

  addClass(value) {
    let option = document.querySelector(`[data-name="${value.name}"]`);
    option.classList.add("active");
  }

  bindToElements() {
    this.arcadeCost = this.bindToElement(ARCADE_COST_ID);
    this.advancedCost = this.bindToElement(ADVANCED_COST_ID);
    this.proCost = this.bindToElement(PRO_COST_ID);
  }

  setPrices() {
    this.isNextStepAllow();
    this.costs.setPrice(this.switcher.selectedOption.month);
    this.switchPrices();
  }

  switchPrices() {
    let values = JSON.parse(localStorage.getItem(KEY));
    if (!values) return;
    let obj = this.switcher.selectedOption;
    let period = this.getPeriod(obj);
    values.price = prices[values.name][period[0]];
    if (!this.storage.getItemFromStorage(KEY));
    this.switcher.selectedOption = obj;
  }

  getPeriod(obj) {
    return Object.keys(obj).filter((k) => obj[k]);
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
    const period = this.getPeriod(obj).join();
    this.createUser(name, period);
  }

  createUser(name, period) {
    this.user = new User(name, period);
    this.save(KEY, this.user.options);
  }

  nextStep(e) {
    this.createObjKeys(e);
    this.isNextStepAllow();
  }

  isNextStepAllow() {
    let value = this.storage.getItemFromStorage(KEY);
    value ? this.nextBtn.enabledButtons() : this.nextBtn.disabledButtons();
  }

  save(key, value) {
    this.storage.createStorage(key, value);
  }
}

const plans = new Plans(WRAPPER_ID);
