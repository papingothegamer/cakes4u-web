import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CakeCard } from '../components/CakeCard';

const SAMPLE_CAKES = [
  {
    id: '1',
    name: 'Classic Chocolate',
    description: 'Rich chocolate layers with ganache',
    price: 35.99,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80',
    category: 'chocolate',
    ingredients: ['chocolate', 'cream', 'butter'],
    available: true,
  },
  {
    id: '2',
    name: 'Vanilla Dream',
    description: 'Light and fluffy vanilla cake',
    price: 32.99,
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&q=80',
    category: 'vanilla',
    ingredients: ['vanilla', 'cream', 'butter'],
    available: true,
  },
  // Add more sample cakes here
];

export const Menu = () => {
  const [category, setCategory] = useState('all');

  const filteredCakes = category === 'all'
    ? SAMPLE_CAKES
    : SAMPLE_CAKES.filter(cake => cake.category === category);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Our Cakes</h1>
      
      <div className="flex space-x-4 mb-8">
        {['all', 'chocolate', 'vanilla', 'fruit'].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full ${
              category === cat
                ? 'bg-pink-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCakes.map((cake) => (
          <CakeCard key={cake.id} cake={cake} />
        ))}
      </div>
    </div>
  );
};