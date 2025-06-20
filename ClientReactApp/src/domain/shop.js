// src/domain/shop.js
class Shop {
  constructor({ id, name, description = '', imageUrl = '' }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
  }
}

export default Shop;
