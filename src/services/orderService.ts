import { loadStripe } from '@stripe/stripe-js'; // Import loadStripe to initialize Stripe
import { supabase } from '../lib/supabase'; // Adjust the import path
import { CartItem } from '../types';
import emailjs from '@emailjs/browser'; // Import emailjs for email sending

// Initialize Stripe with your public key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY as string); // Use VITE_ prefix for frontend environment variables

// Function to send emails to both the business and the customer
export const sendOrderEmails = async (orderData: any, orderId: string) => {
  try {
    // Send email to business (store)
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_CUSTOMER_ORDER_TEMPLATE_ID,
      {
        order_id: orderId,
        customer_name: orderData.customerName,
        customer_email: orderData.userEmail,
        occasion: orderData.occasion,
        flavor: orderData.flavor,
        size: orderData.size,
        required_date: orderData.requiredDate,
        details: orderData.details,
      }
    );
    console.log('Email sent to business.');

    // Send email to customer (order confirmation)
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_CUSTOMER_ORDER_TEMPLATE_ID,
      {
        order_id: orderId,
        customer_name: orderData.customerName,
        order_status: 'Pending', // Initial status
        occasion: orderData.occasion,
        flavor: orderData.flavor,
        size: orderData.size,
        required_date: orderData.requiredDate,
      }
    );
    console.log('Confirmation email sent to customer.');
  } catch (error) {
    console.error('Error sending emails:', error); // Catch any errors and log them
  }
};

// Creating a Stripe checkout session for regular cake orders
export const orderService = {
  // Create a Stripe checkout session for regular cake orders
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
      // Fetching orders from the orders table (regular cake orders)
      const { data: regularOrders, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (ordersError) throw ordersError;

      // Fetching custom orders from the custom_orders table (custom cake orders)
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

  // Create a custom order in Supabase and send email notifications
  async createCustomOrder(customOrder: any) {
    const { data, error } = await supabase
      .from('custom_orders')
      .insert([customOrder])
      .select()
      .single();

    if (error) throw error;

    const orderId = data.id; // Get the ID of the newly created custom order

    // Send email notifications to the business and the customer
    await sendOrderEmails(customOrder, orderId);

    return data;
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
