import React, { useState, useEffect } from 'react';
import './Promotions.css';
import api from '../Services/api';

const formatDate = (date) => {
  if (!date) return null;
  const parsedDate = new Date(date);
  if (isNaN(parsedDate)) return date;
  const day = String(parsedDate.getDate()).padStart(2, '0');
  const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
  const year = parsedDate.getFullYear();
  return `${day}-${month}-${year}`;
};

const PromotionsItem = ({ promo }) => {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    // Pobranie listy ulubionych i ustawienie stanu dla tej promocji
    api.getFavourites()
      .then(favs => {
        const favIds = favs.map(f => f.id);
        setIsFav(favIds.includes(promo.id));
      })
      .catch(err => console.error('Błąd pobierania ulubionych:', err.message));
  }, [promo.id]);

  const toggleFav = () => {
    api.addFavourite(promo.id)
      .then(() => setIsFav(true))
      .catch(err => console.error('Błąd dodawania do ulubionych:', err.message));
  };

  const discountAmount = promo.discountAmount
    ? promo.discountAmount
    : (promo.originalPrice && promo.priceAfterPromotion
        ? (promo.originalPrice - promo.priceAfterPromotion).toFixed(2)
        : null);

  return (
    <div className="promotion-item">
      <button onClick={toggleFav} className="fav-button">
        {isFav ? '❤️' : '🤍'}
      </button>
      {promo.productName && <h3>🛒 {promo.productName}</h3>}
      {promo.storeName && <p>🏬 <strong>Sklep:</strong> {promo.storeName}</p>}
      {promo.priceAfterPromotion && <p>💲 <strong>Cena promocyjna:</strong> {promo.priceAfterPromotion}</p>}
      {promo.originalPrice && <p>💼 <strong>Cena regularna:</strong> {promo.originalPrice}</p>}
      {discountAmount && <p>🔖 <strong>Kwota promocji:</strong> {discountAmount}</p>}
      {promo.discountPercent && <p>📉 <strong>Procent promocji:</strong> {promo.discountPercent}%</p>}
      {promo.categoryName && <p>📦 <strong>Kategoria:</strong> {promo.categoryName}</p>}
      <p>📅 <strong>Okres promocji:</strong> {formatDate(promo.startDate)} - {formatDate(promo.endDate)}</p>
      {promo.untilOutOfStock !== undefined && (
        <p>📦 <strong>Dostępne do wyczerpania zapasów:</strong> {promo.untilOutOfStock ? '✔️' : '❌'}</p>
      )}
      {promo.requiredApp && (
        <p>📲 <strong>Wymagana aplikacja:</strong> {promo.requiredApp}</p>
      )}
    </div>
  );
};

export default PromotionsItem;
