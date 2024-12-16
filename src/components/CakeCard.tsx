import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Cake } from '../types';
import { useStore } from '../store/useStore';

interface CakeCardProps {
  cake: Cake;
}

export const CakeCard: React.FC<CakeCardProps> = ({ cake }) => {
  const addToCart = useStore((state) => state.addToCart);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking the add to cart button
    addToCart({ cake, quantity: 1 });
  };

  return (
    <Link to={`/product/${cake.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05 }}
        className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
      >
        <img
          src={cake.image}
          alt={cake.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900">{cake.name}</h3>
          <p className="mt-1 text-gray-500 text-sm line-clamp-2">{cake.description}</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xl font-bold text-pink-500">
              ${cake.price.toFixed(2)}
            </span>
            <button
              onClick={handleAddToCart}
              className="bg-pink-500 text-white px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-pink-600 transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};