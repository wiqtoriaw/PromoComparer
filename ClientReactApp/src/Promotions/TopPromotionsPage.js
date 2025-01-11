import React, { useState } from 'react';
import promotionsData from '../dummyData/promotionsData';
import Promotions from './Promotions';
import './TopPromotionsPage.css';

const TopPromotionsPage = () => {
  const [sortedPromotions, setSortedPromotions] = useState(promotionsData.slice(0, 10));
  const handleValueClick = () => {
    const sorted = [...promotionsData]
      .sort((a, b) => parseFloat(b.discount_value.replace(' PLN', '')) - parseFloat(a.discount_value.replace(' PLN', '')))
      .slice(0, 10);
    setSortedPromotions(sorted);
  };

  const handlePercentageClick = () => {
    const sorted = [...promotionsData]
      .sort((a, b) => {
        const discountA = (parseFloat(a.original_price.replace(' PLN', '')) - parseFloat(a.discount_price.replace(' PLN', ''))) / parseFloat(a.original_price.replace(' PLN', ''));
        const discountB = (parseFloat(b.original_price.replace(' PLN', '')) - parseFloat(b.discount_price.replace(' PLN', ''))) / parseFloat(b.original_price.replace(' PLN', ''));
        return discountB - discountA;
      })
      .slice(0, 10);
    setSortedPromotions(sorted);
  };

  return (
    <div className="top-promotions-container">
      <Promotions dataSource={sortedPromotions} title="Największe Promocje" />
      <div className="button-container">
        <button onClick={handleValueClick}>Wartościowo</button>
        <button onClick={handlePercentageClick}>Procentowo</button>
      </div>
    </div>
  );
};

export default TopPromotionsPage;
