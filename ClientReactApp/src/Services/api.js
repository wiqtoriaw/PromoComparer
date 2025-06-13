// src/Services/api.js
import { getAccessToken, refreshToken, logout } from './auth';
const API_BASE = 'http://localhost:5068';

async function fetchWithAuth(path, options = {}) {
  let token = getAccessToken();
  let res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : undefined,
      ...options.headers
    }
  });

  if (res.status === 401) {
    const r = await refreshToken();
    if (r.accessToken) {
      token = r.accessToken;
      res = await fetch(`${API_BASE}${path}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          ...options.headers
        }
      });
    } else {
      logout();
      throw new Error('Brak autoryzacji');
    }
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || res.statusText);
  }

  return res.json();
}

const api = {
  // publiczne
  getStores:     () => fetch(`${API_BASE}/api/stores`).then(r => r.json()),
  getCategories: () => fetch(`${API_BASE}/api/categories`).then(r => r.json()),

  // chronione
  getMe:         () => fetchWithAuth('/users/me'),
  getFavourites: () => fetchWithAuth('/api/UserPanel/favourite-promotions'),
  addFavourite:  id => fetchWithAuth('/api/UserPanel', {
                     method: 'POST',
                     body: JSON.stringify({ promotionId: id })
                   }),
  removeFavourite: id => fetchWithAuth(`/api/UserPanel/${id}`, {
                         method: 'DELETE'
                       }),

  // dodatkowe
  getTopPromotions:        () => fetch(`${API_BASE}/api/Promotions/top`).then(r => r.json()),
  getPromotionsByCategory: id => fetch(`${API_BASE}/api/Promotions/category/${id}`)
                                     .then(r => r.ok ? r.json() : Promise.reject(r.statusText)),
  getPromotionsByStore:    id => fetch(`${API_BASE}/api/Promotions/store/${id}`)
                                     .then(r => r.ok ? r.json() : Promise.reject(r.statusText))
};

export default api;
