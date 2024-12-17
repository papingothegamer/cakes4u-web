import { useState, useEffect } from 'react';
import { Package, ShoppingBag, Trash2 } from 'lucide-react'; // Added trash icon for deletion
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
          const fetchedOrders = await orderService.getOrders(user.id); // Fetch combined orders (regular + custom)
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

  // Handle order deletion
  const handleDelete = async (orderId: string) => {
    try {
      await orderService.deleteOrder(orderId); // Delete order from Supabase
      setOrders(orders.filter(order => order.id !== orderId)); // Update local state to remove deleted order
      alert('Order deleted successfully.');
    } catch (err) {
      console.error('Failed to delete order:', err);
      alert('An error occurred while deleting the order.');
    }
  };

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
                  <p className="text-sm text-gray-500">{order.created_at}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Package className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium text-green-500">{order.order_status}</span>
                </div>
              </div>
              <div className="space-y-2">
                {/* Display details for custom orders */}
                {order.occasion && <p className="text-sm font-medium">Occasion: {order.occasion}</p>}
                {order.flavor && <p className="text-sm font-medium">Flavor: {order.flavor}</p>}
                {order.details && <p className="text-sm font-medium">Details: {order.details}</p>}
                
                {/* Loop over order items */}
                {order.order_items?.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{item.cake.name} × {item.quantity}</span> {/* Cake name and quantity */}
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t flex justify-between">
                <span className="font-medium">Total</span>
                <span className="font-medium">${order.total?.toFixed(2)}</span> {/* Total price */}
              </div>
              <div className="mt-4 flex justify-between items-center space-x-2">
                <ShoppingBag className="h-5 w-5 text-blue-500" /> {/* Shopping Bag icon for visual purposes */}
                <span className="text-sm text-gray-500">{order.order_items?.length} items</span> {/* Display number of items */}
                <button
                  onClick={() => handleDelete(order.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  <Trash2 className="h-4 w-4 inline-block mr-1" />
                  Delete
                </button>
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

export default OrderHistory;
