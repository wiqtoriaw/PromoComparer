// src/application/services/PromotionService.js
// Service Layer: operacje na promocjach

import HttpClient from '../../infrastructure/HttpClient';
import Promotion from '../../domain/promotion';

const PromotionService = {
  async getAll() {
    const data = await HttpClient.get('/promotions');
    return data.map(item => new Promotion(item));
  },
  async getTop() {
    const data = await HttpClient.get('/promotions/top');
    return data.map(item => new Promotion(item));
  },
  async getByCategory(categoryId) {
    const data = await HttpClient.get(`/categories/${categoryId}/promotions`);
    return data.map(item => new Promotion(item));
  }
};

export default PromotionService;