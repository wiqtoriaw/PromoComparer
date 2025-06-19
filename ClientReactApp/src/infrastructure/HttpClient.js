// src/infrastructure/HttpClient.js
// Facade + Singleton: uproszczony klient HTTP z obsługą interceptorów

import AuthInterceptor from './AuthInterceptor';

class HttpClient {
  constructor() {
    this.baseUrl = process.env.REACT_APP_API_URL;
    this.interceptor = new AuthInterceptor(this);
  }

  async request(path, options = {}) {
    const url = `${this.baseUrl}${path}`;
    const opts = await this.interceptor.intercept(options);
    const response = await fetch(url, opts);
    if (!response.ok) {
      // Można tu dodać dodatkowe logowanie błędów
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  get(path) {
    return this.request(path, { method: 'GET' });
  }

  post(path, body) {
    return this.request(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  }

  put(path, body) {
    return this.request(path, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  }

  delete(path) {
    return this.request(path, { method: 'DELETE' });
  }
}

export default new HttpClient();
