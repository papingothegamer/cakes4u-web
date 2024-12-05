import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/cartContext';
import ShoppingBagIcon from './ShoppingBag';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const { cartItems } = useCart();

  const menuItems = [
    { name: 'Categories', href: '/categories' },
    { name: 'Recipes', href: '/recipes' },
    { name: 'About Us', href: '/about' },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';  // Disable scrolling
    } else {
      document.body.style.overflow = 'auto';  // Enable scrolling
    }
  }, [isMenuOpen]);

  return (
    <div>
      <nav className="fixed w-full z-40 bg-white shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 items-center h-16">
            {/* Left: Navigation Links */}
            <div className={`flex items-center space-x-4 ${isMobile ? 'hidden' : ''}`}>
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="font-medium text-gray-700 py-1 hover:text-pink-600"
                  onClick={handleLinkClick}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Center: Logo */}
            <div className="text-center">
              <Link to="/" className="block">
                <h1 className="text-2xl font-bold text-gray-700">Cakes4U</h1>
              </Link>
            </div>

            {/* Right: Icons */}
            <div className={`flex items-center justify-end space-x-3 col-start-3 ${isMenuOpen ? 'pointer-events-none' : ''}`}>
              {/* Shopping Bag */}
              <ShoppingBagIcon className="text-gray-700" />

              {/* Mobile Menu Toggle - Only show when the menu is closed */}
              {isMobile && !isMenuOpen && (
                <button
                  onClick={() => setIsMenuOpen(true)}
                  className="p-2 rounded-md hover:bg-pink-50 transition-colors"
                >
                  <Menu className="h-6 w-6 text-gray-700" />
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu (Integrated Dropdown into Navbar) */}
      {isMenuOpen && isMobile && (
        <>
          {/* Overlay for the mobile menu */}
          <div
            className="fixed inset-0 bg-black opacity-50 z-30"
            onClick={() => setIsMenuOpen(false)} // Close on overlay click
          ></div>

          {/* Dropdown Menu - Positioned below Navbar */}
          <div className="absolute top-16 left-0 w-full bg-white shadow-lg py-4 z-40">
            <div className="flex flex-col items-center space-y-4">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="font-medium text-gray-700 py-1 hover:text-pink-600"
                  onClick={handleLinkClick}
                >
                  {item.name}
                </Link>
              ))}
              {/* X Button inside the dropdown */}
              <button
                className="text-gray-700 p-2"
                onClick={() => setIsMenuOpen(false)} // Close menu when clicking the "X" button
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
