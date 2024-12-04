import React, { useState } from "react";
import { ShoppingBag } from 'lucide-react';
import Button from "../ui/Button";
import { useCart } from "../../context/cartContext";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  variant: "display" | "checkout";
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
  disableNavigation?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  variant,
  product,
  quantity,
  onQuantityChange,
  onAddToCart,
  onRemoveFromCart,
  disableNavigation = false,
}) => {
  const { addToCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const [showQuantityCounter, setShowQuantityCounter] = useState(false);
  const [currentQuantity, setCurrentQuantity] = useState(quantity);

  const handleCardClick = () => {
    if (!disableNavigation) {
      navigate(`/product/${product.id}`);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    });
    onAddToCart?.();
    setShowQuantityCounter(true);
  };

  const handleQuantityChange = (newQuantity: number) => {
    setCurrentQuantity(newQuantity);
    updateQuantity(product.id, newQuantity);
    onQuantityChange(newQuantity);
  };

  return (
    <div
      onClick={handleCardClick}
      className={`
        cursor-pointer 
        flex 
        ${variant === "display" ? "flex-col w-full max-w-64 min-h-[400px]" : "flex-row w-full h-32"}
        bg-white 
        shadow-md 
        rounded-lg 
        overflow-hidden 
        transition-shadow 
        hover:shadow-lg
      `}
    >
      {/* Product Image */}
      <div
        className={`
          ${variant === "display" ? "relative w-full aspect-square" : "h-full w-32"}
          bg-gray-100 
          flex 
          items-center 
          justify-center
        `}
      >
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Product Info */}
      <div
        onClick={(e) => {
          if (variant === "display") {
            e.stopPropagation();
          }
        }}
        className={`
          ${variant === "display" ? "flex-1 p-4 flex flex-col" : "flex-1 px-4 py-2 flex flex-col justify-between"}
        `}
      >
        <div className="flex-1">
          <h3 className="line-clamp-2 text-sm font-semibold text-gray-800 mb-2">
            {product.name}
          </h3>
          <p className="text-sm font-medium text-gray-500 mb-4">
            ${product.price.toFixed(2)}
          </p>
        </div>

        {/* Add to Cart Button or Quantity Counter */}
        {variant === "display" && !showQuantityCounter ? (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
            className="w-full px-3 py-2 text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 rounded-md flex items-center justify-center"
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            Add to Bag
          </Button>
        ) : (
          <div className={`
            ${variant === "display" ? "flex justify-center items-center w-full" : "mt-2 flex items-center justify-between space-x-4"}
          `}>
            <div className="flex items-center justify-center border rounded-md bg-gray-100 w-20">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (currentQuantity > 1) handleQuantityChange(currentQuantity - 1);
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
                  handleQuantityChange(currentQuantity + 1);
                }}
                className="px-2 py-1 text-gray-600 hover:text-gray-800"
              >
                +
              </button>
            </div>
            {variant === "checkout" && (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveFromCart?.();
                }}
                className="ml-2 px-3 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md"
              >
                Remove
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;

