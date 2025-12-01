import { create } from 'zustand'
import axios from 'axios'

type Item = { id: string; name: string; price: number; size?: string; qty: number };

type CartState = {
  items: Item[];
  loading: boolean;
  fetchCart: () => Promise<void>;
  add: (it: Item) => Promise<void>;
  remove: (id: string) => Promise<void>;
  updateQty: (id: string, qty: number) => void;
  clear: () => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  loading: false,

  fetchCart: async () => {
    try {
      set({ loading: true });
      const { data } = await axios.get('/api/cart');
      const items = data.items.map((item: any) => ({
        id: item.productId,
        name: item.name,
        price: item.price,
        size: item.size,
        qty: item.quantity
      }));
      set({ items, loading: false });
    } catch (error) {
      console.error('Error fetching cart:', error);
      set({ loading: false });
    }
  },

  add: async (it) => {
    try {
      await axios.post('/api/cart', {
        productId: it.id,
        name: it.name,
        price: it.price,
        size: it.size,
        quantity: it.qty
      });
      await get().fetchCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  },

  remove: async (id) => {
    try {
      await axios.delete(`/api/cart?productId=${id}`);
      await get().fetchCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  },

  updateQty: (id, qty) => {
    set(s => ({ items: s.items.map(i => i.id === id ? { ...i, qty } : i) }));
  },

  clear: async () => {
    try {
      await axios.delete('/api/cart');
      set({ items: [] });
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  }
}));
