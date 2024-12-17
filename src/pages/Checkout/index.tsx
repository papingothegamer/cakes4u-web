import { useState } from 'react';
import { checkoutService } from '../../services/checkoutService';
import { CartItem } from '../../types';
// Import loadStripe from stripe-js
import { loadStripe } from '@stripe/stripe-js';

// Make sure to add your public key here
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY as string);

const CheckoutPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const items: CartItem[] = []; // This should be populated with the cart items

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const session = await checkoutService.createCheckoutSession(items);
      const { sessionId } = session;

      // Get the Stripe instance
      const stripe = await stripePromise;

      if (!stripe) {
        throw new Error('Stripe.js failed to load.');
      }

      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      setError('Failed to start the checkout process.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleCheckout} disabled={loading}>
        {loading ? 'Redirecting to checkout...' : 'Proceed to Checkout'}
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default CheckoutPage;
