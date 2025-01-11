import React from 'react';
import { useParams } from 'react-router-dom';
import Promotions from '../Promotions/Promotions';
import useShopPromotionsData from '../hooks/useShopPromotionsData';
import shopsData from '../dummyData/shopsData';

const ShopPromotionsPage = () => {
  const { id } = useParams();
  const { promotions, loading, error } = useShopPromotionsData(id);
  const shop = shopsData.find(s => s.id === Number(id));

  if (loading) return <p>⏳ Ładowanie promocji...</p>;
  if (error) return <p>❌ Błąd: {error}</p>;
  if (!shop) return <p>❌ Nie znaleziono sklepu o podanym ID.</p>;
  if (promotions.length === 0) return <p>ℹ️ Brak promocji dla sklepu {shop.name}.</p>;

  return (
    <div>
      <Promotions dataSource={promotions} title={`Promocje dla sklepu ${shop.name}`} />
    </div>
  );
};

export default ShopPromotionsPage;
