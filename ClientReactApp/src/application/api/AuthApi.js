// src/application/api/AuthApi.js
import HttpClient from '../../infrastructure/HttpClient';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5068';

export async function login({ email, password }) {
  const url = `${API_BASE}/login?cookieMode=false&persistCookies=false`;
  return HttpClient.post(url, { email, password });
}

export async function register({ email, password }) {
  const url = `${API_BASE}/register?cookieMode=false&persistCookies=false`;
  return HttpClient.post(url, { email, password });
}

export async function refresh(refreshToken) {
  return HttpClient.post(`${API_BASE}/refresh`, { refreshToken });
}

export async function logout() {
  return HttpClient.post(`${API_BASE}/logout`, {});
}
