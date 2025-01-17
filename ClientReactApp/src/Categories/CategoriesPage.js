import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCategoryData from '../hooks/useCategoryData';
import './CategoriesPage.css';

const CategoriesPage = () => {
  const { categories, loading, error } = useCategoryData();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);
    if (selectedCategory) {
      navigate(`/categories/${selectedCategory}`);
    }
  };

  if (loading) return <p>⏳ Ładowanie listy kategorii...</p>;
  if (error) return <p>❌ Błąd: {error}</p>;
  if (categories.length === 0) return <p>ℹ️ Brak dostępnych kategorii.</p>;

  return (
    <div className="categories-container">
      <h2>🎯 Wybierz kategorię produktów</h2>
      <div className="categories-dropdown">
        <select
          defaultValue=""
          onChange={handleCategoryChange}
          aria-label="Wybierz kategorię produktów"
        >
          <option value="" disabled>
            Wybierz kategorię
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      {selectedCategory && <p>Przekierowywanie do kategorii ID: {selectedCategory}...</p>}
    </div>
  );
};

export default CategoriesPage;
