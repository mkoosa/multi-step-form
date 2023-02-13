export default class Common {
  constructor(elementId) {
    this.element = this.bindToElement(elementId);
  }

  bindToElement(elementId) {
    return document.getElementById(elementId);
  }

  addClass(className) {
    this.element.classList.add(className);
  }
  
  removeClass(className) {
    this.element.classList.remove(className);
    
  }

}
