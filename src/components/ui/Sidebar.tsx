import React, { useEffect, forwardRef } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../product-ui/productCard';
import Button from './Button';

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
  cartItems: any[];
  subtotal: number;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  handleCheckoutClick: () => void;
}

const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(({
  isOpen,
  closeSidebar,
  cartItems,
  subtotal,
  updateQuantity,
  removeFromCart,
  handleCheckoutClick,
}, ref) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 0.5 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.3 }}
  className="fixed inset-0 bg-black z-[9998]"
  onClick={closeSidebar}
  style={{
    right: '20%', // Sidebar width as percentage or px value (adjust accordingly)
    width: '80%', // Covering the rest of the screen
  }}
></motion.div>

          {/* Sidebar */}
          <motion.div
            ref={ref}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 h-screen w-3/4 sm:w-96 bg-white shadow-xl z-[9999]"
          >
            <div className="p-4 h-full flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Your Cart</h3>
                <button onClick={closeSidebar} className="text-gray-500 hover:text-gray-700">
                  <X size={24} />
                </button>
              </div>

              {cartItems.length === 0 ? (
                <p className="text-center text-gray-500 my-8">Your cart is empty.</p>
              ) : (
                <div className="flex-grow overflow-y-auto mb-4 space-y-4">
                  {cartItems.map((item) => (
                    <ProductCard
                      key={item.id}
                      product={item}
                      variant="checkout"
                      quantity={item.quantity}
                      onQuantityChange={(newQuantity) => updateQuantity(item.id, newQuantity)}
                      onRemoveFromCart={() => removeFromCart(item.id)}
                    />
                  ))}
                </div>
              )}

              <div className="mt-auto space-y-3">
                {cartItems.length > 0 && (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-600">Subtotal:</span>
                      <span className="font-bold text-lg text-gray-800">${subtotal.toFixed(2)}</span>
                    </div>
                    <Button
                      className="w-full py-3 text-lg font-semibold rounded-md bg-pink-600 text-white hover:bg-pink-700 transition-all"
                      onClick={handleCheckoutClick}
                    >
                      Proceed to Checkout
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;
