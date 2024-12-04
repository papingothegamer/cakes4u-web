import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/cartContext';
import ShoppingBagIcon from './ShoppingBag';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isSpecialPage =
    ['/product', '/recipes', '/about', '/checkout'].includes(location.pathname) ||
    location.pathname.startsWith('/product/');

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`fixed w-full z-[9998] transition-colors duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-14">
          {/* Logo Section */}
          <div className="flex-none w-32 md:w-44">
            <Link
              to="/"
              className={`text-xl md:text-2xl font-bold logo-wordmark ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Cakes4U
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`font-medium relative group py-1 ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                }`}
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-pink-600 transform scale-x-0 transition-transform group-hover:scale-x-100" />
              </Link>
            ))}
          </div>

          {/* Mobile and Shopping Bag Section */}
          <div className="flex items-center space-x-2">
            <ShoppingBagIcon
              className={isScrolled ? 'text-gray-700' : 'text-white'}
            />

            {/* Mobile Menu Toggle */}
            {isMobile && (
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md hover:bg-pink-50 transition-colors"
              >
                {isMenuOpen ? (
                  <X className={`h-6 w-6 ${isScrolled ? 'text-gray-700' : 'text-white'}`} />
                ) : (
                  <Menu className={`h-6 w-6 ${isScrolled ? 'text-gray-700' : 'text-white'}`} />
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white/90 backdrop-blur-md z-[9999]">
          <div className="px-6 pt-8 pb-4 space-y-6">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-end mb-4"
            >
              <X className="h-6 w-6 text-gray-700" />
            </button>
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block px-4 py-3 rounded-md text-base font-medium text-gray-700 bg-gray-100 hover:text-pink-600 hover:bg-pink-50 transition-colors"
                onClick={handleLinkClick}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
