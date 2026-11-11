import type { CartItem, Dish } from '@/types';
import { isPublicDish } from './catalog';

export function reconcileCart(items: CartItem[], catalog: Dish[]) {
  const changes: string[] = [];
  const next: CartItem[] = [];
  for (const item of items) {
    const [parentId, addonCode, extra] = item.dish.id.split('+');
    const current = catalog.find((dish) => dish.id === parentId && dish.code === item.dish.code);
    if (!current || !isPublicDish(current) || extra ||
        !Number.isSafeInteger(item.qty) || item.qty <= 0 ||
        (addonCode && current.saladAddon?.code !== addonCode)) {
      changes.push(`${item.dish.name}: ya no está disponible y se quitó del pedido.`);
      continue;
    }
    const dish = prepareCartDish(current, !!addonCode);
    if (dish.price !== item.dish.price) {
      changes.push(`${dish.name}: el precio cambió de $${item.dish.price.toLocaleString('es-AR')} a $${dish.price.toLocaleString('es-AR')}.`);
    } else if (dish.name !== item.dish.name || dish.desc !== item.dish.desc) {
      changes.push(`${dish.name}: se actualizó la información del plato.`);
    }
    next.push({ dish, qty: item.qty });
  }
  return { items: next, changes };
}

/** The addon travels with its tart, including quantity, removal and order text. */
export function prepareCartDish(dish: Dish, withSalad = false): Dish {
  if (!withSalad || !dish.saladAddon) return dish;
  return {
    ...dish,
    id: `${dish.id}+${dish.saladAddon.code}`,
    name: `${dish.name} + ensalada`,
    price: dish.price + dish.saladAddon.price,
    saladAddon: undefined,
  };
}

export function addCartItem(items: CartItem[], dish: Dish): CartItem[] {
  const found = items.some((item) => item.dish.id === dish.id);
  return found
    ? items.map((item) => item.dish.id === dish.id ? { ...item, qty: item.qty + 1 } : item)
    : [...items, { dish, qty: 1 }];
}

export function setCartQuantity(items: CartItem[], id: string, qty: number): CartItem[] {
  return qty <= 0
    ? items.filter((item) => item.dish.id !== id)
    : items.map((item) => item.dish.id === id ? { ...item, qty } : item);
}

export function cartTotals(items: CartItem[]) {
  return items.reduce((acc, item) => ({
    count: acc.count + item.qty,
    total: acc.total + item.qty * item.dish.price,
  }), { count: 0, total: 0 });
}

export function buildOrderText(items: CartItem[]) {
  const lines = items.map((item) =>
    `• ${item.dish.name}${item.dish.includesSalad ? ' (con ensalada)' : ''} x${item.qty} — $${(item.dish.price * item.qty).toLocaleString('es-AR')}`,
  );
  return ['Hola La Colorada! Quiero hacer este pedido:', '', ...lines, '',
    `Total: $${cartTotals(items).total.toLocaleString('es-AR')}`, '',
    'Gracias!',
  ].join('\n');
}
