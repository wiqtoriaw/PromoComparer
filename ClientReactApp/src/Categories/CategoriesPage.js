import React from 'react';
import { useNavigate } from 'react-router-dom';
import useCategoryData from '../hooks/useCategoryData';
import './CategoriesPage.css';

const CategoriesPage = () => {
  const { categories, loading, error } = useCategoryData();
  const navigate = useNavigate();

  // Obsługa zmiany wyboru kategorii
  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    if (selectedCategory) {
      navigate(`/categories/${selectedCategory}/promotions`);
    }
  };

  if (loading) return <p>⏳ Ładowanie listy kategorii...</p>;
  if (error) return <p>❌ Błąd: {error}</p>;

  return (
    <div className="categories-container">
      <h2>🎯 Wybierz kategorię produktów</h2>
      <div className="categories-dropdown">
        <select defaultValue="" onChange={handleCategoryChange}>
          <option value="" disabled>
            Wybierz kategorię
          </option>
          {categories.map(category => (
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
