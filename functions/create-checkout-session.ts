import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

// Initialize Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

// Check if Supabase URL and key are available
if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL and key are required.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize Stripe with a fallback check
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error('Stripe secret key is required.');
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2023-10-16',
});

export async function handler(event: any) {
  try {
    // Parse the incoming request body to get order details
    const { items, customer_email, metadata } = JSON.parse(event.body);

    // Create the line items for Stripe Checkout session
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.product_name,
          description: item.product_description,
          images: [item.product_image],
        },
        unit_amount: item.price * 100, // Convert to cents
      },
      quantity: item.quantity,
    }));

    // Create a new Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      customer_email, // Send the user's email to Stripe
      metadata: {
        userId: metadata.userId, // Add metadata to identify the user
      },
    });

    // Save session details to Supabase
    const { error } = await supabase.from('checkout_sessions').insert([
      {
        user_id: metadata.userId,
        session_id: session.id,
        status: 'pending',
      },
    ]);

    if (error) throw error;

    // Return the session ID to the frontend
    return {
      statusCode: 200,
      body: JSON.stringify({ sessionId: session.id }),
    };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to create checkout session' }),
    };
  }
}

// Function to create checkout session (for non-API usage, if needed)
export const createCheckoutSession = async (lineItems: any[]) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.HOST_URL}/success`,
      cancel_url: `${process.env.HOST_URL}/cancel`,
    });

    return { sessionId: session.id };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};
