
import { Heart } from 'lucide-react';

export const SavedProducts = () => {
  // This would typically fetch from your favorites service
  const favorites = [
    {
      id: '1',
      name: 'Classic Chocolate Cake',
      price: 35.99,
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587'
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Saved Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {favorites.map((product) => (
          <div key={product.id} className="flex items-center space-x-4 p-4 border rounded-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-20 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-pink-500">${product.price.toFixed(2)}</p>
            </div>
            <button className="p-2 text-pink-500 hover:bg-pink-50 rounded-full">
              <Heart className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};