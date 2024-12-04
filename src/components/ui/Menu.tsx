import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../product-ui/productCard';
import { useCart } from '../../context/cartContext';

interface Cake {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface MenuPreviewProps {
  cakes: Cake[];
}

const MenuPreview: React.FC<MenuPreviewProps> = ({ cakes }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = (cake: Cake) => {
    addToCart({
      id: cake.id,
      name: cake.name,
      price: cake.price,
      image: cake.image,
      quantity: 1
    });
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">Our Signature Creations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cakes.map((cake) => (
            <motion.div 
              key={cake.id} 
              className="flex justify-center"
              whileHover={{ y: -5 }}
            >
              <ProductCard 
                product={{
                  id: cake.id,
                  name: cake.name,
                  price: cake.price,
                  image: cake.image,
                }}
                variant="display"
                quantity={1}
                onQuantityChange={() => {}}
                onAddToCart={() => handleAddToCart(cake)}
                disableNavigation={false}
              />
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-16">
          <motion.button
            onClick={() => navigate('/categories')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-pink-600 text-white px-10 py-5 rounded-full text-xl font-semibold hover:bg-pink-700 transition duration-300 shadow-lg"
          >
            Explore Full Menu
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default MenuPreview;

