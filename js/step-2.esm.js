import Common from "./Common.esm.js";
import Switch from "./Switcher.esm.js";
import Costs from "./index.js";
import NextBtn from "./NextBtn.esm.js";
import { SetOfOptions } from "./SetOfOptions.esm.js";

const SWITCHER_ID = "switcherId";
const ARCADE_COST_ID = "arcCostId";
const ADVANCED_COST_ID = "advCostId";
const PRO_COST_ID = "proCostId";
const WRAPPER_ID = "wrapper";

const ELEMENT_ID = "optionsId";

const OPTION_ELEMENT_CLASS = ".option";
const OPTION_COST_CLASS = ".option__cost";
const ACTIVE_CLASS = "active";

const NEXT_STEP = "/html/step-3.html";

export class Plans extends Common {
  constructor(elementId) {
    super(elementId);
    this.setOfOptions = new SetOfOptions(
      ELEMENT_ID,
      OPTION_ELEMENT_CLASS,
      OPTION_COST_CLASS
    );
    let _switcher = new Switch(SWITCHER_ID);
    this.getSwitcher = () => _switcher;
    this.createEmptyOptionContent();
    this.bindToElements();
    this.setCosts();
    this.setListeners();
  }

  bindToElements() {
    this.arcadeCost = this.bindToElement(ARCADE_COST_ID);
    this.advancedCost = this.bindToElement(ADVANCED_COST_ID);
    this.proCost = this.bindToElement(PRO_COST_ID);
    this.switcher = this.getSwitcher();
    this.nextBtn = new NextBtn();
  }

  setCosts() {
    this.matchOptionContent();
    if (this.switcher.selectedOption.monthly) {
      this.arcadeCost.innerText = `${Costs.arcade.month}/mo`;
      this.advancedCost.innerText = Costs.advanced.month;
      this.proCost.innerText = Costs.pro.month;
    } else {
      this.arcadeCost.innerText = `${Costs.arcade.year}/yr`;
      this.advancedCost.innerText = Costs.advanced.year;
      this.proCost.innerText = Costs.pro.year;
    };
  };

  setListeners() {
    this.switcher.box.addEventListener("click", () => this.setCosts());
    this.setOfOptions.options.forEach((option) => {
      option.addEventListener("click", () => this.matchOptionContent());
    });
  }

  createEmptyOptionContent() {
    this.content = {
      name: null,
      option: null,
    };
  }

  setOptionContent(name, option) {
    this.content.name = name;
    this.content.option = option;
  }

  matchOptionContent() {
    this.setOfOptions.options.forEach((option) => {
      if (option.classList.contains(ACTIVE_CLASS)) {
        this.setOptionContent(
          Costs[option.dataset.name],
          this.switcher.selectedOption
        );
      }
    });
    if (this.content.option) {
      this.nextBtn.setListener(NEXT_STEP);
    }
  }
}

const plans = new Plans(WRAPPER_ID);
