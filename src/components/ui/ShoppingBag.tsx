import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/cartContext';
import Sidebar from './Sidebar';

const ShoppingBagIcon: React.FC<{ className?: string }> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleBagClick = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseSidebar = () => {
    setIsOpen(false);
  };

  const handleCheckoutClick = () => {
    setIsOpen(false);
    navigate('/checkout');
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="relative">
      <button
        onClick={handleBagClick}
        className="p-2 hover:bg-pink-50 rounded-full transition-colors relative"
        aria-label="Shopping Bag"
      >
        <ShoppingBag className={`w-5 h-5 ${className}`} />
        {totalItems > 0 && (
          <span className="absolute top-0 right-0 h-4 w-4 bg-pink-600 rounded-full text-xs text-white flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>
      <Sidebar 
        ref={sidebarRef}
        isOpen={isOpen}
        closeSidebar={handleCloseSidebar}
        cartItems={cartItems}
        subtotal={subtotal}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        handleCheckoutClick={handleCheckoutClick}
      />
    </div>
  );
};

export default ShoppingBagIcon;

