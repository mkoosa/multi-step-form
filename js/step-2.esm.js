import Common from "./Common.esm.js";
import Switch from "./Switcher.esm.js";
import Costs from "./index.js";
import NextBtn from "./NextBtn.esm.js";

const SWITCHER_ID = "switcherId";
const ARCADE_COST_ID = "arcCostId";
const ADVANCED_COST_ID = "advCostId";
const PRO_COST_ID = "proCostId";

const OPTION_ELEMENT_CLASS = ".option";
const ACTIVE_CLASS = "active";

const NEXT_STEP = '/html/step-3.html'

class Plans extends Common {
  constructor() {
    super();
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
    this.options = document.querySelectorAll(OPTION_ELEMENT_CLASS);
    this.nextBtn = new NextBtn();
  }

  setCosts() {
    this.matchOptionContent();
    if (this.switcher.selectedOption.month) {
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
    this.matchOptionContent();
  };

  removeClass(e) {
    let activeEl = e.target;
    this.options.forEach((option) => option.classList.remove(ACTIVE_CLASS));
    activeEl.classList.add(ACTIVE_CLASS);
  }

  setListeners() {
    this.switcher.box.addEventListener("click", () => this.setCosts());
    this.options.forEach((option) => {
      option.addEventListener("click", (e) => {
        this.chooseOption(e);
      });
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
    this.options.forEach((option) => {
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

export const plans = new Plans();



