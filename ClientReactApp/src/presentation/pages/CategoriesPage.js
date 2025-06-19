// src/presentation/pages/CategoriesPage.js
import React from 'react';
import CategoryList from '../components/CategoryList';

export default function CategoriesPage() {
  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Kategorie</h2>
      <CategoryList />
    </div>
  );
}
