import Common from "./Common.esm.js";
import Loader from "./Loader.esm.js";

const NEXT_BTN_CLASS = ".next-btn";
const LOADER_ID = "loaderId";
const WRAPPER_ID = "wrapper";

const DISPLAY = "display";
const BLUR = "blur";

const WRAPPER = document.getElementById(WRAPPER_ID);
export default class NextBtn extends Common {
  constructor() {
    super();
    this.bindElements();
  }
  bindElements() {
    this.buttons = document.querySelectorAll(NEXT_BTN_CLASS);
    this.wrapper = this.bindToElement(WRAPPER_ID);
    this.loader = new Loader(LOADER_ID);
  }

  setListener(value) {
    this.buttons.forEach((button) =>
      button.addEventListener("click", () => this.nextStep(value))
    );
  }

  nextStep = (next) => {
    console.log('next');
    this.wrapper.classList.add(BLUR);
    this.loader.addClass(DISPLAY);

    setTimeout(() => {
      window.location.href = next;
      this.loader.removeClass(DISPLAY);
      this.wrapper.classList.remove(BLUR);
    }, 1000);
  };
}
