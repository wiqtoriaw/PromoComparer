// src/Services/auth.js
const API_BASE = 'http://localhost:5068';

/**
 * Rejestracja nowego użytkownika.
 * Przyjmuje obiekt { email, password } i zwraca JSON z tokenami.
 * Jeśli rejestracja się nie powiedzie, rzuca błąd.
 */
export async function register({ email, password }) {
  const res = await fetch(`${API_BASE}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || res.statusText);
  // Automatycznie zapisujemy tokeny jeśli są dostępne
  if (json.accessToken) {
    localStorage.setItem('accessToken', json.accessToken);
  }
  if (json.refreshToken) {
    localStorage.setItem('refreshToken', json.refreshToken);
  }
  return json;
}

/**
 * Logowanie istniejącego użytkownika.
 * Przyjmuje dwa argumenty: email i password.
 * Zapisuje accessToken i refreshToken w localStorage.
 */
export async function login(email, password) {
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || res.statusText);
  localStorage.setItem('accessToken', json.accessToken);
  localStorage.setItem('refreshToken', json.refreshToken);
  return json;
}

/**
 * Odświeżenie accessToken przy użyciu refreshToken.
 * Zapisuje nowy accessToken w localStorage.
 */
export async function refreshToken() {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) throw new Error('Brak refresh token');

  const res = await fetch(`${API_BASE}/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken })
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.error || res.statusText);
  localStorage.setItem('accessToken', json.accessToken);
  return json;
}

/**
 * Wylogowanie użytkownika - usunięcie tokenów.
 */
export function logout() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}

/**
 * Pobiera accessToken z localStorage.
 */
export function getAccessToken() {
  return localStorage.getItem('accessToken');
}

/**
 * Pobiera aktualne dane zalogowanego użytkownika.
 * Wysyła zapytanie z nagłówkiem Authorization.
 */
export async function fetchCurrentUser() {
  const token = getAccessToken();
  if (!token) return null;

  const res = await fetch(`${API_BASE}/users/me`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (!res.ok) {
    throw new Error('Nie udało się pobrać danych użytkownika');
  }
  return res.json();
}
