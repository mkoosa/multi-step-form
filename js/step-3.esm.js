import Common from "./Common.esm.js";
import Storage from "./Storage.esm.js";
import Costs from "./Costs.esm.js";
import prices from "./index.js";
import NextBtn from "./NextBtn.esm.js";
import BackBtn from "./Back.esm.js";

const OPTION_ELEMENT_CLASS = ".option";
const ACTIVE_CLASS = "active";
const OPTION_COST_CLASS = ".option__cost";
const CHECKBOX_ID = "#checkboxId";
const WRAPPER_ID = "wrapper";
const KEY = "user";
const BACK_BTN_CLASS = ".go-back";
const BACK_STEP = "../html/step-2.html";
const NEXT_STEP = "../html/step-4.html";
const NEXT_BTN_CLASS = ".next-btn";

class ThirdStep extends Common {
  constructor(elementId) {
    super(elementId);
    this.user = null;
    this.storage = new Storage();
    this.nextBtn = new NextBtn(NEXT_STEP, NEXT_BTN_CLASS)
    this.costs = new Costs(OPTION_COST_CLASS);
    this.bindToElements();
    this.getPeriodTime();
    this.setPrices();
    this.setListeners();
    this.additionalOptions = this.prepareOptions();
    this.stepBack();
    this.isNextStepAllow(this.additionalOptions)
  }

  bindToElements() {
    this.checkBoxes = document.querySelectorAll(CHECKBOX_ID);
    this.options = document.querySelectorAll(OPTION_ELEMENT_CLASS);
  }

  stepBack() {
    this.backBtn = new BackBtn(BACK_STEP, BACK_BTN_CLASS, KEY);
    this.matchStorageValues(this.additionalOptions);
  }

  prepareOptions() {
    return this.getItems() ? this.getItems() : [];
  }

  getItems() {
    return this.storage.getItemFromStorage(KEY).options;
  }

  matchStorageValues(values) {
    values.forEach((value) => {
      let name = Object.keys(value)[0];
      const element = document.querySelector(`[data-name="${name}"]`);
      this.updateVueOptionsFromStorage(element);
    });
  }

  updateVueOptionsFromStorage(element) {
    element.classList.add(ACTIVE_CLASS);
    let input = element.firstElementChild.firstElementChild.nextElementSibling;
    input.checked = true;
  }

  chooseOption(e) {
    const option = e.target.closest(OPTION_ELEMENT_CLASS);
    this.addClass(option);
    this.isActive(option);
  }

  addClass(option) {
    option.classList.toggle(ACTIVE_CLASS);
    this.additionalOption(option.dataset.name);
  }

  setListeners() {
    this.checkBoxes.forEach((checkBox) => {
      checkBox.addEventListener("click", (e) => this.chooseOption(e));
    });
  }

  getPeriodTime() {
    this.user = this.createUser()
    this.selectedOptionStepBeforeIsMonth =
      this.user.period === "month" ? true : false;
  }

  additionalOption(value) {
    this.addAdditionalOption(value);
    this.updateUser(this.additionalOptions);
  }

  addAdditionalOption(option) {
    this.avoidDoubleValue(option);
    this.createOptionsObj(option);
  }

  createOptionsObj(option) {
    let userOption = {};
    let price = prices[option][this.user.period];
    userOption[option] = price;
    this.addOption(userOption);
  }

  addOption(option) {
    this.additionalOptions.push(option);
  }

  isActive(element) {
    let target = element.classList.contains(ACTIVE_CLASS) ? true : false;
    if (!target) this.removeOption(element.dataset.name);
  }

  isNextStepAllow(value) {
    value.length ? this.nextBtn.enabledButtons() : this.nextBtn.disabledButtons()
  }

  removeOption(value) {
    this.additionalOptions = this.additionalOptions.filter(
      (additionalOption) => !additionalOption.hasOwnProperty(value)
      );
    this.updateUser(this.additionalOptions);
  }

  setPrices() {
    this.costs.setPrice(this.selectedOptionStepBeforeIsMonth);
  }

  createUser() {
    return this.storage.getItemFromStorage(KEY);
  }

  updateUser(value) {
    this.user.options = value;
    this.save(KEY, this.user);
    this.isNextStepAllow(this.user.options);
  }

  save(key, value) {
    this.storage.createStorage(key, value);
  }

  avoidDoubleValue(value) {
    this.additionalOptions = this.additionalOptions.filter(
      (item) => !item.hasOwnProperty(value)
    );
  };
}

const thirdStep = new ThirdStep(WRAPPER_ID);
