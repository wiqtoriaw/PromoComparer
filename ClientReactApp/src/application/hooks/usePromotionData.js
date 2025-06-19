// src/application/hooks/usePromotionData.js
import useData from './useData';
import PromotionService from '../services/PromotionService';

export default function usePromotionData() {
  return useData(() => PromotionService.getAll());
}
