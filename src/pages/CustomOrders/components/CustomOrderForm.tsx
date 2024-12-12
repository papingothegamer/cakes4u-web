import React from 'react';
import { motion } from 'framer-motion';

export const CustomOrderForm = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-lg shadow-md"
    >
      <form className="space-y-6">
        <div>
          <label htmlFor="occasion" className="block text-sm font-medium text-gray-700">
            Occasion
          </label>
          <select
            id="occasion"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
          >
            <option>Birthday</option>
            <option>Wedding</option>
            <option>Anniversary</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="size" className="block text-sm font-medium text-gray-700">
            Cake Size
          </label>
          <select
            id="size"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
          >
            <option>6" (serves 8-10)</option>
            <option>8" (serves 12-15)</option>
            <option>10" (serves 20-25)</option>
            <option>Custom size</option>
          </select>
        </div>

        <div>
          <label htmlFor="flavor" className="block text-sm font-medium text-gray-700">
            Preferred Flavor
          </label>
          <select
            id="flavor"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
          >
            <option>Vanilla</option>
            <option>Chocolate</option>
            <option>Red Velvet</option>
            <option>Custom flavor</option>
          </select>
        </div>

        <div>
          <label htmlFor="details" className="block text-sm font-medium text-gray-700">
            Special Requirements
          </label>
          <textarea
            id="details"
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
            placeholder="Tell us about your dream cake..."
          />
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Required Date
          </label>
          <input
            type="date"
            id="date"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-3 rounded-full hover:bg-pink-600 transition-colors"
        >
          Submit Custom Order Request
        </button>
      </form>
    </motion.div>
  );
};