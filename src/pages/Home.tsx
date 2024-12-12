import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Heart, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-cover bg-center" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80")'
      }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              Delicious Moments,<br />Crafted with Love
            </h1>
            <p className="text-xl mb-8">
              Discover our artisanal cakes made with premium ingredients
            </p>
            <Link
              to="/menu"
              className="bg-pink-500 text-white px-8 py-3 rounded-full inline-flex items-center space-x-2 hover:bg-pink-600 transition-colors"
            >
              <span>Order Now</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center p-6"
            >
              <Star className="h-12 w-12 text-pink-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600">Only the finest ingredients for our creations</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center p-6"
            >
              <Heart className="h-12 w-12 text-pink-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Made with Love</h3>
              <p className="text-gray-600">Each cake is crafted with passion and care</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center p-6"
            >
              <Gift className="h-12 w-12 text-pink-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Custom Orders</h3>
              <p className="text-gray-600">Create your perfect cake for any occasion</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};