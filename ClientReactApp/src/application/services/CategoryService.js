// src/application/services/CategoryService.js
import HttpClient from '../../infrastructure/HttpClient';
import Category from '../../domain/category';

const CategoryService = {
  async getAll() {
    const data = await HttpClient.get('/api/Categories');
    return data.map(item => new Category(item));
  }
};

export default CategoryService;