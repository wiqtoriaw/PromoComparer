// src/application/hooks/usePromotionData.js
import useData from './useData';
import PromotionService from '../services/PromotionService';

export default function usePromotionData() {
  const { data, loading, error } = useData(() => PromotionService.getActive());
  return { promotions: data, loading, error };
}