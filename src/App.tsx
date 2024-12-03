import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AboutUsPage from './pages/About';
import CategoriesPage from './pages/Categories';
import RecipesPage from './pages/Recipes';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutUsPage />} />
      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="/recipes" element={<RecipesPage />} />
    </Routes>
  );
};

export default App;

