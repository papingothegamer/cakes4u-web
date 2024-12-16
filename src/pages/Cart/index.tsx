import { useStore } from '../../store/useStore';
import { CartItem } from '../../components/cart/CartItem';
import { CartSummary } from '../../components/cart/CartSummary';
import { checkoutService } from '../../services/checkoutService';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-hot-toast';
import { stripe } from '../../lib/stripe';

export const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useStore();
  const { user } = useAuth();

  const handleCheckout = async () => {
    if (!user) {
      toast.error('Please sign in to checkout');
      return;
    }

    if (!stripe) {
      toast.error('Payment system is not available');
      return;
    }

    try {
      const session = await checkoutService.createCheckoutSession(cart);
      
      if (session.sessionId) {
        const result = await stripe.redirectToCheckout({
          sessionId: session.sessionId
        });

        if (result.error) {
          toast.error(result.error.message || 'Checkout failed');
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'An error occurred during checkout';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-xl">Your cart is empty</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {cart.map((item) => (
              <CartItem
                key={item.cake.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
              />
            ))}
          </div>
          <div className="lg:col-span-1">
            <CartSummary items={cart} onCheckout={handleCheckout} />
          </div>
        </div>
      )}
    </div>
  );
};