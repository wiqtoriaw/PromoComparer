// src/domain/promotion.js

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

  isActive(referenceDate = new Date()) {
    return referenceDate >= this.startDate && referenceDate <= this.endDate;
  }
}

export default Promotion;