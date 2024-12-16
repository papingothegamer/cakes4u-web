import React, { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { toast } from 'react-hot-toast';

export const ProfileSettings = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.user_metadata?.full_name || '');
  const [phone, setPhone] = useState(user?.user_metadata?.phone || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implement profile update logic here
    toast.success('Profile updated successfully');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Profile Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={user?.email || ''}
            disabled
            className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition-colors"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};