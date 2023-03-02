import Loader from "./Loader.esm.js";
export default class Storage {

  createStorage(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
  }

  getItemFromStorage(key) {
    return localStorage.getItem(key)
  }
}
