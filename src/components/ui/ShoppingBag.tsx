import React, { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

// Define a type for the cart items
interface CartItem {
  name: string;
  price: number;
}

const ShoppingBagIcon: React.FC<{ className?: string; cartItems: CartItem[] }> = ({ className, cartItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleBagClick = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckoutClick = () => {
    setIsOpen(false); // Close the popup when navigating to checkout
    navigate('/checkout');
  };

  return (
    <div className="relative">
      <button onClick={handleBagClick} className="p-2 hover:bg-pink-50 rounded-full transition-colors relative">
        <ShoppingBag className={`w-5 h-5 ${className}`} />
        <span className="absolute top-0 right-0 h-4 w-4 bg-pink-600 rounded-full text-xs text-white flex items-center justify-center">
          {cartItems.length}
        </span>
      </button>
      {isOpen && (
        <div className="absolute z-10 bg-white shadow-lg rounded-md p-4 mt-2 w-48 left-1/2 transform -translate-x-1/2">
          <h3 className="font-bold mb-2">Shopping Cart</h3>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <p>{cartItems.length} item(s) in your cart.</p>
          )}
          <Button className="mt-2 bg-pink-600 text-white w-full" onClick={handleCheckoutClick}>
            Checkout
          </Button>
        </div>
      )}
    </div>
  );
};

export default ShoppingBagIcon;