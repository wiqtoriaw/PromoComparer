// src/application/services/AuthService.js
// Service Layer: logika uwierzytelniania i zarządzania użytkownikiem

import HttpClient from '../../infrastructure/HttpClient';
import LocalStorageAdapter from '../../infrastructure/LocalStorageAdapter';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5068';

class AuthService {
  constructor() {
    this.storageKey = 'auth';
    this.subscribers = [];
    const stored = LocalStorageAdapter.get(this.storageKey);
    if (stored) {
      this.accessToken = stored.tokens.access;
      this.refreshToken = stored.tokens.refresh;
      this.currentUser = stored.user;
    } else {
      this.accessToken = null;
      this.refreshToken = null;
      this.currentUser = null;
    }
  }

  async register({ email, password }) {
    const url = `${API_BASE}/register?cookieMode=false&persistCookies=false`;
    const resp = await HttpClient.post(url, { email, password });
    // 204 No Content means proceed to login
    return null;
  }

  async login({ email, password }) {
    const url = `${API_BASE}/login?cookieMode=false&persistCookies=false`;
    const resp = await HttpClient.post(url, { email, password });
    const { accessToken, refreshToken } = resp;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.currentUser = { email };
    this._persist();
    this.subscribers.forEach(cb => cb(this.currentUser));
    return this.currentUser;
  }

  async refresh() {
    if (!this.refreshToken) throw new Error('No refresh token');
    const { accessToken, refreshToken } = await HttpClient.post(
      `${API_BASE}/refresh`,
      { refreshToken: this.refreshToken }
    );
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this._persist();
    return accessToken;
  }

  async logout() {
    try {
      await HttpClient.post(`${API_BASE}/logout`, {});
    } catch {
      // ignore
    }
    this._clearAuth();
  }

  getAccessToken() {
    return this.accessToken;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  onAuthChange(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  _persist() {
    LocalStorageAdapter.set(this.storageKey, {
      tokens: { access: this.accessToken, refresh: this.refreshToken },
      user: this.currentUser
    });
  }

  _clearAuth() {
    this.accessToken = null;
    this.refreshToken = null;
    this.currentUser = null;
    LocalStorageAdapter.remove(this.storageKey);
    this.subscribers.forEach(cb => cb(null));
  }
}

const authService = new AuthService();
export default authService;
