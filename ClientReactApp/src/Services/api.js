// src/Services/api.js
import { getAccessToken, refreshToken, logout } from './auth';

const API_BASE = 'http://localhost:5068';

/**
 * Helper który dokłada Authorization: Bearer <token> i automatycznie
 * próbuje odświeżyć token przy 401.
 */
async function fetchWithAuth(path, options = {}) {
  let token = getAccessToken();
  if (!token) throw new Error('Proszę się najpierw zalogować');

  let res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    // spróbuj odświeżyć
    try {
      const { accessToken } = await refreshToken();
      token = accessToken;
      res = await fetch(`${API_BASE}${path}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
          Authorization: `Bearer ${token}`,
        },
      });
    } catch {
      logout();
      throw new Error('Sesja wygasła, zaloguj się ponownie');
    }
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || res.statusText);
  }

  return res.json();
}

export default {
  // publiczne
  getStores:     () => fetch(`${API_BASE}/api/Stores`).then(r => r.json()),
  getCategories: () => fetch(`${API_BASE}/api/Categories`).then(r => r.json()),

  // ulubione (chronione)
  getFavourites:    () => fetchWithAuth('/api/UserPanel/favourite-promotions'),
  addFavourite:     id => fetchWithAuth('/api/UserPanel', {
                       method: 'POST',
                       body: JSON.stringify({ promotionId: id }),
                     }),
  removeFavourite:  id => fetchWithAuth(`/api/UserPanel/${id}`, {
                       method: 'DELETE',
                     }),

  // reszta
  getTopPromotions:        () => fetch(`${API_BASE}/api/Promotions/top`).then(r => r.json()),
  getPromotionsByCategory: id => fetch(`${API_BASE}/api/Promotions/category/${id}`).then(r => r.json()),
  getPromotionsByStore:    id => fetch(`${API_BASE}/api/Promotions/store/${id}`).then(r => r.json()),
};
