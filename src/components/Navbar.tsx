import { useState } from 'react'; // Remove React import, use specific imports
import { Link } from 'react-router-dom';
import { ShoppingCart, Cake, Menu, X } from 'lucide-react';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { UserMenu } from '../components/UserMenu';

export const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const cart = useStore((state) => state.cart);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const menuItems = [
    { label: 'Menu', path: '/menu' },
    { label: 'Custom Orders', path: '/custom-orders' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full bg-white shadow-md z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Cake className="h-8 w-8 text-pink-500" />
              <span className="text-2xl font-bold text-gray-900">Cakes4U</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path} 
                className="text-gray-700 hover:text-pink-500"
              >
                {item.label}
              </Link>
            ))}

            {/* Conditional Rendering: Logged In vs. Logged Out */}
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <Link
                to="/login"
                className="text-gray-700 hover:text-pink-500 font-semibold"
              >
                Login
              </Link>
            )}

            {/* Cart Icon */}
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-pink-500" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Cart Icon for Mobile */}
            <Link to="/cart" className="relative mr-4">
              <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-pink-500" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* Hamburger Menu */}
            <button 
              onClick={toggleMobileMenu}
              className="text-gray-700 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="text-gray-700 hover:text-pink-500 block px-3 py-2 rounded-md"
                    onClick={toggleMobileMenu}
                  >
                    {item.label}
                  </Link>
                ))}

                {isAuthenticated ? (
                  <UserMenu isMobile={true} onClose={toggleMobileMenu} />
                ) : (
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-pink-500 block px-3 py-2 rounded-md font-semibold"
                    onClick={toggleMobileMenu}
                  >
                    Login
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};