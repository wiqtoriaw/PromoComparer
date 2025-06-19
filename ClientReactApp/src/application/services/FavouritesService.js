// src/application/services/FavouritesService.js
// Service Layer: zarządzanie ulubionymi promocjami użytkownika

import LocalStorageAdapter from '../../infrastructure/LocalStorageAdapter';
import AuthService from './AuthService';

const FavouritesService = {
  storageKey(userId) {
    return `favourites_${userId}`;
  },

  getAll() {
    const user = AuthService.getCurrentUser();
    if (!user) return [];
    return LocalStorageAdapter.get(this.storageKey(user.id)) || [];
  },

  add(promotionId) {
    const user = AuthService.getCurrentUser();
    if (!user) throw new Error('User not logged in');
    const favs = new Set(this.getAll());
    favs.add(promotionId);
    LocalStorageAdapter.set(this.storageKey(user.id), Array.from(favs));
    return Array.from(favs);
  },

  remove(promotionId) {
    const user = AuthService.getCurrentUser();
    if (!user) throw new Error('User not logged in');
    const favs = new Set(this.getAll());
    favs.delete(promotionId);
    LocalStorageAdapter.set(this.storageKey(user.id), Array.from(favs));
    return Array.from(favs);
  }
};

export default FavouritesService;