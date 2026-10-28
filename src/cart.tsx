import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { CartItem, Dish } from './types';
import { addCartItem, cartTotals, prepareCartDish, setCartQuantity } from '@/cart-items';

type CartCtx = {
  items: CartItem[];
  count: number;
  total: number;
  add: (dish: Dish, withSalad?: boolean) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  isOpen: boolean;
  setOpen: (v: boolean) => void;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setOpen] = useState(false);

  const add = (dish: Dish, withSalad = false) => {
    setItems((prev) => addCartItem(prev, prepareCartDish(dish, withSalad)));
    setOpen(true);
  };

  const remove = (id: string) =>
    setItems((prev) => setCartQuantity(prev, id, 0));

  const setQty = (id: string, qty: number) =>
    setItems((prev) => setCartQuantity(prev, id, qty));

  const clear = () => setItems([]);

  const { count, total } = useMemo(() => cartTotals(items), [items]);

  const value: CartCtx = {
    items,
    count,
    total,
    add,
    remove,
    setQty,
    clear,
    isOpen,
    setOpen,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

export function formatARS(n: number) {
  return '$' + n.toLocaleString('es-AR');
}
