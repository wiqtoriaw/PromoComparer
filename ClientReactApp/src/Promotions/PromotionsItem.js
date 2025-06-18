// src/Promotions/PromotionsItem.js
import React from 'react';
import './Promotions.css';
import { useFavourites } from '../context/FavouritesContext';

const formatDate = date => {
  if (!date) return null;
  const d = new Date(date);
  if (isNaN(d)) return date;
  const dd = String(d.getDate()).padStart(2,'0');
  const mm = String(d.getMonth()+1).padStart(2,'0');
  const yy = d.getFullYear();
  return `${dd}-${mm}-${yy}`;
};

export default function PromotionsItem({ promo }) {
  const { isFavourite, addFavourite, removeFavourite } = useFavourites();
  const fav = isFavourite(promo.id);
  const toggle = () => fav ? removeFavourite(promo.id) : addFavourite(promo.id);

  const discountAmount = promo.discountAmount != null
    ? promo.discountAmount
    : (promo.originalPrice != null && promo.priceAfterPromotion != null)
      ? (promo.originalPrice - promo.priceAfterPromotion).toFixed(2)
      : null;

  return (
    <div className="promotion-item">
      <button onClick={toggle} className="fav-button">
        {fav ? '❤️' : '🤍'}
      </button>
      {promo.productName && <h3>🛒 {promo.productName}</h3>}
      {promo.storeName    && <p>🏬 <strong>Sklep:</strong> {promo.storeName}</p>}
      {promo.priceAfterPromotion != null &&
         <p>💲 <strong>Cena promocyjna:</strong> {promo.priceAfterPromotion}</p>}
      {promo.originalPrice != null &&
         <p>💼 <strong>Cena regularna:</strong> {promo.originalPrice}</p>}
      {discountAmount &&
         <p>🔖 <strong>Kwota promocji:</strong> {discountAmount}</p>}
      {promo.discountPercent != null &&
         <p>📉 <strong>Procent promocji:</strong> {promo.discountPercent}%</p>}
      {promo.categoryName &&
         <p>📦 <strong>Kategoria:</strong> {promo.categoryName}</p>}
      <p>📅 <strong>Okres:</strong> {formatDate(promo.startDate)} – {formatDate(promo.endDate)}</p>
      {promo.untilOutOfStock != null &&
         <p>📦 <strong>Do wyczerpania zapasów:</strong> {promo.untilOutOfStock ? '✔️' : '❌'}</p>}
      {promo.requiredApp &&
         <p>📲 <strong>Wymagana aplikacja:</strong> {promo.requiredApp}</p>}
    </div>
  );
}
