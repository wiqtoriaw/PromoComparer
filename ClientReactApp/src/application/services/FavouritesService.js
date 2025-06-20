// src/application/services/FavouritesService.js
import HttpClient from '../../infrastructure/HttpClient';
import AuthService from './AuthService';
import Promotion from '../../domain/promotion';

const FavouritesService = {
  async getAll() {
    const user = AuthService.getCurrentUser();
    if (!user) return [];
    const data = await HttpClient.get('/api/UserPanel/favourite-promotions');
    return data.map(item => new Promotion(item));
  },

  async add(promotionId) {
    await HttpClient.post('/api/UserPanel', { promotionId });
    return this.getAll();
  },

  async remove(promotionId) {
    await HttpClient.delete(`/api/UserPanel/favourite-promotions/${promotionId}`);
    return this.getAll();
  }
};

export default FavouritesService;
