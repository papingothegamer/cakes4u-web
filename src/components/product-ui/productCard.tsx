import React, { useState, useEffect } from "react";
import { ShoppingBag, Trash2 } from 'lucide-react';
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
    variants?: { id: string; name: string; price: number }[];
  };
  quantity: number;
  selectedVariant?: string;
  onQuantityChange?: (newQuantity: number) => void;
  onRemoveFromCart?: () => void; // For checkout variant
  onAddToCart?: () => void; // Added onAddToCart prop
}

const ProductCard: React.FC<ProductCardProps> = ({
  variant,
  product,
  quantity = 1,
  selectedVariant,
  onQuantityChange,
  onRemoveFromCart,
  onAddToCart, // Destructure the onAddToCart prop
}) => {
  const { addToCart, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();
  const [currentQuantity, setCurrentQuantity] = useState(quantity);
  const [isInCart, setIsInCart] = useState(false);

  // Effect to sync the state when the quantity changes
  useEffect(() => {
    if (isInCart) {
      setCurrentQuantity(quantity);
    }
  }, [isInCart, quantity]);

  const getProductPrice = () => {
    if (variant === "checkout" && selectedVariant && product.variants) {
      const variantObj = product.variants.find((v) => v.id === selectedVariant);
      return variantObj ? variantObj.price : product.price;
    }
    return product.price;
  };

  const handleCardClick = () => {
    if (variant === "menu" || variant === "display") {
      navigate(`/product/${product.id}`);
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    const clampedQuantity = Math.max(1, newQuantity);
    setCurrentQuantity(clampedQuantity);
    if (variant === "display") {
      updateQuantity(product.id, clampedQuantity); // Update cart quantity
    } else if (variant === "checkout") {
      updateQuantity(product.id, clampedQuantity);
    }
    onQuantityChange?.(clampedQuantity);
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({ ...product, quantity: 1 }); // Add 1 item to the cart
    setIsInCart(true); // After adding, show the quantity counter
    onAddToCart?.(); // Call onAddToCart prop if passed
  };

  const handleRemoveFromCart = () => {
    removeFromCart(product.id);
    setIsInCart(false); // Hide the quantity counter after removal
    onRemoveFromCart?.();
  };

  const productPrice = getProductPrice();

  return (
    <div
      className={`
        bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300
        ${variant === "menu" ? "transform hover:scale-105" : ""}
        ${variant === "display" ? "flex flex-col max-w-64 min-h-[400px]" : ""}
        ${variant === "checkout" ? "flex flex-row items-center space-x-4 p-4" : ""}
      `}
      onClick={handleCardClick}
    >
      {/* Product Image */}
      <div
        className={`
          ${variant === "menu" || variant === "display" ? "aspect-square" : "w-32 h-32"}
          bg-gray-100
        `}
      >
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Product Details */}
      <div className={`p-4 flex-grow ${variant === "checkout" ? "flex justify-between items-center" : ""}`}>
        {(variant === "menu" || variant === "display") && (
          <div>
            <h3 className="line-clamp-2 text-sm font-semibold text-gray-800 mb-2">
              {product.name}
            </h3>
            <p className="text-sm font-medium text-gray-500">
              ${productPrice.toFixed(2)}
            </p>
          </div>
        )}

        {/* Quantity Controls */}
        <div className={`flex items-center justify-between mt-2 ${variant === "display" ? "flex-col" : ""}`}>
          {variant === "display" && !isInCart && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCartClick(e);
              }}
              className="mt-2 w-full bg-pink-600 text-white px-3 py-2 rounded-md flex items-center justify-center hover:bg-pink-700"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Add to Bag
            </button>
          )}
          
          {/* Show the quantity counter after clicking Add to Bag */}
          {isInCart && (
            <div className="flex items-center border rounded-md mt-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleQuantityChange(currentQuantity - 1);
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
          )}

          {variant === "checkout" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveFromCart();
              }}
              className="ml-4 text-red-500 hover:text-red-700"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Total Price for Checkout */}
      {variant === "checkout" && (
        <div className="text-sm font-semibold">
          ${ (productPrice * currentQuantity).toFixed(2) }
        </div>
      )}
    </div>
  );
};

export default ProductCard;
