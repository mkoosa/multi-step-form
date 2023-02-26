import Common from "./Common.esm.js";
import Storage from "./Storage.esm.js";
import Costs from "./Costs.esm.js";
import prices from "./index.js";
import NextBtn from "./NextBtn.esm.js";
import BackBtn from './Back.esm.js';

const OPTION_ELEMENT_CLASS = ".option";
const ACTIVE_CLASS = "active";
const OPTION_COST_CLASS = ".option__cost";
const CHECKBOX_ID = "#checkboxId";
const WRAPPER_ID = "wrapper";
const KEY = "user";
const BACK_BTN_CLASS = ".go-back";
const BACK_STEP = "/html/step-2.html";
const NEXT_STEP = "/html/step-4.html";
const NEXT_BTN_CLASS = ".next-btn";

class ThirdStep extends Common {
  constructor(elementId) {
    super(elementId);
    this.user = null;
    this.costs = new Costs(OPTION_COST_CLASS);
    this.backBtn = new BackBtn(BACK_STEP, BACK_BTN_CLASS);
    this.bindToElements();
    this.setListeners();
    this.getPeriodTime();
    this.setPrices();
    this.addiTionalOptions = [];
  }

  bindToElements() {
    this.checkBoxes = document.querySelectorAll(CHECKBOX_ID);
  }

  chooseOption(e) {
    const option = e.target.closest(OPTION_ELEMENT_CLASS);
    option.classList.toggle(ACTIVE_CLASS);
    let name = option.dataset.name;
    this.additionalOption(name);
    this.nextStep();
  }

  setListeners() {
    this.checkBoxes.forEach((checkBox) => {
      checkBox.addEventListener("click", (e) => this.chooseOption(e));
    });
  }

  getPeriodTime() {
    let storage = new Storage();
    this.timePeriod = storage.getItemFromStorage(KEY);
    this.createUser();
    this.timePeriod = JSON.parse(this.timePeriod).period;
    this.selectedOptionStepBeforeIsMonth =
    this.timePeriod === "month" ? true : false;
  }
  
  additionalOption(value) {
    this.addAdditionalOption(value);
    this.updateUser(this.addiTionalOptions)
  }
  
  addAdditionalOption(option) {
    this.nextBtn = new NextBtn(NEXT_STEP, NEXT_BTN_CLASS);
    let obj = {};
    let price = prices[option][this.user.period];
    obj[option] = price
    this.addiTionalOptions.push(obj);
  }
  
  setPrices() {
    this.costs.setPrice(this.selectedOptionStepBeforeIsMonth);
  }
  
  nextStep() {
    console.log(this.nextBtn);
    this.addiTionalOptions.length ? this.nextBtn.setListener(NEXT_STEP) : false;
  }
  
  createUser() {
    this.user = JSON.parse(this.timePeriod)
  }
  updateUser(value) {
    this.user.options = value;
    this.save(KEY, this.user)

  }
  save(key, value) {
    let storage = new Storage();
    storage.createStorage(key, value);
  }
}

const thirdStep = new ThirdStep(WRAPPER_ID);
