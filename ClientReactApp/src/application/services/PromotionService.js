// src/application/services/PromotionService.js
import HttpClient from '../../infrastructure/HttpClient';

const PromotionService = {
  getActive() {
    return HttpClient.get('/api/Promotions/active');
  },

  getTop() {
    return HttpClient.get('/api/Promotions/top');
  },

  getByCategory(categoryId) {
    return HttpClient.get(`/api/Promotions/category/${categoryId}`);
  },

  getByStore(storeId) {
    return HttpClient.get(`/api/Promotions/store/${storeId}`);
  },

  search(term) {
    return HttpClient.get(`/api/Promotions/search?query=${encodeURIComponent(term)}`);
  }
};

export default PromotionService;
