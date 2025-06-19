// src/domain/promotion.js
// Encja reprezentująca promocję

class Promotion {
  constructor({ id, title, description = '', categoryId, startDate, endDate, imageUrl = '' }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.categoryId = categoryId;
    this.startDate = new Date(startDate);
    this.endDate = new Date(endDate);
    this.imageUrl = imageUrl;
  }

  // Sprawdza, czy promocja jest aktywna w danym momencie
  isActive(referenceDate = new Date()) {
    return referenceDate >= this.startDate && referenceDate <= this.endDate;
  }

  // Można dodać inne metody, np. formatowanie dat, obliczenia czasu trwania
}

export default Promotion;