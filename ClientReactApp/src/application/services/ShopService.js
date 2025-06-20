// src/application/services/ShopService.js
import HttpClient from '../../infrastructure/HttpClient';
import Shop from '../../domain/shop';

const ShopService = {
  async getAll() {
    const data = await HttpClient.get('/api/Stores');
    return data.map(item => new Shop(item));
  },

  async getById(storeId) {
    const data = await HttpClient.get(`/api/Promotions/store/${storeId}`);
    return data;
  }
};

export default ShopService;