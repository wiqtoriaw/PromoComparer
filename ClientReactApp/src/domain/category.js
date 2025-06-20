// src/domain/category.js

class Category {
  constructor({ id, name, description = '' }) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
}

export default Category;