import { useState, useEffect } from 'react';

const useShopPromotionsData = (shopId) => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!shopId) {
      setError('Brak ID sklepu');
      setLoading(false);
      return;
    }

    const fetchShopPromotions = async () => {
      try {
        console.log(`🌐 Pobieranie promocji dla sklepu o ID: ${shopId}`);
        const response = await fetch(`http://localhost:5068/api/Promotions/store/${shopId}`);
        
        if (response.status === 404) {
          setPromotions([]);
          setError(null);
        } else if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        } else {
          const data = await response.json();
          setPromotions(data);
        }
      } catch (err) {
        console.error('❌ Błąd podczas pobierania danych:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShopPromotions();
  }, [shopId]);

  return { promotions, loading, error };
};

export default useShopPromotionsData;