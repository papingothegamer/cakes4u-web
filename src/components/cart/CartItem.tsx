import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus } from 'lucide-react';
import { CartItem as CartItemType } from '../../types';

interface CartItemProps {
  item: CartItemType; 
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center space-x-4 border-b py-4"
    >
      <Link to={`/product/${item.cake.id}`} className="flex-shrink-0">
        <img
          src={item.cake.image}
          alt={item.cake.name}
          className="w-24 h-24 object-cover rounded"
        />
      </Link>
      <div className="flex-1">
        <Link to={`/product/${item.cake.id}`}>
          <h3 className="text-lg font-semibold hover:text-pink-500">{item.cake.name}</h3>
        </Link>
        <p className="text-gray-500">${item.cake.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onUpdateQuantity(item.cake.id, Math.max(0, item.quantity - 1))}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-8 text-center">{item.quantity}</span>
        <button
          onClick={() => onUpdateQuantity(item.cake.id, item.quantity + 1)}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <button
        onClick={() => onRemove(item.cake.id)}
        className="p-2 text-red-500 hover:bg-red-50 rounded-full"
      >
        <Trash2 className="h-5 w-5" />
      </button>
    </motion.div>
  );
};