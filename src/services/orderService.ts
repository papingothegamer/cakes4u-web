import { supabase } from '../lib/supabase';
import { stripe } from '../lib/stripe';
import { CartItem } from '../types';

export const orderService = {
  async createCheckoutSession(items: CartItem[]) {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items }),
    });

    const { sessionId } = await response.json();
    return stripe?.redirectToCheckout({ sessionId });
  },

  async getOrders(userId: string) {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          cake:cakes (*)
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async createCustomOrder(customOrder: any) {
    const { data, error } = await supabase
      .from('custom_orders')
      .insert([customOrder])
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};