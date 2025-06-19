// src/domain/category.js
// Encja reprezentująca kategorię promocji

class Category {
  constructor({ id, name, description = '' }) {
    this.id = id;
    this.name = name;
    this.description = description;
  }

  // Możemy tu dodać metody biznesowe specyficzne dla kategorii
}

export default Category;