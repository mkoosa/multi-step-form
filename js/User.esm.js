import prices from "./index.js";

export default class User {
  constructor(name, period) {
    this.createUserOption(name, period);
  }

  createUserOption(name, period) {
    this.options = {
      name,
      period,
      price: prices[name][period]
    };
  }
}
