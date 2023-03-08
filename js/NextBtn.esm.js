import Common from "./Common.esm.js";
import Loader from "./Loader.esm.js";
const LOADER_ID = "loaderId";
const WRAPPER_ID = "wrapper";
const DISPLAY = "display";
const BLUR = "blur";

export default class NextBtn extends Common {
  constructor(value, btn) {
    super();
    this.step = value;
    this.btn = btn;
    this.bindElements();
    this.setListener();
    this.disabledButtons();
  }

  bindElements() {
    this.buttons = document.querySelectorAll(this.btn);
    this.wrapper = this.bindToElement(WRAPPER_ID);
    this.loader = new Loader(LOADER_ID);
  }

  disabledButtons() {
    this.buttons.forEach((button) => (button.disabled = true));
  }
  enabledButtons() {
    this.buttons.forEach((button) => (button.disabled = false));
  }

  setListener() {
    this.buttons.forEach((button) =>
      button.addEventListener("click", () => this.nextStep(this.step))
    );
  }

  nextStep = (next) => {
    this.wrapper.classList.add(BLUR);
    this.loader.addClass(DISPLAY);
    setTimeout(() => {
      window.location.href = next;
      this.loader.removeClass(DISPLAY);
      this.wrapper.classList.remove(BLUR);
    }, 1000);
  };
}
