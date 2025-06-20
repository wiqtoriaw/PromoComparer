// src/application/hooks/usePromotionsData.js
import useData from './useData';
import PromotionService from '../services/PromotionService';

export default function usePromotionsData() {
  const { data: promotions, loading, error } = useData(() => PromotionService.getActive());
  return { promotions, loading, error };
}