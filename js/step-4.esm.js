import Common from "./Common.esm.js";
import Storage from "./Storage.esm.js";
import NextBtn from "./NextBtn.esm.js";
import BackBtn from './Back.esm.js';

const WRAPPER_ID = "wrapper";
const CHANGEABLE_OPT_ID = "changeableOptId";
const CHANGEABLE_PRICE_ID = "changeablePriceId";
const CHANGE_ID = "changeId";
const OPTION_ADD_ID = "optionAddId";
const OPTION_PRICE__ID = "optionPriceId";
const TIME_PERIOD_ID = "timePeriodId";
const TOTAL_COST_ID = "totalCostId";
const OPTION_EL_ID = "optionId";
const BASKET_CLASS = ".fa-trash";
const OPTION_CONTENT_CLASS = ".option__content";
const FINISH_WRAPPER_CLASS = ".finish__wrapper";
const LAST_FINISH_WRAPPER_CLASS = ".finish__wrapper--last";
const BACK_BTN_CLASS = ".go-back";
const BACK_STEP = "/html/step-3.html";
const NEXT_BTN_CLASS = ".next-btn";
const ACTIVE = "active";
const KEY = "user";
const STATE = "state";
const FIRST_STEP = "/html/step-1.html";

class Finish extends Common {
  constructor(elementId) {
    super(elementId);
    this.bindToElements();
    this.storage = new Storage();
    this.nextBtn = new NextBtn(STATE, NEXT_BTN_CLASS);
    this.backBtn = new BackBtn(BACK_STEP, BACK_BTN_CLASS, KEY);
    this.getUserOptions();
    this.setUserOptions();
    this.insertAddOptions();
    this.setTotal();
    this.confirmation();
    this.setListener();
    this.setTotalOptionsCost();
  }

  bindToElements() {
    this.changeableOptionEl = this.bindToElement(CHANGEABLE_OPT_ID);
    this.changeOption = this.bindToElement(CHANGE_ID);
    this.changeableOptionPrice = this.bindToElement(CHANGEABLE_PRICE_ID);
    this.optionEl = this.bindToElement(OPTION_EL_ID);
    this.optionPrice = this.bindToElement(OPTION_PRICE__ID);
    this.timePeriod = this.bindToElement(TIME_PERIOD_ID);
    this.addOptions = this.bindToElement(OPTION_ADD_ID);
    this.totalCost = this.bindToElement(TOTAL_COST_ID);
  }

  getUserOptions() {
    this.userOptions = this.storage.getItemFromStorage(KEY);
    this.nextBtn.enabledButtons();
  }

  setUserOptions() {
    this.setMainOption();
  }

  setMainOption() {
    this.changeableOptionEl.innerText = `${this.userOptions.name} (${this.userOptions.period}ly)`;
    this.changeableOptionPrice.innerText = this.setPeriodName(
      this.userOptions.price
    );
  }

  insertAddOptions() {
    this.userOptions.options.forEach((value) => {
      this.addOptions.appendChild(this.addOption(value));
    });
  }

  addOption(value) {
    const values = this.prepareValue(value);
    const optionContent = this.createOptionContentElement();
    const optionName = this.createOptionNameElement(values);
    const optionCost = this.createOptionCostElement(values);
    optionContent.appendChild(optionName);
    optionContent.appendChild(optionCost);
    return optionContent;
  }

  createOptionContentElement() {
    const optionContent = document.createElement("div");
    optionContent.classList.add("option__content", "d-row");
    return optionContent;
  }

  createOptionNameElement(value) {
    const optionName = document.createElement("p");
    optionName.classList.add("option__name");
    optionName.setAttribute("id", "optionId");
    optionName.innerText = value.key;
    optionName.innerHTML = `${value.key}<i class="fas fa-solid fa-trash"></i>`;
    return optionName;
  }

  createOptionCostElement(value) {
    const optionCost = document.createElement("p");
    optionCost.classList.add("option__cost", "option__cost--bold");
    optionCost.setAttribute("id", "optionPriceId");
    optionCost.innerText = this.setPeriodName(value.keyValue);
    return optionCost;
  }

  prepareValue(value) {
    const key = Object.keys(value);
    let keyValue = value[key];
    return { key, keyValue };
  }

  setPeriodName(value) {
    return this.userOptions.period === "year"
      ? `+$${value}/ye`
      : `+$${value}/mo`;
  }

  setTotal() {
    this.timePeriod.innerText = this.userOptions.period;
  }

  setTotalOptionsCost() {
    const total = this.userOptions.price + this.optionsCost();
    this.totalCost.innerText = this.setPeriodName(total);
  }

  optionsCost() {
    const options = this.userOptions.options;
    let total = this.totalOptionsCost(options);
    return total;
  }

  totalOptionsCost(options) {
    let total = 0;
    options.forEach((option) => {
      total += Number(Object.values(option));
    });
    return total;
  }

  setListener() {
    this.baskets = document.querySelectorAll(BASKET_CLASS);
    this.changeOption.addEventListener("click", this.change);
    this.baskets.forEach((basket) =>
      basket.addEventListener("click", (e) => this.removeOption(e))
    );
  }

  change = () => {
    this.baskets.forEach((basket) => {
      basket.classList.toggle(ACTIVE);
    });
  };

  removeOption(e) {
    const optionContent = e.target.closest(OPTION_CONTENT_CLASS);
    optionContent.remove();
    let option = e.target.closest(".option__name").innerText;
    this.updateOptions(option);
  }

  updateOptions(value) {
    let options = this.userOptions.options;
    options = options.filter((option) => !option.hasOwnProperty(value));
    this.userOptions.options = options;
    this.totalOptionsCost(this.userOptions.options);
    this.optionsCost();
    this.setTotalOptionsCost();
    this.storage.createStorage(KEY, this.userOptions);
  }

  confirmation() {
    this.nextBtn.buttons.forEach((button) =>
      button.addEventListener("click", this.finish)
    );
  }

  finish = () => {
    const finishWrapper = document.querySelector(FINISH_WRAPPER_CLASS);
    const lastFinishWrapper = document.querySelector(LAST_FINISH_WRAPPER_CLASS);
    lastFinishWrapper.style.display = "block";
    finishWrapper.style.display = "none";
    document.querySelector("footer").style.display = "none";
    this.reboot()

  };

  reboot() {
    setTimeout(() => {
      localStorage.clear();
      window.location.href = FIRST_STEP;
    }, 2000);
  };
}

const finish = new Finish(WRAPPER_ID);
