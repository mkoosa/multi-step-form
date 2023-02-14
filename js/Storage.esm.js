export default class Storage {
  constructor(key, value) {
    this.createStorage(key, value);
  }

  createStorage(key, value) {
      localStorage.setItem(key, value);
    
  }
}
