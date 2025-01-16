import { useState, useEffect } from 'react';

const useCategoryPromotionsData = (categoryId) => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!categoryId) {
      setError('Brak ID kategorii');
      setLoading(false);
      return;
    }

    const fetchCategoryPromotions = async () => {
      try {
        console.log(`🌐 Pobieranie promocji dla kategorii o ID: ${categoryId}`);
        const response = await fetch(`http://localhost:5068/api/activepromotions/category/${categoryId}`);
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

    fetchCategoryPromotions();
  }, [categoryId]);

  return { promotions, loading, error };
};

export default useCategoryPromotionsData;