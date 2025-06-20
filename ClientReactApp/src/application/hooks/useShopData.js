// src/application/hooks/useShopData.js
import useData from './useData';
import ShopService from '../services/ShopService';

export default function useShopData() {
  return useData(() => ShopService.getAll());
}