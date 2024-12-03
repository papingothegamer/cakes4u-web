import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/cartContext';
import ShoppingBagIcon from './ShoppingBag';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const { cartItems } = useCart();

  const menuItems = [
    { name: 'Categories', href: '/categories' },
    { name: 'Recipes', href: '/recipes' },
    { name: 'About Us', href: '/about' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isSpecialPage = ['/categories', '/product', '/recipes', '/about', '/checkout'].includes(location.pathname) || location.pathname.startsWith('/product/');

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    } rounded-b-lg`} style={{ width: isScrolled ? '80%' : '60%', left: isScrolled ? '10%' : '20%' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-none w-36 md:w-48">
            <Link to="/" className={`text-2xl md:text-3xl font-bold logo-wordmark ${isScrolled || isSpecialPage ? 'text-gray-700' : 'text-white'}`}>
              Cakes4U
            </Link>
          </div>

          <div className="hidden absolute left-1/2 transform -translate-x-1/2 md:flex items-center">
            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`font-medium relative group py-2 ${isSpecialPage ? 'text-gray-700' : (isScrolled ? 'text-gray-700' : 'text-white')}`}
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-pink-600 transform scale-x-0 transition-transform group-hover:scale-x-100" />
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
          <ShoppingBagIcon className={isScrolled || isSpecialPage ? 'text-gray-700' : 'text-white'} cartItems={cartItems} />
            
            {isMobile && (
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="ml-2 p-2 rounded-md hover:bg-pink-50 transition-colors md:hidden"
              >
                {isOpen ? (
                  <X className={`h-6 w-6 ${isScrolled || isSpecialPage ? 'text-gray-700' : 'text-white'}`} />
                ) : (
                  <Menu className={`h-6 w-6 ${isScrolled || isSpecialPage ? 'text-gray-700' : 'text-white'}`} />
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {isMobile && (
        <div
          className={`transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden`}
        >
          <div className="px-4 pt-2 pb-4 space-y-1 bg-white/95 backdrop-blur-md rounded-b-lg">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-pink-600 hover:bg-pink-50 transition-colors"
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