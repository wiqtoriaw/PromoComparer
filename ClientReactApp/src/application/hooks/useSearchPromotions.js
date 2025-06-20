// src/application/hooks/useSearchPromotions.js
import { useState, useEffect } from 'react';
import PromotionService from '../services/PromotionService';

export default function useSearchPromotions(query) {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState(null);

  useEffect(() => {
    if (!query) {
      setPromotions([]);
      return;
    }
    let mounted = true;
    setLoading(true);
    PromotionService.search(query)
      .then(result => mounted && setPromotions(result))
      .catch(err    => mounted && setError(err))
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, [query]);

  return { promotions, loading, error };
}