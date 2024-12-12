import { create } from 'zustand';
import { CartItem } from '../types';

interface StoreState {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (cakeId: string) => void;
  updateQuantity: (cakeId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useStore = create<StoreState>((set) => ({
  cart: [],
  addToCart: (item) =>
    set((state) => {
      const existingItem = state.cart.find((i) => i.cake.id === item.cake.id);
      if (existingItem) {
        return {
          cart: state.cart.map((i) =>
            i.cake.id === item.cake.id
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        };
      }
      return { cart: [...state.cart, item] };
    }),
  removeFromCart: (cakeId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.cake.id !== cakeId),
    })),
  updateQuantity: (cakeId, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.cake.id === cakeId ? { ...item, quantity } : item
      ),
    })),
  clearCart: () => set({ cart: [] }),
}));