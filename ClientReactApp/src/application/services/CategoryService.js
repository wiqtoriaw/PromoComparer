// src/application/services/CategoryService.js
// Service Layer: operacje na kategoriach

import HttpClient from '../../infrastructure/HttpClient';
import Category from '../../domain/category';

const CategoryService = {
  async getAll() {
    const data = await HttpClient.get('/categories');
    return data.map(item => new Category(item));
  },
  async getById(id) {
    const data = await HttpClient.get(`/categories/${id}`);
    return new Category(data);
  }
};

export default CategoryService;
