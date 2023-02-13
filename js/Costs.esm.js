import prices from "./index.js";

export default class Costs {
  constructor(selector) {
    this.costElements = document.querySelectorAll(selector);
    this.getCostName();
  }

  getCostName() {
    this.costNames = [];
    this.costElements.forEach((element) => {
      const name = element.getAttribute("id");
      this.costNames.push(name);
    });
  }

  setPrice(target) {
    this.matchCosts(target);
  }

  matchCosts(target) {
    target ? this.monthlyCost() : this.yearlyCost();
  }

  monthlyCost() {
    let value = "month";
    let time = " $/mo";
    this.cost(value, time);
  }

  yearlyCost() {
    let value = "year";
    let time = " $/ye";
    this.cost(value, time);
  }

  cost(value, time) {
    this.costNames.forEach((costName) => {
      document.getElementById([costName]).innerText =
        prices[costName][value] + time;
    });
  }
}
