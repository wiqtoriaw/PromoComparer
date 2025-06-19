// src/application/services/AuthService.js
// Service Layer: logika uwierzytelniania i zarządzania użytkownikiem

import HttpClient from '../../infrastructure/HttpClient';
import LocalStorageAdapter from '../../infrastructure/LocalStorageAdapter';
import User from '../../domain/user';

class AuthService {
  constructor() {
    this.storageKey = 'currentUser';
    this.subscribers = [];
    const stored = LocalStorageAdapter.get(this.storageKey);
    this.currentUser = stored ? new User(stored) : null;
  }

  async login(credentials) {
    const response = await HttpClient.post('/auth/login', credentials);
    const user = new User(response);
    this._setUser(user);
    return user;
  }

  logout() {
    this._setUser(null);
  }

  getToken() {
    return this.currentUser ? this.currentUser.token : null;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  onAuthChange(callback) {
    this.subscribers.push(callback);
    // Zwracamy funkcję do odsubskrybowania
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  _setUser(user) {
    this.currentUser = user;
    if (user) {
      LocalStorageAdapter.set(this.storageKey, user);
    } else {
      LocalStorageAdapter.remove(this.storageKey);
    }
    this.subscribers.forEach(cb => cb(this.currentUser));
  }
}

export default new AuthService();
