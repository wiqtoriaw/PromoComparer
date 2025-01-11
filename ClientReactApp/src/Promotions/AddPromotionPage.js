import React, { useState, useEffect } from 'react';
import categoriesData from '../dummyData/categoriesData';
import shopsData from '../dummyData/shopsData';
import promotionsData from '../dummyData/promotionsData';
import './AddPromotionPage.css';

const AddPromotionPage = () => {
  const [formData, setFormData] = useState({
    product_name: '',
    store: '',
    discount_value: '',
    discount_price: '',
    original_price: '',
    start_date: '',
    end_date: '',
    category: '',
  });

  const [localPromotions, setLocalPromotions] = useState(promotionsData);
  const [categories, setCategories] = useState([]);
  const [shops, setShops] = useState([]);

  // Dynamiczne ładowanie danych dummy
  useEffect(() => {
    setCategories(categoriesData);
    setShops(shopsData);
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Dodanie nowej promocji do lokalnego stanu
    const newPromotion = {
      ...formData,
      id: localPromotions.length + 1,
      discount_value: `${formData.discount_value} PLN`,
      discount_price: `${formData.discount_price} PLN`,
      original_price: `${formData.original_price} PLN`,
    };

    setLocalPromotions([...localPromotions, newPromotion]);

    // Czyszczenie formularza
    setFormData({
      product_name: '',
      store: '',
      discount_value: '',
      discount_price: '',
      original_price: '',
      start_date: '',
      end_date: '',
      category: '',
    });

    console.log('Nowa promocja dodana:', newPromotion);
  };

  return (
    <div className="add-promotion-container">
      <h2>➕ Dodaj nową promocję</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="product_name">Nazwa produktu:</label>
          <input
            type="text"
            id="product_name"
            name="product_name"
            value={formData.product_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="store">Sklep:</label>
          <select
            id="store"
            name="store"
            value={formData.store}
            onChange={handleInputChange}
            required
          >
            <option value="">Wybierz sklep</option>
            {shops.map(shop => (
              <option key={shop.id} value={shop.name}>
                {shop.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="category">Kategoria:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Wybierz kategorię</option>
            {categories.map(category => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="discount_value">Kwota promocji:</label>
          <input
            type="number"
            id="discount_value"
            name="discount_value"
            value={formData.discount_value}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="discount_price">Cena promocyjna:</label>
          <input
            type="number"
            id="discount_price"
            name="discount_price"
            value={formData.discount_price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="original_price">Cena regularna:</label>
          <input
            type="number"
            id="original_price"
            name="original_price"
            value={formData.original_price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="start_date">Data rozpoczęcia:</label>
          <input
            type="date"
            id="start_date"
            name="start_date"
            value={formData.start_date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="end_date">Data zakończenia:</label>
          <input
            type="date"
            id="end_date"
            name="end_date"
            value={formData.end_date}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Dodaj promocję</button>
      </form>
    </div>
  );
};

export default AddPromotionPage;
