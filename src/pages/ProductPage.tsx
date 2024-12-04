import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, Minus, Plus, ShoppingBag } from 'lucide-react';
import productsData from "../data/products.json";
import Button from '../components/ui/Button';
import { useCart } from '../context/cartContext'; // Import the useCart hook

interface Variant {
  id: string;
  name: string;
  price: number;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  variants?: Variant[];
}

// Function to get product by ID
const getProductById = (productId: string, products: any) => {
  return products
    .flatMap((category: any) => category.products) // Flatten products from all categories
    .find((product: any) => product.id === productId); // Find the product by ID
};

const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const { addToCart } = useCart(); // Get the addToCart function from context

  useEffect(() => {
    if (productId) {
      const foundProduct = getProductById(productId, productsData.categories);

      if (foundProduct) {
        const category = productsData.categories.find((category) =>
          category.products.some((product: any) => product.id === productId)
      );
      const productWithCategory: Product = {
        ...foundProduct,
        category: category?.name || "Unknown Category",
      };
      setProduct(productWithCategory);
      setSelectedVariant(productWithCategory.variants && productWithCategory.variants.length > 0 ? productWithCategory.variants[0] : null);

      // Set related products (products from the same category, excluding the current product)
      if (category) {
        const relatedProducts = category.products
          .filter((p) => p.id !== productId)
          .slice(0, 4)
          .map((p) => ({
            ...p,
            category: category.name,
          }));
        setRelatedProducts(relatedProducts);
      }
    }
  } else {
    navigate("/");
  }
}, [productId, navigate]);

  const handleAddToCart = () => {
    if (product) {
      const itemToAdd = {
        id: product.id,
        name: product.name,
        price: selectedVariant?.price || product.price,
        quantity: quantity,
        image: product.image,
      };
      addToCart(itemToAdd); // Use the addToCart function
    }
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb Navigation */}
      <nav className="mb-8 text-sm">
  <ol className="list-none p-0 inline-flex">
    <li className="flex items-center">
      <Link to="/" className="text-gray-600 hover:text-pink-600">Home</Link>
      <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
    </li>
    <li className="flex items-center">
      <Link to="/categories" className="text-gray-600 hover:text-pink-600">Categories</Link>
      <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
    </li>
    <li className="text-pink-600">{product.name}</li>
  </ol>
</nav>

      {/* Product Details */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Image */}
        <motion.div
          className="lg:w-1/2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-pink-50 rounded-lg overflow-hidden shadow-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-cover"
            />
          </div>
        </motion.div>

        {/* Product Info */}
        <motion.div
          className="lg:w-1/2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <p className="text-gray-500 mb-4">{product.category}</p>
          <p className="text-xl font-semibold text-pink-600 mb-4">
            ${selectedVariant ? selectedVariant.price.toFixed(2) : product.price.toFixed(2)}
          </p>
          <p className="text-gray-700 mb-6">{product.description}</p>

          {/* Variants Dropdown */}
          {product.variants && product.variants.length > 0 && (
            <div className="mb-6">
              <label htmlFor="variant-selector" className="block text-sm font-medium text-gray-700 mb-2">
                Select Variant:
              </label>
              <select
                id="variant-selector"
                value={selectedVariant?.id || ""}
                onChange={(e) =>
                  setSelectedVariant(
                    product.variants?.find((variant) => variant.id === e.target.value) || null
                  )
                }
                className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:ring-pink-500 focus:border-pink-500"
              >
                {product.variants.map((variant) => (
                  <option key={variant.id} value={variant.id}>
                    {variant.name} - ${variant.price.toFixed(2)}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mb-6">
            <label htmlFor="quantity-selector" className="text-sm font-medium text-gray-700">
              Quantity:
            </label>
            <div className="flex items-center border rounded-md">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 text-gray-600 hover:text-pink-600 transition-colors"
              >
                <Minus size={16} />
              </button>
              <span className="px-3 py-2 text-sm font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 text-gray-600 hover:text-pink-600 transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="flex gap-4 mb-6">
            <Button
              onClick={handleAddToCart}
              className="flex-1 px-6 py-3 bg-pink-600 text-white rounded-full font-semibold hover:bg-pink-700 transition-colors flex items-center justify-center"
            >
              <ShoppingBag className="mr-2" size={20} />
              Add to Bag
            </Button>
          </div>

          {/* Additional Info */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold mb-2">Product Details</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Made with high-quality ingredients</li>
              <li>Freshly baked daily</li>
              <li>Available for pickup or delivery</li>
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <motion.div
                key={relatedProduct.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <Link to={`/product/${relatedProduct.id}`}>
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900">{relatedProduct.name}</h3>
                    <p className="text-sm text-gray-500">{relatedProduct.category}</p>
                    <p className="text-xl font-semibold text-pink-600 mt-2">
                      ${relatedProduct.price.toFixed(2)}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
