import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ShoppingBag } from 'lucide-react';
import productsData from '../data/products.json';
import ProductCard from '../components/product-ui/productCard';
import { useCart, CartItem } from '../context/cartContext';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  variants: { id: string; name: string; price: number }[];
}

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  products: Product[];
}

const CategoriesPage: React.FC = () => {
  const navigate = useNavigate();
  const categories: Category[] = productsData.categories;
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    if (categories.length > 0) {
      const randomIndex = Math.floor(Math.random() * categories.length);
      setSelectedCategory(categories[randomIndex]);
    }
  }, [categories]);

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(true);
  };

  const handleAddToCart = (productId: string) => {
    const product = selectedCategory?.products.find((p) => p.id === productId);
    if (product) {
      const cartItem: CartItem = {
        ...product,
        quantity: 1,
      };
      addToCart(cartItem);
      console.log(`Added product ${productId} to cart.`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up">Discover Our Sweet World</h1>
          <p className="text-xl md:text-2xl mb-10 animate-fade-in-up delay-200">Indulge in a variety of delightful treats for every occasion</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-pink-600 px-10 py-4 rounded-full text-lg font-semibold hover:bg-pink-100 transition duration-300 shadow-lg animate-fade-in-up delay-400"
            onClick={() => navigate('/categories')}
          >
            Explore All Products
          </motion.button>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">Explore Our Categories</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">Find the perfect treat for your sweet tooth and discover a world of flavors</p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => handleCategoryClick(category)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <img
                src={category.image}
                alt={category.name}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h2 className="text-2xl font-semibold text-white mb-2">{category.name}</h2>
                <p className="text-sm text-white/90">{category.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Selected Category Products */}
        <AnimatePresence>
          {selectedCategory && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white rounded-2xl shadow-xl mt-16 overflow-hidden"
            >
              <div
                className="bg-gradient-to-r from-pink-600 to-purple-600 text-white p-6 cursor-pointer flex justify-between items-center"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <h2 className="text-2xl font-bold">{selectedCategory.name}</h2>
                <ChevronDown
                  className={`transform transition-transform duration-300 ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </div>
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-6"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {selectedCategory.products.map((product) => (
                        <ProductCard
                          key={product.id}
                          variant="display"
                          product={{
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image: product.image,
                          }}
                          quantity={1}
                          onQuantityChange={(newQuantity) => {
                            console.log(`Quantity changed to ${newQuantity} for product ${product.id}`);
                          }}
                          onAddToCart={() => handleAddToCart(product.id)}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CategoriesPage;

