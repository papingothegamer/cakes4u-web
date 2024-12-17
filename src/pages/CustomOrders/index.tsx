import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Cake as CakeIcon, MessageSquare } from 'lucide-react';
import CustomOrderForm from './components/CustomOrderForm';

export const CustomOrders: React.FC = () => {
  const pageVariants = {
    initial: { opacity: 0, x: -20 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: 20 }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5
  };

  return (
    <motion.div 
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="max-w-7xl mx-auto px-4 py-12"
    >
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Custom Orders</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CustomOrderForm />
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">How It Works</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Calendar className="h-5 w-5 text-pink-500 mt-1" />
                <div>
                  <h3 className="font-medium">Choose Your Date</h3>
                  <p className="text-sm text-gray-600">Select your preferred delivery date</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CakeIcon className="h-5 w-5 text-pink-500 mt-1" />
                <div>
                  <h3 className="font-medium">Design Your Cake</h3>
                  <p className="text-sm text-gray-600">Customize flavors, size, and decorations</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MessageSquare className="h-5 w-5 text-pink-500 mt-1" />
                <div>
                  <h3 className="font-medium">Consultation</h3>
                  <p className="text-sm text-gray-600">Our team will contact you to confirm details</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-pink-500 mt-1" />
                <div>
                  <h3 className="font-medium">Production Time</h3>
                  <p className="text-sm text-gray-600">Allow 3-5 days for custom orders</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};