import { useState, useEffect } from 'react';

const useShopsData = () => {
  const [shops, setShops] = useState([]); // Rename to 'shops'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        console.log('🌐 Pobieranie danych z API');
        const response = await fetch('http://localhost:5068/api/Stores');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setShops(data); // Update to 'shops'
      } catch (err) {
        console.error('❌ Błąd podczas pobierania danych:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

  return { shops, loading, error }; // Update to return 'shops'
};

export default useShopsData;
