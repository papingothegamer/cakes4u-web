import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import Features from '../components/ui/Features';
import { MapPin, Phone, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import productsData from '../data/products.json';
import ProductCard from '../components/product-ui/productCard';
import CTA from '../components/ui/CTA'
import Button from '../components/ui/Button';

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

  const handleViewDetails = () => {
    navigate('/categories');
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
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-4"
            >
              Welcome to Cakes4U
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl mb-8"
            >
              Delicious cakes and confectionery for every occasion
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-pink-700 transition duration-300"
              onClick={() => console.log('Order Now clicked!')}
            >
              Order Now
            </motion.button>
          </div>
        </div>
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
        >
          <ChevronLeft className="w-6 h-6 text-black" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
        >
          <ChevronRight className="w-6 h-6 text-black" />
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
            <h2 className="text-4xl font-bold text-gray-800 mb-6">About Cakes4U</h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              At Cakes4U, we believe that every occasion deserves a touch of sweetness. Our passion for baking and dedication to quality ingredients shine through in every cake, cupcake, and confection we create. From classic flavors to innovative designs, we're here to make your celebrations unforgettable.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-pink-700 transition duration-300"
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Menu Preview Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">Our Delicious Cakes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {cakes.map((cake) => (
              <Link key={cake.id} to={`/product/${cake.id}`}>
                <ProductCard 
                  product={cake} 
                  quantity={1} // Default quantity
                  onQuantityChange={() => {}} // Placeholder for quantity change logic
                  onAddToCart={() => console.log(`Added ${cake.name} to cart`)} // Updated to match the new signature
                  variant="display" // Added variant prop
                />
              </Link>
            ))}
          </div>
          <div className="text-center mt-16">
            <motion.button
              onClick={handleViewDetails}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-pink-600 text-white px-10 py-5 rounded-full text-xl font-semibold hover:bg-pink-700 transition duration-300"
            >
              View Full Menu
            </motion.button>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-24 bg-pink-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">Find Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-4">
                <MapPin className="w-8 h-8 text-pink-600" />
                <p className="text-xl text-gray-700">123 Sweet Street, Caketown, CT 12345</p>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="w-8 h-8 text-pink-600" />
                <p className="text-xl text-gray-700">(555) 123-4567</p>
              </div>
              <div className="flex items-center space-x-4">
                <Clock className="w-8 h-8 text-pink-600" />
                <div>
                  <p className="text-xl text-gray-700">Mon-Fri: 9am - 7pm</p>
                  <p className="text-xl text-gray-700">Sat-Sun: 10am - 5pm</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-full h-96 bg-gray-200 rounded-lg shadow-md overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-gray-500 text-2xl font-semibold">
                  Interactive Map Coming Soon
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="mb-24">
        <CTA />
      </div>
    </div>
  );
};

export default HomePage;

