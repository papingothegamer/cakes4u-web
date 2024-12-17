import { loadStripe } from '@stripe/stripe-js'; // Import loadStripe to initialize Stripe
import { supabase } from '../lib/supabase'; // Adjust the import path
import { CartItem } from '../types';

// Initialize Stripe with your public key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY as string); // Use VITE_ prefix for frontend environment variables

export const orderService = {
  // Creating a Stripe checkout session for regular cake orders
  async createCheckoutSession(items: CartItem[]) {
    // Only handle Stripe checkout for regular cake orders, not custom orders
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items }), // Send items data for checkout
    });

    const { sessionId } = await response.json();

    // Get the Stripe instance and redirect to checkout
    const stripe = await stripePromise;
    if (!stripe) {
      throw new Error('Stripe.js failed to load');
    }

    return stripe.redirectToCheckout({ sessionId });
  },

  // Fetching both regular orders and custom orders for a logged-in user
  async getOrders(userId: string) {
    try {
      // Fetching orders from the orders table
      const { data: regularOrders, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (ordersError) throw ordersError;

      // Fetching custom orders from the custom_orders table
      const { data: customOrders, error: customOrdersError } = await supabase
        .from('custom_orders')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (customOrdersError) throw customOrdersError;

      // Combine the regular and custom orders
      const combinedOrders = [...regularOrders, ...customOrders];

      return combinedOrders; // Return combined data

    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },

  // Function to delete an order from Supabase
  async deleteOrder(orderId: string) {
    const { data, error } = await supabase
      .from('custom_orders')
      .delete()
      .match({ id: orderId });

    if (error) throw error;
    return data;
  },
};
