import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getProduct } from './data/products'

export const FREE_SHIPPING = 250

export const useCart = create(
  persist(
    (set) => ({
      items: [], // { id, size, qty }
      open: false,
      setOpen: (open) => set({ open }),
      add: (id, size, qty = 1) =>
        set((s) => {
          const max = getProduct(id).stock[size]
          const hit = s.items.find((i) => i.id === id && i.size === size)
          const items = hit
            ? s.items.map((i) => (i === hit ? { ...i, qty: Math.min(max, i.qty + qty) } : i))
            : [...s.items, { id, size, qty: Math.min(max, qty) }]
          return { items, open: true }
        }),
      setQty: (id, size, qty) =>
        set((s) => {
          const max = getProduct(id).stock[size]
          return {
            items: s.items
              .map((i) => (i.id === id && i.size === size ? { ...i, qty: Math.min(max, qty) } : i))
              .filter((i) => i.qty > 0),
          }
        }),
      remove: (id, size) => set((s) => ({ items: s.items.filter((i) => !(i.id === id && i.size === size)) })),
    }),
    { name: 'maison-cart', partialize: (s) => ({ items: s.items }) }
  )
)
export const useCount = () => useCart((s) => s.items.reduce((n, i) => n + i.qty, 0))
export const useSubtotal = () => useCart((s) => s.items.reduce((n, i) => n + i.qty * getProduct(i.id).price, 0))
