import React, { useState } from "react";
import { ShoppingBag } from 'lucide-react';
import Button from "../ui/Button";
import { useCart } from "../../context/cartContext";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  variant: "display" | "checkout" | "menu"; // Added "menu" variant
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  onAddToCart?: () => void; // For display variant
  onRemoveFromCart?: () => void; // For checkout variant
}

const ProductCard: React.FC<ProductCardProps> = ({
  variant,
  product,
  quantity,
  onQuantityChange,
  onAddToCart,
  onRemoveFromCart,
}) => {
  const { addToCart, updateQuantity } = useCart();
  const navigate = useNavigate();
  const [currentQuantity, setCurrentQuantity] = useState(quantity);

  const handleCardClick = () => {
    if (variant === "menu") {
      navigate(`/product/${product.id}`);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className={`
        cursor-pointer 
        ${variant === "menu" ? "flex flex-col bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105" : ""}
        ${variant === "display" ? "flex-col w-full max-w-64 min-h-[400px]" : ""}
        ${variant === "checkout" ? "flex-row w-full h-32" : ""}
      `}
    >
      {/* Product Image */}
      <div
        className={`
          ${variant === "menu" || variant === "display" ? "relative w-full aspect-square bg-gray-100" : "h-full w-32"}
        `}
      >
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Product Info */}
      {variant !== "checkout" && (
        <div className="p-4">
          <h3 className="line-clamp-2 text-sm font-semibold text-gray-800 mb-2">
            {product.name}
          </h3>
          <p className="text-sm font-medium text-gray-500">
            ${product.price.toFixed(2)}
          </p>
        </div>
      )}

      {/* Display Variant Actions */}
      {variant === "display" && (
        <div className="p-4">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.();
            }}
            className="w-full px-3 py-2 text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 rounded-md flex items-center justify-center"
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            Add to Bag
          </Button>
        </div>
      )}

      {/* Checkout Variant Actions */}
      {variant === "checkout" && (
        <div className="flex-1 px-4 py-2 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (currentQuantity > 1) setCurrentQuantity(currentQuantity - 1);
              }}
              disabled={currentQuantity <= 1}
              className="px-2 py-1 text-gray-600 hover:text-gray-800 disabled:text-gray-300"
            >
              -
            </button>
            <span className="px-3 py-1 text-sm font-medium text-gray-800">
              {currentQuantity}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentQuantity(currentQuantity + 1);
              }}
              className="px-2 py-1 text-gray-600 hover:text-gray-800"
            >
              +
            </button>
          </div>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onRemoveFromCart?.();
            }}
            className="ml-2 px-3 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md"
          >
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
