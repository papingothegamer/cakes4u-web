import React from 'react';
import { motion } from 'framer-motion';
import { User, Settings, ShoppingBag, Heart } from 'lucide-react';

export const Account = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">My Account</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <div className="flex items-center space-x-4 mb-4">
            <User className="h-6 w-6 text-pink-500" />
            <h2 className="text-xl font-semibold">Profile</h2>
          </div>
          <p className="text-gray-600 mb-4">Manage your personal information and preferences</p>
          <button className="text-pink-500 hover:text-pink-600">
            Edit Profile →
          </button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <div className="flex items-center space-x-4 mb-4">
            <ShoppingBag className="h-6 w-6 text-pink-500" />
            <h2 className="text-xl font-semibold">Orders</h2>
          </div>
          <p className="text-gray-600 mb-4">View your order history and track current orders</p>
          <button className="text-pink-500 hover:text-pink-600">
            View Orders →
          </button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <div className="flex items-center space-x-4 mb-4">
            <Heart className="h-6 w-6 text-pink-500" />
            <h2 className="text-xl font-semibold">Favorites</h2>
          </div>
          <p className="text-gray-600 mb-4">Access your favorite cakes and saved designs</p>
          <button className="text-pink-500 hover:text-pink-600">
            View Favorites →
          </button>
        </motion.div>
      </div>
    </div>
  );
};