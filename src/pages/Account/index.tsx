import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Settings, ShoppingBag, Heart } from 'lucide-react';
import { ProfileSettings } from './components/ProfileSettings';
import { OrderHistory } from './components/OrderHistory';
import { SavedProducts } from './components/SavedProducts';

type ActiveSection = 'profile' | 'orders' | 'favorites' | null;

export const Account = () => {
  const [activeSection, setActiveSection] = useState<ActiveSection>(null);

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileSettings />;
      case 'orders':
        return <OrderHistory />;
      case 'favorites':
        return <SavedProducts />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">My Account</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`bg-white p-6 rounded-lg shadow-md cursor-pointer ${
            activeSection === 'profile' ? 'ring-2 ring-pink-500' : ''
          }`}
          onClick={() => setActiveSection('profile')}
        >
          <div className="flex items-center space-x-4 mb-4">
            <User className="h-6 w-6 text-pink-500" />
            <h2 className="text-xl font-semibold">Profile</h2>
          </div>
          <p className="text-gray-600 mb-4">Manage your personal information and preferences</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`bg-white p-6 rounded-lg shadow-md cursor-pointer ${
            activeSection === 'orders' ? 'ring-2 ring-pink-500' : ''
          }`}
          onClick={() => setActiveSection('orders')}
        >
          <div className="flex items-center space-x-4 mb-4">
            <ShoppingBag className="h-6 w-6 text-pink-500" />
            <h2 className="text-xl font-semibold">Orders</h2>
          </div>
          <p className="text-gray-600 mb-4">View your order history and track current orders</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`bg-white p-6 rounded-lg shadow-md cursor-pointer ${
            activeSection === 'favorites' ? 'ring-2 ring-pink-500' : ''
          }`}
          onClick={() => setActiveSection('favorites')}
        >
          <div className="flex items-center space-x-4 mb-4">
            <Heart className="h-6 w-6 text-pink-500" />
            <h2 className="text-xl font-semibold">Favorites</h2>
          </div>
          <p className="text-gray-600 mb-4">Access your favorite cakes and saved designs</p>
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        {activeSection && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-8 bg-white p-6 rounded-lg shadow-md"
          >
            {renderSection()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};