// src/hooks/useShopPromotionsData.js

import { useState, useEffect } from 'react';
import promotionsData from '../dummyData/promotionsData';
import shopsData from '../dummyData/shopsData';

const useShopPromotionsData = (shopId) => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const useDummyData = true; // Przełącznik między danymi testowymi a API

  useEffect(() => {
    const fetchPromotions = async () => {
      setLoading(true); // Upewniamy się, że stan ładowania jest aktywny przed pobieraniem
      setError(null);   // Resetujemy błąd przed nowym żądaniem

      try {
        if (useDummyData) {
          console.log('ℹ️ Używanie danych testowych (promotionsData)');

          // Znajdź sklep po ID
          const shop = shopsData.find(s => s.id === Number(shopId));

          if (!shop) {
            throw new Error(`❌ Nie znaleziono sklepu o ID ${shopId}`);
          }

          // Filtrowanie promocji po nazwie sklepu
          const filteredPromotions = promotionsData.filter(
            promo => promo.store === shop.name
          );

          setPromotions(filteredPromotions);
        } else {
          console.log('🌐 Pobieranie danych z API');
          const response = await fetch(`http://localhost:4000/api/shops/${shopId}/discounts`);

          if (!response.ok) {
            throw new Error(`❌ HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          setPromotions(data);
        }
      } catch (err) {
        console.error('❌ Błąd podczas pobierania promocji:', err.message);
        setError(err.message);
      } finally {
        setLoading(false); // Ładowanie zakończone niezależnie od wyniku
      }
    };

    fetchPromotions();
  }, [shopId]);

  return { promotions, loading, error };
};

export default useShopPromotionsData;
