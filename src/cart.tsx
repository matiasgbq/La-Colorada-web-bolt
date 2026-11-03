import { createContext, useContext, useMemo, useRef, useState, type ReactNode } from 'react';
import type { CartItem, Dish } from './types';
import { addCartItem, cartTotals, prepareCartDish, setCartQuantity } from '@/cart-items';
import { reconcileCart } from '@/cart-items';
import { isPublicDish, readOrderCatalog } from '@/catalog';

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
  validate: () => Promise<boolean>;
  validating: boolean;
  notices: string[];
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [validating, setValidating] = useState(false);
  const [notices, setNotices] = useState<string[]>([]);
  const validatingRef = useRef(false);

  const add = (dish: Dish, withSalad = false) => {
    if (validatingRef.current || !isPublicDish(dish)) return;
    setItems((prev) => addCartItem(prev, prepareCartDish(dish, withSalad)));
    setOpen(true);
  };

  const remove = (id: string) =>
    !validatingRef.current && setItems((prev) => setCartQuantity(prev, id, 0));

  const setQty = (id: string, qty: number) =>
    !validatingRef.current && setItems((prev) => setCartQuantity(prev, id, qty));

  const clear = () => { if (!validatingRef.current) { setItems([]); setNotices([]); } };

  const validate = async () => {
    if (validatingRef.current || items.length === 0) return false;
    validatingRef.current = true;
    setValidating(true);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch('/catalogo.json', { cache: 'no-store', signal: controller.signal });
      if (!response.ok || !response.headers.get('content-type')?.includes('application/json')) {
        throw new Error('No se pudo leer el catálogo');
      }
      const latest = readOrderCatalog(await response.json());
      const checked = reconcileCart(items, latest);
      setItems(checked.items);
      setNotices(checked.changes);
      return checked.changes.length === 0 && checked.items.length > 0;
    } catch {
      setNotices(['No pudimos comprobar los precios y la disponibilidad. Intentá nuevamente antes de continuar.']);
      return false;
    } finally {
      clearTimeout(timeout);
      validatingRef.current = false;
      setValidating(false);
    }
  };

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
    validate,
    validating,
    notices,
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
