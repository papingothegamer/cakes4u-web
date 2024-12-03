import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/ui/layout';
import './index.css';
import App from './App';
import CategoriesPage from './pages/Categories';
import ProductPage from './pages/ProductPage';
import RecipesPage from './pages/Recipes';
import AboutPage from './pages/About';
import Checkout from './pages/Checkout';
import { CartProvider } from './context/cartContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <CartProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/product/:productId" element={<ProductPage />} />
            <Route path="/recipes" element={<RecipesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </Layout>
      </Router>
    </CartProvider>
  </React.StrictMode>
);

