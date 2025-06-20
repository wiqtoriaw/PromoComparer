// src/infrastructure/HttpClient.js
// Facade + Singleton: klient HTTP z retry przy token expiration

import AuthInterceptor from './AuthInterceptor';

class HttpClient {
  constructor() {
    this.baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5068';
    this.interceptor = new AuthInterceptor(this);
  }

  async request(path, options={}) {
    const url = path.startsWith('http') ? path : this.baseUrl + path;
    const opts = await this.interceptor.intercept(options);
    try {
      const res = await fetch(url, opts);
      if (!res.ok) {
        const error = new Error(`HTTP ${res.status}`);
        error.response = res;
        error.url = url;
        error.options = opts;
        throw error;
      }
      return res.json();
    } catch (e) {
      return this.interceptor.handleResponseError(e, { url:path, ...opts });
    }
  }

  get(p)    { return this.request(p, { method:'GET' }); }
  post(p,b) { return this.request(p, { method:'POST', body:JSON.stringify(b)}); }
  put(p,b)  { return this.request(p, { method:'PUT',  body:JSON.stringify(b)}); }
  delete(p) { return this.request(p, { method:'DELETE' }); }
}

const httpClient = new HttpClient();
export default httpClient;