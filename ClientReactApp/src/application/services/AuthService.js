// src/application/services/AuthService.js
import * as AuthApi from '../api/AuthApi';
import * as AuthStorage from './AuthStorage';

class AuthService {
  constructor() {
    this.subscribers = [];
    this._restore();
  }

  _restore() {
    const stored = AuthStorage.loadAuth();
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

  async login({ email, password }) {
    const resp = await AuthApi.login({ email, password });
    const { accessToken, refreshToken } = resp;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.currentUser = { email };
    AuthStorage.saveAuth({ tokens: { access: accessToken, refresh: refreshToken }, user: this.currentUser });
    this.subscribers.forEach(cb => cb(this.currentUser));
    return this.currentUser;
  }

  async register(data) {
    await AuthApi.register(data);
  }

  async refresh() {
    if (!this.refreshToken) throw new Error('No refresh token');
    const { accessToken, refreshToken } = await AuthApi.refresh(this.refreshToken);
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    AuthStorage.saveAuth({ tokens: { access: accessToken, refresh: refreshToken }, user: this.currentUser });
    return accessToken;
  }

  async logout() {
    try { await AuthApi.logout(); } catch {}
    this.accessToken = null;
    this.refreshToken = null;
    this.currentUser = null;
    AuthStorage.clearAuth();
    this.subscribers.forEach(cb => cb(null));
  }

  getAccessToken() { return this.accessToken; }
  getCurrentUser() { return this.currentUser; }
  onAuthChange(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }
}

const authService = new AuthService();
export default authService;
