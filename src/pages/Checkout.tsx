import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, CreditCard, ChevronRight } from 'lucide-react';
import ProductCard from '../components/product-ui/productCard';
import { useCart } from '../context/cartContext';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';

const Checkout: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax = subtotal * 0.1; // Assuming 10% tax
  const shipping = subtotal > 50 ? 0 : 5.99; // Free shipping over $50
  const total = subtotal + tax + shipping;

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm">
        <ol className="list-none p-0 inline-flex">
          <li className="flex items-center">
            <Link to="/" className="text-gray-600 hover:text-pink-600">Home</Link>
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
          </li>
          <li className="flex items-center">
            <Link to="/categories" className="text-gray-600 hover:text-pink-600">Categories</Link>
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
          </li>
          <li className="text-pink-600">Checkout</li>
        </ol>
      </nav>
  
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">
          <div className="p-4 sm:p-6 bg-gray-50 border-b border-gray-200">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 flex items-center">
              <ShoppingBag className="mr-3 text-pink-600" size={28} /> Checkout
            </h1>
          </div>

          <div className="p-4 sm:p-6 overflow-x-auto">
            {cartItems.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center py-12" 
              >
                <p className="text-lg sm:text-xl text-gray-600 mb-6">Your cart feels lonely. Let's go cake shopping!</p>
                <Link to="/categories">
                  <Button className="bg-pink-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full hover:bg-pink-700 transition-all duration-300 shadow-md hover:shadow-lg text-sm sm:text-base">
                    Start Shopping
                  </Button>
                </Link>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="lg:col-span-2 space-y-4"
                >
                  <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                    <h2 className="text-lg sm:text-xl font-bold mb-4 text-gray-800 flex items-center">
                      Your Items
                    </h2>
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mb-4 last:mb-0 border-b pb-4 last:border-b-0"
                      >
                        <ProductCard
                          variant="checkout"
                          product={{ id: item.id, name: item.name, price: item.price, image: item.image }}
                          quantity={item.quantity}
                          onQuantityChange={(newQuantity) => updateQuantity(item.id, newQuantity)}
                          onRemoveFromCart={() => removeFromCart(item.id)}
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="lg:col-span-1"
                >
                  <div className="bg-gray-50 rounded-xl p-4 sm:p-6 lg:sticky lg:top-24">
                    <h2 className="text-lg sm:text-xl font-bold mb-4 text-gray-800 flex items-center">
                      <CreditCard className="mr-2 text-pink-600" size={24} />
                      Order Summary
                    </h2>
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-gray-700">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-gray-700">
                        <span>Tax (10%)</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-gray-700">
                        <span>Shipping</span>
                        <span>
                          {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                          {shipping === 0 && <span className="ml-2 text-green-600 text-xs">(Free over $50)</span>}
                        </span>
                      </div>
                      <div className="border-t border-gray-200 pt-3 mt-3">
                        <div className="flex justify-between font-bold text-gray-900 text-lg">
                          <span>Total</span>
                          <span>${total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={() => console.log('Proceed to Payment clicked!')}
                      className="bg-pink-600 text-white w-full py-3 rounded-full hover:bg-pink-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg text-sm sm:text-base"
                    >
                      <CreditCard size={20} />
                      <span>Proceed to Payment</span>
                    </Button>
                    {subtotal < 50 && (
                      <div className="text-xs text-gray-500 text-center mt-2">
                        Spend ${(50 - subtotal).toFixed(2)} more for free shipping!
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

