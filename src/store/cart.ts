import { create } from 'zustand'


type Item = { id: string; name: string; price: number; size?: string; qty: number };

export const useCartStore = create<{
  items: Item[];
  add: (it: Item) => void;
  remove: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
}>((set) => ({
  items: [],
  add: (it) => set(s => {
    const exists = s.items.find(i => i.id === it.id && i.size === it.size);
    if (exists) return { items: s.items.map(i => i.id === it.id && i.size === it.size ? { ...i, qty: i.qty + it.qty } : i) };
    return { items: [...s.items, it] };
  }),
  remove: (id) => set(s => ({ items: s.items.filter(i => i.id !== id) })),
  updateQty: (id, qty) => set(s => ({ items: s.items.map(i => i.id === id ? { ...i, qty } : i) })),
  clear: () => set({ items: [] })
}));
