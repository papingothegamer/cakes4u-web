import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

const CTA: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-gradient-to-r from-pink-500 to-purple-600 py-20 overflow-hidden">
      {/* Background Image */}
      <img
        src="/images/category-hero.jpg"
        alt="Delicious cake background"
        className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
      />
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
            Ready to Indulge in Sweetness?
          </h2>
          {/* Subheading */}
          <p className="text-xl md:text-2xl text-pink-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Discover our delightful range of cakes and make your celebrations unforgettable!
          </p>
          {/* CTA Button */}
          <Button
            onClick={() => navigate('/categories')}
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
