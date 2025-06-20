// src/infrastructure/LocalStorageAdapter.js
// Adapter: enkapsuluje dostęp do localStorage, ułatwia testowanie i ewentualną wymianę

class LocalStorageAdapter {
  get(key) {
    const item = localStorage.getItem(key);
    try {
      return JSON.parse(item);
    } catch {
      return item;
    }
  }

  set(key, value) {
    const toStore = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, toStore);
  }

  remove(key) {
    localStorage.removeItem(key);
  }
}

const localStorageAdapter = new LocalStorageAdapter();
export default localStorageAdapter;