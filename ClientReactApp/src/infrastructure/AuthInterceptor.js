import AuthService from '../application/services/AuthService';

class AuthInterceptor {
  constructor(client) {
    this.client = client;
  }

  async intercept(options) {
    const token = AuthService.getToken();
    const headers = { ...options.headers, 'Content-Type': 'application/json' };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return { ...options, headers };
  }
}

// Eksport domyślny klasy AuthInterceptor musi tu zostać
export default AuthInterceptor;