import  { useState, useEffect } from 'react';
import { Package, ShoppingBag } from 'lucide-react';
import { orderService } from '../../../services/orderService'; // Import the orderService
import { useAuth } from '../../../hooks/useAuth'; // Assuming you have a hook for user authentication

export const OrderHistory = () => {
  const { user } = useAuth(); // Get the logged-in user
  const [orders, setOrders] = useState<any[]>([]); // State to store fetched orders
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // Fetch orders when the component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          const fetchedOrders = await orderService.getOrders(user.id); // Fetch orders from the service
          setOrders(fetchedOrders); // Set the fetched orders in the state
        } catch (error) {
          setError('Failed to load orders'); // Set error if fetching fails
        } finally {
          setLoading(false); // Set loading to false after data is fetched
        }
      }
    };

    fetchOrders(); // Call fetch function
  }, [user]); // Fetch orders when user changes (if logged in)

  if (loading) return <div>Loading...</div>; // Show loading state while fetching data

  if (error) return <div className="text-red-500">{error}</div>; // Show error message if there's an issue

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Order History</h2>
      <div className="space-y-4">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-semibold">Order #{order.id}</p>
                  <p className="text-sm text-gray-500">{order.created_at}</p> {/* Date is fetched from Supabase */}
                </div>
                <div className="flex items-center space-x-2">
                  <Package className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium text-green-500">{order.status}</span>
                </div>
              </div>
              <div className="space-y-2">
                {order.order_items.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{item.cake.name} × {item.quantity}</span> {/* Cake name and quantity */}
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t flex justify-between">
                <span className="font-medium">Total</span>
                <span className="font-medium">${order.total.toFixed(2)}</span> {/* Total price */}
              </div>
              <div className="mt-4 flex items-center space-x-2">
                <ShoppingBag className="h-5 w-5 text-blue-500" /> {/* Shopping Bag icon for visual purposes */}
                <span className="text-sm text-gray-500">{order.order_items.length} items</span> {/* Display number of items */}
              </div>
            </div>
          ))
        ) : (
          <p>No orders found.</p> // Display if no orders are available
        )}
      </div>
    </div>
  );
};
