import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { CartItem, Dish } from './types';

type CartCtx = {
  items: CartItem[];
  count: number;
  total: number;
  add: (dish: Dish) => void;
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

  const add = (dish: Dish) => {
    setItems((prev) => {
      const found = prev.find((i) => i.dish.id === dish.id);
      if (found) {
        return prev.map((i) =>
          i.dish.id === dish.id ? { ...i, qty: i.qty + 1 } : i,
        );
      }
      return [...prev, { dish, qty: 1 }];
    });
    setOpen(true);
  };

  const remove = (id: string) =>
    setItems((prev) => prev.filter((i) => i.dish.id !== id));

  const setQty = (id: string, qty: number) =>
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.dish.id !== id)
        : prev.map((i) => (i.dish.id === id ? { ...i, qty } : i)),
    );

  const clear = () => setItems([]);

  const { count, total } = useMemo(
    () =>
      items.reduce(
        (acc, i) => ({
          count: acc.count + i.qty,
          total: acc.total + i.qty * i.dish.price,
        }),
        { count: 0, total: 0 },
      ),
    [items],
  );

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
