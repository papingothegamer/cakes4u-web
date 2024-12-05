import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../product-ui/productCard';
import { useCart } from '../../context/cartContext';
import Button from './Button';

interface Cake {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface MenuPreviewProps {
  cakes: Cake[];
}

const MenuPreview: React.FC<MenuPreviewProps> = ({ cakes }) => {
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();

  const handleAddToCart = (cake: Cake) => {
    // Ensure item is added only if it does not already exist in the cart
    const existingItem = cartItems.find((item) => item.id === cake.id);
    if (!existingItem) {
      addToCart({
        id: cake.id,
        name: cake.name,
        price: cake.price,
        image: cake.image,
        quantity: 1,
      });
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-pink-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
          Our Signature Creations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cakes.map((cake) => (
            <div key={cake.id} className="flex justify-center">
              <ProductCard
                variant="menu"
                product={cake}
                quantity={1}
                onQuantityChange={() => {}}
              />
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button
            onClick={() => navigate('/categories')}
            size="lg"
            className="bg-pink-600 text-white hover:bg-pink-700 transition duration-300"
          >
            Explore Full Menu
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MenuPreview;
