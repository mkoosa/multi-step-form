import Common from "./Common.esm.js";

const MONTH_ID = "monthId";
const YEAR_ID = "yearId";
const BOX_ID = "boxId";
const OPTION_CLASS = ".switch__option";
const MONTHLY_POS = "flex-end";
const YEARLY_POS = "flex-start";
const OPTION_BONUS_CLASS = ".option_bonus";
const OPTION_ELEMENT_CLASS = ".option";
const MARINE_BLUE = "hsl(213, 96%, 18%)";
const COOL_GREY = "hsl(231, 11%, 63%)";

export default class Switch extends Common {
  constructor(elementId) {
    super(elementId);
    this.bindToElements();
    this.chooseOption();
    this.selectedOption = { month: true, year: false };
    this.bonusElements = document.querySelectorAll(OPTION_BONUS_CLASS);
  }

  bindToElements() {
    this.optionElements = document.querySelectorAll(OPTION_ELEMENT_CLASS);
    this.mouth = this.bindToElement(MONTH_ID);
    this.year = this.bindToElement(YEAR_ID);
    this.options = document.querySelectorAll(OPTION_CLASS);
    this.box = this.bindToElement(BOX_ID);
  }

  chooseOption() {
    this.box.addEventListener("click", this.change);
  }

  change = () => {
    this.removeClass();
    this.clearUser();
    let switcher = this.box;
    let styles = window.getComputedStyle(switcher);
    let position = styles.justifyContent;
    this.saveChoiceOption(position);
    switcher.style.justifyContent =
      position === YEARLY_POS ? MONTHLY_POS : YEARLY_POS;
    this.changeTextColor(switcher);
  };

  clearUser() {
    localStorage.removeItem("user");
  }

  removeClass() {
    this.optionElements.forEach((element) =>
      element.classList.remove("active")
    );
  }

  changeTextColor(element) {
    let position = element.style.justifyContent;
    this.year.style.color = position === MONTHLY_POS ? MARINE_BLUE : COOL_GREY;
    this.mouth.style.color = position !== MONTHLY_POS ? MARINE_BLUE : COOL_GREY;
  }

  saveChoiceOption(value) {
    if (value === MONTHLY_POS) {
      this.selectedOption.month = true;
      this.selectedOption.year = false;
      this.activateBonus(true);
      return;
    }
    this.selectedOption.year = true;
    this.selectedOption.month = false;
    this.activateBonus(false);
  }

  activateBonus(value) {
    if (value) {
      this.bonusElements.forEach((element) => (element.style.display = "none"));
      return;
    }
    this.bonusElements.forEach((element) => (element.style.display = "block"));
  }
}
