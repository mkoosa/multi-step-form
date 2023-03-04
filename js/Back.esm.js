import NextBtn from "./NextBtn.esm.js";

export default class BackBtn extends NextBtn {
  constructor(value, btn, key) {
    super(value, btn);
    this.key = key;
    this.getValues()
  }

  getValues() {
    this.value = JSON.parse(localStorage.getItem(this.key));
  }
}
