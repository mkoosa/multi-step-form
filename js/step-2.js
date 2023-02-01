import Common from "./Common.esm.js";
import Switch from "./Switcher.esm.js";
import Costs from "./index.js";

const SWITCHER_ID = "switcherId";
const ARCADE_COST_ID = "arcCostId";
const ADVANCED_COST_ID = "advCostId";
const PRO_COST_ID = "proCostId";

const OPTION_BONUS_CLASS = ".option_bonus";
const OPTION_ELEMENT_CLASS = ".option";
const ACTIVE_CLASS = "active";

class Plans extends Common {
  constructor() {
    super();
    let _switcher = new Switch(SWITCHER_ID);
    this.getSwitcher = () => _switcher;
    this.bindToElements();
    this.setCosts();
    this.setListeners();
    
  }

  bindToElements() {
    this.arcadeCost = this.bindToElement(ARCADE_COST_ID);
    this.advancedCost = this.bindToElement(ADVANCED_COST_ID);
    this.proCost = this.bindToElement(PRO_COST_ID);
    this.switcher = this.getSwitcher();
    this.options = document.querySelectorAll(OPTION_ELEMENT_CLASS);
  }

  setCosts() {
    if (this.switcher.choiceOptions.month) {
      this.arcadeCost.innerText = `${Costs.arcade.month}/mo`;
      this.advancedCost.innerText = Costs.advanced.month;
      this.proCost.innerText = Costs.pro.month;
    } else {
      this.arcadeCost.innerText = `${Costs.arcade.year}/yr`;
      this.advancedCost.innerText = Costs.advanced.year;
      this.proCost.innerText = Costs.pro.year;
    }
  }

  chooseOption = (e) => {

    this.removeClass(e);
    const option = e.target.closest(OPTION_ELEMENT_CLASS);
    option.classList.add(ACTIVE_CLASS);
  };

  removeClass(e) {
    let activeEl = e.target;
    this.options.forEach((option) => option.classList.remove(ACTIVE_CLASS));
    activeEl.classList.add(ACTIVE_CLASS);
  }

  setListeners() {
    this.switcher.box.addEventListener("click", () => this.setCosts());
    this.options.forEach((option) => {
      option.addEventListener("click", this.chooseOption);
    });
  }
}

const plans = new Plans();
