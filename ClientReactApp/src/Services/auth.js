// src/Services/auth.js
const API_BASE = 'http://localhost:5068';

/** Rejestracja – może zwrócić 204 No Content lub JSON z tokenami */
export async function register({ email, password }) {
  const res = await fetch(
    `${API_BASE}/register?cookieMode=false&persistCookies=false`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        userName: email,
        password,
        confirmPassword: password,
      }),
    }
  );

  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    let msg = text;
    try {
      const problem = JSON.parse(text);
      msg =
        problem.detail ||
        (problem.errors
          ? Object.values(problem.errors).flat().join(', ')
          : res.statusText);
    } catch {}
    throw new Error(msg);
  }

  if (res.status === 204 || res.headers.get('content-length') === '0') {
    return null;
  }

  const json = await res.json();
  localStorage.setItem('accessToken', json.accessToken);
  if (json.refreshToken) {
    localStorage.setItem('refreshToken', json.refreshToken);
  }
  return json;
}

/** Logowanie – zwraca JSON z tokenami */
export async function login({ email, password }) {
  const res = await fetch(
    `${API_BASE}/login?cookieMode=false&persistCookies=false`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }
  );

  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    let msg = text;
    try {
      const errObj = JSON.parse(text);
      msg = errObj.error || errObj.detail || res.statusText;
    } catch {}
    throw new Error(msg);
  }

  const json = await res.json();
  localStorage.setItem('accessToken', json.accessToken);
  if (json.refreshToken) {
    localStorage.setItem('refreshToken', json.refreshToken);
  }
  return json;
}

/** Odświeżenie tokenu */
export async function refreshToken() {
  const rt = localStorage.getItem('refreshToken');
  if (!rt) throw new Error('Brak refresh token');

  const res = await fetch(`${API_BASE}/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken: rt }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(text);
  }

  const json = await res.json();
  localStorage.setItem('accessToken', json.accessToken);
  return json;
}

/** Wylogowanie */
export function logout() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}

/** Pobierz aktualny accessToken */
export function getAccessToken() {
  return localStorage.getItem('accessToken');
}
