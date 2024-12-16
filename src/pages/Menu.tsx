import  { useState, useEffect } from 'react';

import { CakeCard } from '../components/CakeCard';
import { cakeService } from '../services/cakeService';
import { Cake } from '../types';
import { toast } from 'react-hot-toast';
import { Loader } from 'lucide-react';

export const Menu = () => {
  const [cakes, setCakes] = useState<Cake[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');

  useEffect(() => {
    const fetchCakes = async () => {
      try {
        const data = category === 'all'
          ? await cakeService.getAllCakes()
          : await cakeService.getCakesByCategory(category);
        setCakes(data);
      } catch (error) {
        toast.error('Failed to load cakes');
        console.error('Error fetching cakes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCakes();
  }, [category]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-8 h-8 animate-spin text-pink-500" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Our Cakes</h1>
      
      <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
        {['all', 'chocolate', 'vanilla', 'fruit', 'specialty'].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              category === cat
                ? 'bg-pink-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {cakes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-xl">No cakes found in this category</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cakes.map((cake) => (
            <CakeCard key={cake.id} cake={cake} />
          ))}
        </div>
      )}
    </div>
  );
}