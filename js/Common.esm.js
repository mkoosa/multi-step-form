export default class Common {
  constructor(elementId) {
    this.element = this.bindToElement(elementId);
  }

  bindToElement(elementId) {
    return document.getElementById(elementId);
    
  }
}

