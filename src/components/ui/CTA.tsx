import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

const CTA: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-pink-500 to-purple-600 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Indulge in Sweetness?
          </h2>
          <p className="text-xl md:text-2xl text-pink-100 mb-10 max-w-2xl mx-auto">
            Discover our delightful range of cakes and make your celebrations unforgettable!
          </p>
          <Button
            onClick={() => console.log('Order Your Cake Now clicked!')}
            className="bg-white text-pink-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-pink-100 transition duration-300 shadow-lg"
          >
            Order Your Cake Now
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
