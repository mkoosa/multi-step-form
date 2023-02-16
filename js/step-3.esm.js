import Common from "./Common.esm.js";
import Storage from "./Storage.esm.js";
import Costs from "./Costs.esm.js";
import User from "./User.esm.js";
const OPTION_ELEMENT_CLASS = ".option";
const ACTIVE_CLASS = "active";
const OPTION_COST_CLASS = ".option__cost";

const CHECKBOX_ID = "#checkboxId";
const WRAPPER_ID = "wrapper";
const key = "user";

class ThirdStep extends Common {
  constructor(elementId) {
    super(elementId);
    this.costs = new Costs(OPTION_COST_CLASS);
    this.bindToElements();
    this.setListeners();
    this.getPeriodTime();
    this.setPrices();
  }

  bindToElements() {
    this.checkBoxes = document.querySelectorAll(CHECKBOX_ID);
  }

  chooseOption(e) {
    const option = e.target.closest(OPTION_ELEMENT_CLASS);
    option.classList.toggle(ACTIVE_CLASS);

    let name = option.dataset.name;
   
    this.createUser(name, this.timePeriod)
  }

  setListeners() {
    this.checkBoxes.forEach((checkBox) => {
      checkBox.addEventListener("click", (e) => this.chooseOption(e));
    });
  }

  getPeriodTime() {
    let storage = new Storage();
    this.timePeriod = storage.getItemFromStorage(key);
    this.timePeriod = JSON.parse(this.timePeriod).period;
    this.selectedOptionStepBeforeIsMonth =
      this.timePeriod === "month" ? true : false;
  }

  setPrices() {
    this.costs.setPrice(this.selectedOptionStepBeforeIsMonth);
  }

  createUser(name, period) {
    this.user = new User(name, period);
    this.save(key, JSON.stringify(this.user.options))
  }
  save(key, value) {
    let storage = new Storage()
    storage.createStorage(key, value)
  }
}

const thirdStep = new ThirdStep(WRAPPER_ID);
