import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, ChevronLeft, Minus, Plus, Loader } from 'lucide-react';
import { cakeService } from '../../services/cakeService';
import { useStore } from '../../store/useStore';
import { toast } from 'react-hot-toast';
import { Cake } from '../../types';

export const Product = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [cake, setCake] = useState<Cake | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const addToCart = useStore((state) => state.addToCart);

  useEffect(() => {
    const fetchCake = async () => {
      try {
        if (!id) return;
        const data = await cakeService.getCakeById(id);
        if (!data) {
          toast.error('Product not found');
          navigate('/menu');
          return;
        }
        setCake(data);
      } catch (error) {
        toast.error('Failed to load product');
        console.error('Error fetching cake:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCake();
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (cake) {
      addToCart({ cake, quantity });
      toast.success('Added to cart');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-8 h-8 animate-spin text-pink-500" />
      </div>
    );
  }

  if (!cake) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
      >
        <ChevronLeft className="h-5 w-5" />
        <span>Back</span>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <img
            src={cake.image}
            alt={cake.name}
            className="w-full h-[400px] object-cover rounded-lg"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <h1 className="text-4xl font-bold text-gray-900">{cake.name}</h1>
          <p className="text-xl font-bold text-pink-500">${cake.price.toFixed(2)}</p>
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Description</h2>
            <p className="text-gray-600">{cake.description}</p>
          </div>

          {cake.ingredients && cake.ingredients.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Ingredients</h2>
              <ul className="list-disc list-inside text-gray-600">
                {cake.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <Minus className="h-5 w-5" />
              </button>
              <span className="text-xl font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-pink-500 text-white py-3 rounded-full hover:bg-pink-600 transition-colors flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Add to Cart</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};