import React from 'react';
import { useStore } from '../../store/useStore';
import { CartItem } from '../../components/cart/CartItem';
import { CartSummary } from '../../components/cart/CartSummary';

export const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useStore();

  const handleCheckout = async () => {
    // Implement Stripe checkout here
    console.log('Proceeding to checkout...');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-xl">Your cart is empty</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {cart.map((item) => (
              <CartItem
                key={item.cake.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
              />
            ))}
          </div>
          <div className="lg:col-span-1">
            <CartSummary items={cart} onCheckout={handleCheckout} />
          </div>
        </div>
      )}
    </div>
  );
};