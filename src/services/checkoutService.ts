import { CartItem } from '../types';
import { supabase } from '../lib/supabase';

export const checkoutService = {
  async createCheckoutSession(items: CartItem[]) {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User must be logged in to checkout');
    }

    const lineItems = items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.cake.name,
          description: item.cake.description,
          images: [item.cake.image],
        },
        unit_amount: Math.round(item.cake.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

    try {
      // Make API call to your backend endpoint that creates the Stripe session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: lineItems,
          customer_email: user.email,
          metadata: {
            userId: user.id,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const session = await response.json();
      return session;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw error;
    }
  },
};