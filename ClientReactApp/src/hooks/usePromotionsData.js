import { useState, useEffect } from 'react';

const usePromotionsData = () => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        console.log('🌐 Pobieranie danych z API');
        const response = await fetch('http://localhost:5068/api/Promotions/active');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPromotions(data);
      } catch (err) {
        console.error('❌ Błąd podczas pobierania danych:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
  }, []);

  return { promotions, loading, error };
};

export default usePromotionsData;