// src/application/services/PromotionService.js
import HttpClient from '../../infrastructure/HttpClient';

const PromotionService = {
  /** Wszystkie aktywne promocje */
  getActive() {
    return HttpClient.get('/api/Promotions/active');
  },

  /** Top 10 promocji */
  getTop() {
    return HttpClient.get('/api/Promotions/top');
  },

  /** Promocje według kategorii */
  getByCategory(categoryId) {
    return HttpClient.get(`/api/Promotions/category/${categoryId}`);
  },

  /** Promocje według sklepu */
  getByStore(storeId) {
    return HttpClient.get(`/api/Promotions/store/${storeId}`);
  },

  /** Wyszukiwanie promocji */
  search(term) {
    return HttpClient.get(`/api/Promotions/search?query=${encodeURIComponent(term)}`);
  }
};

export default PromotionService;
