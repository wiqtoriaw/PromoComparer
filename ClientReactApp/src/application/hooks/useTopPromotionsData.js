// src/application/hooks/useTopPromotionsData.js
import useData from './useData';
import PromotionService from '../services/PromotionService';

export default function useTopPromotionsData() {
  const { data, loading, error } = useData(() => PromotionService.getTop());
  return { topPromotions: data, loading, error };
}
