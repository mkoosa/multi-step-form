export default class Storage {

  createStorage(key, value) {
      // localStorage.setItem(key, value);
      localStorage.setItem(key, JSON.stringify(value));
    
  }

  getItemFromStorage(key) {
    return localStorage.getItem(key)
  }
}
