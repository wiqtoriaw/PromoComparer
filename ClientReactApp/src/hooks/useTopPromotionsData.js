import { useState, useEffect } from 'react';

const useTopPromotionsData = () => {
  const [topPromotions, setTopPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopPromotions = async () => {
      try {
        console.log('🌐 Pobieranie danych z API');
        const response = await fetch('http://localhost:5068/api/top');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setTopPromotions(data);
      } catch (err) {
        console.error('❌ Błąd podczas pobierania danych:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTopPromotions();
  }, []);

  return { topPromotions, loading, error };
};

export default useTopPromotionsData;