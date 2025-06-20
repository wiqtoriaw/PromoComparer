// src/application/hooks/useCategoryData.js
import useData from './useData';
import CategoryService from '../services/CategoryService';

export default function useCategoryData() {
  return useData(() => CategoryService.getAll());
}