import Common from "./Common.esm.js";

const MONTH_ID = "monthId";
const YEAR_ID = "yearId";
const BOX_ID = "boxId";
const OPTION_CLASS = ".switch__option";
const year = "Yearly";
const MONTH = "Monthly";

export default class Switch extends Common {
  constructor(elementId) {
    super(elementId);
    this.options();
    this.chooseOption();
  }

  options() {
    this.mouth = this.bindToElement(MONTH_ID);
    this.year = this.bindToElement(YEAR_ID);
    this.options = document.querySelectorAll(OPTION_CLASS);
    this.box = this.bindToElement(BOX_ID);
  }

  chooseOption() {
    this.box.addEventListener("click", (e) => this.change(e));
  }
  change(e) {
    let switcher = e.target;
    let styles = window.getComputedStyle(switcher);
    let position = styles.justifyContent;
    switcher.style.justifyContent =
      position === "flex-start" ? "flex-end" : "flex-start";
    this.changeTextColor(switcher)
  }

  changeTextColor(element) {
    let position = element.style.justifyContent;
    this.year.style.color = position === "flex-end" ? 'hsl(213, 96%, 18%)' : 'hsl(231, 11%, 63%)';
    this.mouth.style.color = position !== "flex-end" ? 'hsl(213, 96%, 18%)' : 'hsl(231, 11%, 63%)';

    
  }

  

}
