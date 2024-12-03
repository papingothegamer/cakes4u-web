import React from 'react';
import { motion } from 'framer-motion';
import { Cake, ShoppingBag, Book } from 'lucide-react';
import FeatureCard from './FeatureCard';

const Features: React.FC = () => {
  const features = [
    {
      Icon: Cake,
      title: 'Delicious Cakes',
      description: 'Handcrafted cakes for every taste and occasion',
    },
    {
      Icon: ShoppingBag,
      title: 'Easy Ordering',
      description: 'Simple online ordering and fast delivery',
    },
    {
      Icon: Book,
      title: 'Recipes',
      description: 'Explore our collection of delightful recipes',
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.8 }}
      className="mt-16 mx-[5%] grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
    >
      <div className="col-span-1 md:col-span-3 text-center mb-8">
        <h2 className="text-3xl font-bold">Our Features</h2>
        <p className="text-lg text-gray-600 mt-2">
          Discover the unique features that make our cakes and services stand out.
        </p>
      </div>

      {features.map((feature, index) => (
        <FeatureCard key={index} {...feature}/>
      ))}
    </motion.section>
  );
};

export default Features;

