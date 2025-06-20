// src/application/services/AuthStorage.js
import LocalStorageAdapter from '../../infrastructure/LocalStorageAdapter';

const STORAGE_KEY = 'auth';

export function saveAuth({ tokens, user }) {
  LocalStorageAdapter.set(STORAGE_KEY, { tokens, user });
}

export function loadAuth() {
  return LocalStorageAdapter.get(STORAGE_KEY);
}

export function clearAuth() {
  LocalStorageAdapter.remove(STORAGE_KEY);
}
