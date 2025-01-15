import React from 'react';
import PromotionsItem from './PromotionsItem';
import './Promotions.css';

const Promotions = ({ dataSource, title }) => {
  return (
    <div className="promotions-container">
      <h2>🎟️ {title}</h2>
      <div className="promotions-grid">
        {dataSource.map(promo => (
          <PromotionsItem key={promo.id} promo={promo} />
        ))}
      </div>
    </div>
  );
};

export default Promotions;
