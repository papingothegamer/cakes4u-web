import React from 'react';
import { CartItem } from '../../types';

interface CartSummaryProps {
  items: CartItem[];
  onCheckout: () => void;
}

export const CartSummary: React.FC<CartSummaryProps> = ({ items, onCheckout }) => {
  const subtotal = items.reduce((sum, item) => sum + item.cake.price * item.quantity, 0);
  const deliveryFee = 5.00;
  const total = subtotal + deliveryFee;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery</span>
          <span>${deliveryFee.toFixed(2)}</span>
        </div>
        <div className="border-t pt-2 font-semibold">
          <div className="flex justify-between">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <button
        onClick={onCheckout}
        className="w-full bg-pink-500 text-white py-3 rounded-full hover:bg-pink-600 transition-colors"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};