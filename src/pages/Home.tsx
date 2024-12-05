import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Features from '../components/ui/Features';
import CTA from '../components/ui/CTA';
import productsData from '../data/products.json';
import MenuPreview from '../components/ui/Menu';
import LocationSection from '../components/ui/Location';

const HomePage: React.FC = () => {
  const images = [
    '/images/closeup-shot-delicious-cream-puff-with-strawberries-wooden-table_181624-22715.jpg',
    '/images/delicious-unhealthy-pastry-copy-space_23-2148516577.jpg',
    '/images/variety-pastries-wooden-boards_114579-17198.jpg',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [cakes, setCakes] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const allProducts = productsData.categories.flatMap((category) => category.products);
    const randomCakes = allProducts.sort(() => 0.5 - Math.random()).slice(0, 4);
    setCakes(randomCakes);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[90vh] md:h-screen overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div 
            key={currentIndex}
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={images[currentIndex]}
              alt={`Bakery Image ${currentIndex + 1}`}
              className="w-full h-full object-cover filter brightness-75"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="text-center text-white max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight"
            >
              Indulge in Sweet Perfection
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-gray-200"
            >
              Discover our artisanal cakes and confections, crafted with love for every occasion
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 rounded-lg bg-pink-600 text-white font-semibold text-lg 
              hover:bg-pink-700 transition-all duration-300 ease-in-out 
              shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
              onClick={() => navigate('/categories')}
            >
              Explore Our Cakes
            </motion.button>
          </div>
        </div>
        
        {/* Navigation Buttons */}
        <div className="absolute inset-x-0 top-1/2 flex justify-between px-4 -translate-y-1/2">
          <button
            onClick={prevSlide}
            className="bg-white/20 hover:bg-white/40 p-3 rounded-full transition-all duration-300 
            backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="bg-white/20 hover:bg-white/40 p-3 rounded-full transition-all duration-300 
            backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
      </section>

      {/* Features Section */}
      <Features />

      {/* About Section */}
      <section className="py-20 bg-gradient-to-b from-pink-50 to-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Sweet Story</h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              At Cakes4U, we blend passion with precision to create edible masterpieces. 
              Our journey began with a simple love for baking and has blossomed into a 
              commitment to sweeten life's moments, one cake at a time.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 rounded-lg bg-pink-600 text-white font-semibold text-lg 
              hover:bg-pink-700 transition-all duration-300 ease-in-out 
              shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
              onClick={() => navigate('/about')}
            >
              Discover Our Journey
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Menu Section */}
      <MenuPreview cakes={cakes} />

      {/* Location Section */}
      <LocationSection />

      {/* CTA */}
      <div className="mt-12 mb-12">
        <CTA />
      </div>
    </div>
  );
};

export default HomePage;