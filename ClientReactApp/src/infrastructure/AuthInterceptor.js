// src/infrastructure/AuthInterceptor.js

import AuthService from '../application/services/AuthService';

class AuthInterceptor {
  constructor(client) {
    this.client = client;
  }

  async intercept(options) {
    const token = AuthService.getAccessToken();
    const headers = { ...(options.headers||{}), 'Content-Type':'application/json' };
    if (token) headers.Authorization = `Bearer ${token}`;
    return { ...options, headers };
  }

  async handleResponseError(err, originalRequest) {
    if (err.response?.status === 401) {
      await AuthService.refresh();
      const opts = await this.intercept(originalRequest);
      return this.client.request(originalRequest.url, opts);
    }
    throw err;
  }
}

const authInterceptor = AuthInterceptor;
export default authInterceptor;