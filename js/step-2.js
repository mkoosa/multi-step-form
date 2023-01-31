import Common from "./Common.esm.js";
import Switch from "./Switcher.esm.js";
import Costs from "./index.js";

const SWITCHER_ID = "switcherId";
const ARCADE_COST_ID = "arcCostId";
const ADVANCED_COST_ID = "advCostId";
const PRO_COST_ID = "proCostId";

const OPTION_BONUS_CLASS = ".option_bonus";

class Plans extends Common {
  constructor() {
    super();
    let _switcher = new Switch(SWITCHER_ID);
    this.getSwitcher = () => _switcher;
    this.bindToElements();
    this.setCosts();
  }

  bindToElements() {
    this.arcadeCost = this.bindToElement(ARCADE_COST_ID);
    this.advancedCost = this.bindToElement(ADVANCED_COST_ID);
    this.proCost = this.bindToElement(PRO_COST_ID);
    this.switcher = this.getSwitcher();
    this.switcher.box.addEventListener("click", () => this.setCosts());
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
}

const plans = new Plans();

