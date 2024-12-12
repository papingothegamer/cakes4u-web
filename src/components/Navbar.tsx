import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Cake, User } from 'lucide-react';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';

export const Navbar = () => {
  const cart = useStore((state) => state.cart);
  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full bg-white shadow-md z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Cake className="h-8 w-8 text-pink-500" />
              <span className="text-2xl font-bold text-gray-900">Cakes4U</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-8">
            <Link to="/menu" className="text-gray-700 hover:text-pink-500">
              Menu
            </Link>
            <Link to="/custom-orders" className="text-gray-700 hover:text-pink-500">
              Custom Orders
            </Link>
            <Link to="/account" className="text-gray-700 hover:text-pink-500">
              <User className="h-6 w-6" />
            </Link>
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-pink-500" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};