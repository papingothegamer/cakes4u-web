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
    '/images/closeup-shot-delicious-cream-puff-with-strawberries-wooden-table_181624-22715.jpg?height=600&width=1200',
    '/images/delicious-unhealthy-pastry-copy-space_23-2148516577.jpg?height=600&width=1200',
    '/images/variety-pastries-wooden-boards_114579-17198.jpg?height=600&width=1200',
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
    const allProducts = productsData.categories.flatMap(category => category.products);
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
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Image Carousel */}
      <section className="relative h-screen overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Bakery Image ${currentIndex + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-4 leading-tight"
            >
              Indulge in Sweet Perfection
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
            >
              Discover our artisanal cakes and confections, crafted with love for every occasion
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-pink-700 transition duration-300 shadow-lg"
              onClick={() => navigate('/categories')}
            >
              Explore Our Cakes
            </motion.button>
          </div>
        </div>
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 p-3 rounded-full hover:bg-white/40 transition duration-300"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 p-3 rounded-full hover:bg-white/40 transition duration-300"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </section>

      <Features />

      {/* About Section */}
      <section className="py-24 bg-gradient-to-b from-pink-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Sweet Story</h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              At Cakes4U, we blend passion with precision to create edible masterpieces. Our journey began with a simple love for baking and has blossomed into a commitment to sweeten life's moments, one cake at a time. Using only the finest ingredients and innovative designs, we're here to make your celebrations truly unforgettable.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-pink-700 transition duration-300 shadow-md"
              onClick={() => navigate('/about')}
            >
              Discover Our Journey
            </motion.button>
          </motion.div>
        </div>
      </section>

      <MenuPreview cakes={cakes} />

      <LocationSection />

      <div className="mt-24">
        <CTA />
      </div>
    </div>
  );
};

export default HomePage;

