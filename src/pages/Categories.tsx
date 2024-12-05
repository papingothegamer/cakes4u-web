import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
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
      // Set a random featured category if needed
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
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Our Sweet World</h1>
          <p className="text-xl mb-8">Indulge in a variety of delightful treats for every occasion</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-pink-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-pink-100 transition duration-300"
            onClick={() => navigate('/categories')}
          >
            Explore All Products
          </motion.button>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Explore Our Categories</h2>
          <p className="text-xl text-gray-600 mb-6">Find the perfect treat for your sweet tooth</p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => handleCategoryClick(category)}
            >
              <img
                src={category.image}
                alt={category.name}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h2 className="text-xl font-semibold text-white mb-2">{category.name}</h2>
                <p className="text-sm text-white/80">{category.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Category Products */}
        <AnimatePresence>
          {selectedCategory && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white rounded-2xl shadow-xl mt-12 overflow-hidden"
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
              {isDropdownOpen && (
                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedCategory.products.map((product) => (
                      <ProductCard
                        key={product.id}
                        variant="display" // Specify the display variant
                        product={{
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image,
                        }}
                        quantity={1} // Default quantity for display variant
                        onQuantityChange={(newQuantity) => {
                          console.log(`Quantity changed to ${newQuantity} for product ${product.id}`);
                          // Implement your logic for handling quantity changes
                        }}
                        onAddToCart={() => handleAddToCart(product.id)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CategoriesPage;
