import { useState, useEffect } from 'react';
import shopsData from '../dummyData/shopsData';

const useShopsData = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Przełącznik między lokalnymi danymi a API
  const useDummyData = true;

  useEffect(() => {
    const fetchShops = async () => {
      try {
        if (useDummyData) {
          console.log('ℹ️ Używanie danych testowych (shopsData)');
          // Symulacja opóźnienia (500 ms)
          setTimeout(() => {
            setShops(shopsData);
            setLoading(false);
          }, 500);
        } else {
          console.log('🌐 Pobieranie danych z API');
          const response = await fetch('http://localhost:4000/api/shops');
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          setShops(data);
        }
      } catch (err) {
        console.error('❌ Błąd podczas pobierania danych:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

  return { shops, loading, error };
};

export default useShopsData;
