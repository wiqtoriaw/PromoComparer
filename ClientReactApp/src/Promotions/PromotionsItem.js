<<<<<<< Updated upstream
import React from 'react';
import './Promotions.css';
=======
// src/Promotions/PromotionsItem.js
import React from 'react';
import './Promotions.css';
import { useFavourites } from '../context/FavouritesContext';
>>>>>>> Stashed changes

const formatDate = (date) => {
  if (!date) return null;
  const parsedDate = new Date(date);
  if (isNaN(parsedDate)) return date;
  const day = String(parsedDate.getDate()).padStart(2, '0');
  const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
  const year = parsedDate.getFullYear();
  return `${day}-${month}-${year}`;
};

<<<<<<< Updated upstream
const PromotionsItem = ({ promo }) => {
=======
export default function PromotionsItem({ promo }) {
  const { isFavourite, addFavourite, removeFavourite } = useFavourites();
  const fav = isFavourite(promo.id);

  const toggleFav = () => {
    if (fav) {
      removeFavourite(promo.id);
    } else {
      addFavourite(promo.id);
    }
  };

>>>>>>> Stashed changes
  const discountAmount = promo.discountAmount
    ? promo.discountAmount
    : (promo.originalPrice != null && promo.priceAfterPromotion != null
        ? (promo.originalPrice - promo.priceAfterPromotion).toFixed(2)
        : null);

  return (
    <div className="promotion-item">
<<<<<<< Updated upstream
=======
      <button onClick={toggleFav} className="fav-button">
        {fav ? '❤️' : '🤍'}
      </button>
>>>>>>> Stashed changes
      {promo.productName && <h3>🛒 {promo.productName}</h3>}
      {promo.storeName && <p>🏬 <strong>Sklep:</strong> {promo.storeName}</p>}
      {promo.priceAfterPromotion != null && (
        <p>💲 <strong>Cena promocyjna:</strong> {promo.priceAfterPromotion}</p>
      )}
      {promo.originalPrice != null && (
        <p>💼 <strong>Cena regularna:</strong> {promo.originalPrice}</p>
      )}
      {discountAmount && (
        <p>🔖 <strong>Kwota promocji:</strong> {discountAmount}</p>
      )}
      {promo.discountPercent && (
        <p>📉 <strong>Procent promocji:</strong> {promo.discountPercent}%</p>
      )}
      {promo.categoryName && (
        <p>📦 <strong>Kategoria:</strong> {promo.categoryName}</p>
      )}
      <p>
        📅 <strong>Okres promocji:</strong>{' '}
        {formatDate(promo.startDate)} – {formatDate(promo.endDate)}
      </p>
      {promo.untilOutOfStock !== undefined && (
        <p>
          📦 <strong>Dostępne do wyczerpania zapasów:</strong>{' '}
          {promo.untilOutOfStock ? '✔️' : '❌'}
        </p>
      )}
      {promo.requiredApp && (
        <p>📲 <strong>Wymagana aplikacja:</strong> {promo.requiredApp}</p>
      )}
    </div>
  );
}
