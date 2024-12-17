import React, { useState } from 'react';
import { supabase } from '../../../services/supabaseClient';
import { placeCustomOrder } from '../../../services/customOrderService';

const CustomOrderForm = () => {
  const [customerName, setCustomerName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [occasion, setOccasion] = useState('');
  const [size, setSize] = useState('');
  const [flavor, setFlavor] = useState('');
  const [details, setDetails] = useState('');
  const [requiredDate, setRequiredDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Fetch the logged-in user's ID
      const { data: userData, error: authError } = await supabase.auth.getUser();
      if (authError || !userData?.user) {
        throw new Error('User not authenticated.');
      }

      const userId = userData.user.id; // User ID retrieved from Supabase auth

      // Prepare order data
      const orderData = {
        customerName,
        userEmail,
        occasion,
        size,
        flavor,
        details,
        required_date: requiredDate,
      };

      // Submit custom order
      const response = await placeCustomOrder(orderData, userId);

      if (!response.success) {
        setError(response.message || 'Failed to place the order.');
      } else {
        alert('Order placed successfully!');
        // Reset form
        setCustomerName('');
        setUserEmail('');
        setOccasion('');
        setSize('');
        setFlavor('');
        setDetails('');
        setRequiredDate('');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Customize Your Order</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name:</label>
            <input
              id="name"
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
            <input
              id="email"
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <label htmlFor="occasion" className="block text-sm font-medium text-gray-700 mb-1">Occasion:</label>
            <input
              id="occasion"
              type="text"
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">Size:</label>
            <input
              id="size"
              type="text"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <label htmlFor="flavor" className="block text-sm font-medium text-gray-700 mb-1">Flavor:</label>
            <input
              id="flavor"
              type="text"
              value={flavor}
              onChange={(e) => setFlavor(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <label htmlFor="requiredDate" className="block text-sm font-medium text-gray-700 mb-1">Required Date:</label>
            <input
              id="requiredDate"
              type="date"
              value={requiredDate}
              onChange={(e) => setRequiredDate(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </div>
        <div>
          <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-1">Details:</label>
          <textarea
            id="details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            required
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-pink-600 text-white font-semibold rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {loading ? 'Submitting...' : 'Submit Order'}
          </button>
        </div>
      </form>
      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
};

export default CustomOrderForm;