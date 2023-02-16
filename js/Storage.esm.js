export default class Storage {

  createStorage(key, value) {
      localStorage.setItem(key, value);
    
  }

  getItemFromStorage(key) {
    return localStorage.getItem(key)
  }
}
