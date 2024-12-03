import React from 'react';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="mb-8 md:mb-0">
            <a href="/" className="flex items-center mb-4">
              <h1 className="text-2xl md:text-3xl font-bold logo-wordmark">
                Cakes4U
              </h1>
            </a>
            <p className="text-gray-400 text-sm">
              Delicious cakes and confectionery for every occasion. Making your celebrations sweeter since 2009.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-pink-400 transition-colors">Home</Link></li>
              <li><Link to="/categories" className="text-gray-400 hover:text-pink-400 transition-colors">Categories</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-pink-400 transition-colors">About Us</Link></li>
              <li><Link to="/recipes" className="text-gray-400 hover:text-pink-400 transition-colors">Recipes</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-400 mb-2">123 Sweet Street, Caketown, CT 12345</p>
            <p className="text-gray-400 mb-2">Phone: (555) 123-4567</p>
            <p className="text-gray-400">Email: info@cakes4u.com</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-400 transition-colors">
                <Facebook size={24} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-400 transition-colors">
                <Instagram size={24} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-400 transition-colors">
                <Twitter size={24} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="mailto:info@cakes4u.com" className="text-gray-400 hover:text-pink-400 transition-colors">
                <Mail size={24} />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Cakes4U. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

