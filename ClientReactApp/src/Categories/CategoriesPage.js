import React from 'react';
import { useNavigate } from 'react-router-dom';
import categoriesData from '../dummyData/categoriesData';
import './CategoriesPage.css';

const CategoriesPage = () => {
  const navigate = useNavigate();

  // Obsługa zmiany wyboru kategorii
  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    if (selectedCategory) {
      navigate(`/categories/${selectedCategory}/promotions`);
    }
  };

  return (
    <div className="categories-container">
      <h2>🎯 Wybierz kategorię produktów</h2>
      <div className="categories-dropdown">
        <select defaultValue="" onChange={handleCategoryChange}>
          <option value="" disabled>
            Wybierz kategorię
          </option>
          {categoriesData.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CategoriesPage;
